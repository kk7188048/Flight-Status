import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyB4xs7EPlXgR8_xZCG2jhypYIkICin_1QY",
    authDomain: "blog-33a17.firebaseapp.com",
    databaseURL: "https://blog-33a17-default-rtdb.firebaseio.com",
    projectId: "blog-33a17",
    storageBucket: "blog-33a17.appspot.com",
    messagingSenderId: "4714567003",
    appId: "1:4714567003:web:dba3b428a950b8100b767e"
  };
  
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging, getToken, onMessage };
