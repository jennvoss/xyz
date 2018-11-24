import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

var config = {
  apiKey: "AIzaSyDxU31M6rGcybWE7IrKm2u37u3IHq-IsOs",
  authDomain: "project-xyz-25e42.firebaseapp.com",
  databaseURL: "https://project-xyz-25e42.firebaseio.com",
  projectId: "project-xyz-25e42"
};
firebase.initializeApp(config);

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const db = firebase.database();
export const firebaseAuth = firebase.auth;
export const authKey = 'authToken';
