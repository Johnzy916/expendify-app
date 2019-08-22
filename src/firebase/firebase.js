import * as firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

// Firebase configuration
const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
  };
  
// Initialize Firebase
firebase.initializeApp(config);

///////
// DATABASE
///////////////////

const database = firebase.database();

///////
// AUTHENTICATION
///////////////////

const auth = firebase.auth();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

// EXPORTS
export { auth, googleAuthProvider, database as default };