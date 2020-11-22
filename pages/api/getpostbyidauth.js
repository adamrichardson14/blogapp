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

const getPostByIdAuth = async (req, res) => {
  const token = req.headers.token;
  const id = req.query.id;

  try {
    const user = await verifyIdToken(token);
    if (!user) {
      return res.status(401).send('Not authorised');
    }
    const postSnapshot = await admin
      .firestore()
      .collection('sites')
      .doc(user.uid)
      .collection('posts')
      .where('id', '==', id)
      .get();

    let posts = [];

    console.log(postSnapshot);
    if (postSnapshot) {
      postSnapshot.forEach((post) => {
        posts.push(post.data());
      });
      const post = posts[0];
      if (post.authorId != user.uid) {
        return res.status(401).send('Not authorised');
      }
      return res.status(200).json(post);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send('Server Error');
  }
};

export default getPostByIdAuth;
