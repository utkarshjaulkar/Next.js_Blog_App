// import firebase from 'firebase/compat/app'
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';
// import 'firebase/compat/storage';

import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import {
  getFirestore,
  collection,
  where,
  getDocs,
  query,
  limit,
} from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAb0U-rRIdvF6pCDTrtKHb7vMkPlpMXNuY',
  authDomain: 'next-backend-f87f3.firebaseapp.com',
  projectId: 'next-backend-f87f3',
  storageBucket: 'next-backend-f87f3.appspot.com',
  messagingSenderId: '114905623611',
  appId: '1:114905623611:web:6663b9038344e5943c001e',
  measurementId: 'G-6JF1V3K534',
}
// Initialize firebase
// let firebaseApp;
// let firestore;
// if (!getApps().length) {
//   // firebase.initializeApp(firebaseConfig);
//   initializeApp(firebaseConfig);
//   firestore = getFirestore();
// }

function createFirebaseApp(config) {
  try {
    return getApp()
  } catch {
    return initializeApp(config)
  }
}

// const firebaseApp = initializeApp(firebaseConfig);
const firebaseApp = createFirebaseApp(firebaseConfig)

// Auth exports
// export const auth = firebase.auth();
export const auth = getAuth(firebaseApp)
export const googleAuthProvider = new GoogleAuthProvider()

// Firestore exports
export const firestore = getFirestore(firebaseApp)
// export const firestore = firebase.firestore();
// export { firestore };
// export const serverTimestamp = serverTimestamp;
// export const fromMillis = fromMillis;
// export const increment = increment;

// Storage exports
export const storage = getStorage(firebaseApp)
export const STATE_CHANGED = 'state_changed'

/// Helper functions

/**`
 * Gets a users/{uid} document with username
 * @param  {string} username
 */
export async function getUserWithUsername(username) {
  // const usersRef = collection(firestore, 'users');
  // const query = usersRef.where('username', '==', username).limit(1);

  const q = query(
    collection(firestore, 'users'),
    where('username', '==', username),
    limit(1),
  )
  const userDoc = (await getDocs(q)).docs[0]
  return userDoc
}

/**`
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */
export function postToJSON(doc) {
  const data = doc.data()
  return {
    ...data,
    // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
    createdAt: data?.createdAt.toMillis() || 0,
    updatedAt: data?.updatedAt.toMillis() || 0,
  }
}
