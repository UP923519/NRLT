// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
function StartFirebase(){
    const firebaseConfig = {
        apiKey: "AIzaSyCVEHBPAMoIz96ftl9pGedW94-M_3JKKYw",
        authDomain: "iotsystem-7e021.firebaseapp.com",
        databaseURL: "https://iotsystem-7e021-default-rtdb.firebaseio.com",
        projectId: "iotsystem-7e021",
        storageBucket: "iotsystem-7e021.appspot.com",
        messagingSenderId: "653091219933",
        appId: "1:653091219933:web:a00b411d966db7fba9ee34",
        measurementId: "G-RK3D51KXEL"
      };

    const app = initializeApp(firebaseConfig);
    return getDatabase(app);


}

export default StartFirebase;
