import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export const config = {
  apiKey: 'AIzaSyBJJ7P4v4R9899S8-ZPhy-dNr_Md2iG6GA',
  authDomain: 'capstone-803db.firebaseapp.com',
  databaseURL: 'https://capstone-803db-default-rtdb.firebaseio.com',
  projectId: 'capstone-803db',
  storageBucket: 'capstone-803db.appspot.com',
  messagingSenderId: '104089541669',
  appId: '1:104089541669:web:51ff5ab4a495243cfd33cc',
};
firebase.initializeApp(config);

const db = firebase.firestore();
const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();
export { auth, db, googleProvider };
