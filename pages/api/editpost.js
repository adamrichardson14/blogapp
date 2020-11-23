import { verifyIdToken } from '../../utils/auth/firebaseAdmin';
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

const editPost = async (req, res) => {
  const token = req.headers.token;
  const postID = req.query.id;

  const {
    category,
    excerpt,
    publish,
    slug,
    title,
    html,
    imageUrl,
    mdText,
  } = req.body;

  try {
    const user = await verifyIdToken(token);
    console.log(user);
    const data = {
      category,
      excerpt,
      publish,
      slug,
      title,
      html,
      imageUrl,
      mdText,
    };
    if (!user) {
      return res.status(401).send('Not authorised');
    }

    try {
      const postInfo = await admin
        .firestore()
        .collection(`sites/${user.uid}/posts`)
        .doc(postID)
        .get();

      const existingPost = postInfo.data();

      if (existingPost.id != postID) {
        return res.status(401).send('Not authorised, ID is not correct');
      }
      if (existingPost.authorId != user.uid) {
        return res
          .status(401)
          .send('Not authorised, you must be the author of a post to edit it.');
      }

      const postSnapshot = await admin
        .firestore()
        .collection(`sites/${user.uid}/posts`)
        .doc(postID)
        .update({
          ...data,
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        });

      console.log(res);
      return res.status(200).json(data, postSnapshot);
    } catch (error) {
      console.log(error);
      return res.status(500).send('Something went wrong');
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
};

export default editPost;
