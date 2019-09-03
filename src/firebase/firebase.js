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

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const githubAuthProvider = new firebase.auth.GithubAuthProvider();
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();

// EXPORTS
export { 
    firebase,
    googleAuthProvider,
    githubAuthProvider,
    facebookAuthProvider,
    database as default
};