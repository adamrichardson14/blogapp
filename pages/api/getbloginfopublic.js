import * as admin from 'firebase-admin';
if (!admin.apps.length) {
  const firebasePrivateKey = process.env.FIREBASE_PRIVATE_KEY;
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: firebasePrivateKey.replace(/\\n/g, '\n'),
    }),
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  });
}
const getAllPostsAuth = async (req, res) => {
  const siteName = req.query.sitename;

  try {
    const siteInfo = await admin
      .firestore()
      .collection('sites')
      .where('url', '==', siteName)
      .get();
    try {
      if (siteInfo.empty) {
        throw new Error('there is no site here');
      }
    } catch (error) {
      return res.status(404).json({ error: err.message });
    }

    const siteData = siteInfo.docs[0].data();

    const postSnapshot = await admin
      .firestore()
      .collection('sites')
      .doc(siteData.user)
      .collection('posts')
      .get();
    if (postSnapshot.empty) {
      throw new Error('There are no posts here');
    }
    let posts = [];
    postSnapshot.forEach((postSnap) => {
      const postData = postSnap.data();
      if (!postData.publish) {
        return;
      }
      const post = {
        category: postData.category,
        title: postData.title,
        imageUrl: postData.imageUrl,
        excerpt: postData.excerpt,
        slug: postData.slug,
        created: postData.date,
        date: postData.createdAt.toDate(),
        featured: postData.featured,
      };

      posts.push(post);
    });

    return res.status(200).json({
      siteInfo: {
        twitter: siteData.twitter,
        website: siteData.website,
        url: siteData.url,
        title: siteData.title,
        description: siteData.description,
      },
      posts,
    });
  } catch (error) {
    return res.status(404).send(error.message);
  }
};

export default getAllPostsAuth;
