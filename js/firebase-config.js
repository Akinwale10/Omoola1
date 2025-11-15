// Firebase Configuration
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { getStorage } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js';

const firebaseConfig = {
  apiKey: "AIzaSyA97xqLri9R7Z7NULITp9DsOSdLfCxfJs8",
  authDomain: "omoola.firebaseapp.com",
  projectId: "omoola",
  storageBucket: "omoola.firebasestorage.app",
  messagingSenderId: "274188055038",
  appId: "1:274188055038:web:b3c98da8b560e72c55d0af"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Monitor auth state
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log('User logged in:', user.email);
  } else {
    console.log('No user logged in');
  }
});
