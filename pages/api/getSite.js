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

const getFood = async (req, res) => {
  const token = req.headers.token;

  try {
    const user = await verifyIdToken(token);
    if (!user) {
      return res.status(401).send('Not authorised');
    }
    const siteInfo = await admin
      .firestore()
      .collection('sites')
      .doc(user.uid)
      .get();
    console.log(siteInfo);
    if (!siteInfo.exists) {
      return res.status(404).send('You do not have a site yet');
    }

    return res.status(200).json(siteInfo.data());
  } catch (error) {
    console.log(error);
    return res.status(500).send('Server Error');
  }
};

export default getFood;
