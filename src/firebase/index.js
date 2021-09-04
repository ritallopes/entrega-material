// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQyafOqftMOJd4GrBeB_hsteO5BTJJyLc",
  authDomain: "entrega-material-escolar.firebaseapp.com",
  projectId: "entrega-material-escolar",
  storageBucket: "entrega-material-escolar.appspot.com",
  messagingSenderId: "367107394629",
  appId: "1:367107394629:web:b68778a66dfb6a0372672c",
  measurementId: "G-0MHS6X3FKD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);