import {initializeApp} from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCLB7j1mVRR7mkslNK6utAfuwhv_GvJ-RY",
  authDomain: "count-your-spendings.firebaseapp.com",
  databaseURL: "https://count-your-spendings-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "count-your-spendings",
  storageBucket: "count-your-spendings.appspot.com",
  messagingSenderId: "357298848113",
  appId: "1:357298848113:web:25f7c19b59b924770d76d0"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);
