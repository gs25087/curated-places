import * as admin from 'firebase-admin';
import { NextApiRequest } from 'next';

export const verifyIdToken = async (token: string) => {
  const firebasePrivateKey: string = process.env.FIREBASE_PRIVATE_KEY ?? '';
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: firebasePrivateKey.replace(/\\n/g, '\n')
      }),
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL
    });
  }

  return admin
    .auth()
    .verifyIdToken(token)
    .catch(() => null);
};

export const loadIdToken = async (req: NextApiRequest): Promise<string | null> => {
  if (!req.cookies.token) return null;
  const decodedToken = await verifyIdToken(req.cookies.token);
  if (!decodedToken) return null;

  return decodedToken.uid;
};
