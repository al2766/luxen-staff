// Import the necessary functions from the Firebase SDKs
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVvNt4s49ge1gnokSDpOjPK_4lbHgolp4",
  authDomain: "luxen-staff.firebaseapp.com",
  projectId: "luxen-staff",
  storageBucket: "luxen-staff.firebasestorage.app",
  messagingSenderId: "136578775847",
  appId: "1:136578775847:web:c34449991e76d503ef8702",
  measurementId: "G-K7MM4SC30L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); // Initialize Firestore
const auth = getAuth(app);

export { db, auth };
