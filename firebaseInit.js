import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBC1rjBlddp2I2MSHC8UWMorsmNwxcSXZc",
  authDomain: "notional-media-379200.firebaseapp.com",
  projectId: "notional-media-379200",
  storageBucket: "notional-media-379200.appspot.com",
  messagingSenderId: "323000669191",
  appId: "1:323000669191:web:4c4d50fa760b60216706a2",
  measurementId: "G-H6G66G0K6F",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Possibly not needed
const db = getFirestore(app);

// wtf is this? Is this needed
export default db;
