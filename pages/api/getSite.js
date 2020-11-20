import { verifyIdToken } from '../../utils/auth/firebaseAdmin';
const favoriteFoods = ['pizza', 'burger', 'chips', 'tortilla'];
import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  const firebasePrivateKey = process.env.FIREBASE_PRIVATE_KEY;
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      // https://stackoverflow.com/a/41044630/1332513
      privateKey: firebasePrivateKey.replace(/\\n/g, '\n'),
    }),
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  });
}

const getFood = async (req, res) => {
  const token = req.headers.token;

  try {
    const user = await verifyIdToken(token);
    const siteInfo = await admin
      .firestore()
      .collection('sites')
      .doc(user.uid)
      .get();

    return res.status(200).json(siteInfo.data());
  } catch (error) {
    return res.status(401).send('You are unauthorised');
  }
};

export default getFood;
