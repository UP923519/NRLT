// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
function StartFirebase(){
    const firebaseConfig = {
    apiKey: "AIzaSyDcSj4OO7lwn26RSBevf6SxeYkvgwKu-jQ",
    authDomain: "carbonwebappdatabase.firebaseapp.com",
    databaseURL: "https://carbonwebappdatabase-default-rtdb.firebaseio.com/",
    projectId: "carbonwebappdatabase",
    storageBucket: "carbonwebappdatabase.appspot.com",
    messagingSenderId: "992511270042",
    appId: "1:992511270042:web:093105b2f5ccd0933ed323"
    };

    const app = initializeApp(firebaseConfig);
    return getDatabase(app);


}

export default StartFirebase;
