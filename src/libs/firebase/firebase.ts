// src/libs/firebase/firebase.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getMessaging, Messaging } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Messaging bisa null, karena tidak semua browser support
let messaging: Messaging | null = null;
if (typeof window !== 'undefined' && 'Notification' in window) {
  messaging = getMessaging(app);
}

export { app, messaging };
