import app from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBArV7tckiBY5dg9SlFWNoYa2KAzO_eqVI",
  authDomain: "job-listing-738d1.firebaseapp.com",
  projectId: "job-listing-738d1",
  storageBucket: "job-listing-738d1.appspot.com",
  messagingSenderId: "234578549079",
  appId: "1:234578549079:web:18d53ff5759498f6a74612",
};

// Initialize Firebase
const firebase = app.initializeApp(firebaseConfig);

const firestore = firebase.firestore();
const firestorage = firebase.storage();

export { firebase, firestore, app, firestorage };
