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

const addSiteInfo = async (req, res) => {
  const token = req.headers.token;
  const { title, url, description, twitter, website } = req.body;

  try {
    const user = await verifyIdToken(token);
    const data = {
      title,
      url,
      description,
      twitter,
      website,
      user: user.uid,
    };

    const siteInfo = await admin
      .firestore()
      .collection(`sites`)
      .doc(user.uid)
      .set(data);

    return res.status(200).json(data, siteInfo);
  } catch (error) {
    return res.status(401).send('You are unauthorised');
  }
};

export default addSiteInfo;
