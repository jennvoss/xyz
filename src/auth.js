import {firebaseAuth, googleProvider, authKey} from "./constants";

const saveUser = (key) => localStorage.setItem(authKey, key);
const removeUser = () => localStorage.removeItem(authKey);

export function loginWithGoogle() {
  return firebaseAuth().signInWithRedirect(googleProvider);
}

export function getUser() {
  return localStorage.getItem(authKey);
}

export function logout() {
  return firebaseAuth().signOut();
}

export function checkLogin(cb) {
  firebaseAuth()
    .onAuthStateChanged(result => {
      if (result && result.uid) {
        saveUser(result.uid);
      } else {
        removeUser();
      }
      cb(result);
    });
}