import firebase from "firebase/app";
import "firebase/database";

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBNvBlALe9ozfQmnn1Mj3gUJhwvYNh0ops",
    authDomain: "myfirstfirebase-704db.firebaseapp.com",
    databaseURL: "https://myfirstfirebase-704db.firebaseio.com",
    projectId: "myfirstfirebase-704db",
    storageBucket: "myfirstfirebase-704db.appspot.com",
    messagingSenderId: "9956219212",
    appId: "1:9956219212:web:96f52f8c8e60366f7fd7e9",
    measurementId: "G-RXV8N0Y4P9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const AppDB = firebase.database();
export { AppDB }; // Make it available to other modules