import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAUCSRPu1PZvDMyw9AHavW8Tr-xW_XR8oE",
  authDomain: "tap-london.firebaseapp.com",
  projectId: "tap-london",
  storageBucket: "tap-london.firebasestorage.app",
  messagingSenderId: "462099707600",
  appId: "1:462099707600:web:613186d61a8013423210d5"
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
export const db = getFirestore(app);
