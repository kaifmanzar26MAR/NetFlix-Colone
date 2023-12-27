// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBbChcD0UL2fKcasX21k1RIqtgXaehRnuU",
  authDomain: "netflixdev-fe74b.firebaseapp.com",
  projectId: "netflixdev-fe74b",
  storageBucket: "netflixdev-fe74b.appspot.com",
  messagingSenderId: "938228275421",
  appId: "1:938228275421:web:eb590d3664d28e2221e334",
  measurementId: "G-81KW6CM28Z",
  databaseURL:"https://netflixdev-fe74b-default-rtdb.firebaseio.com"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);