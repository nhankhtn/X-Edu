
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
    getAuth,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
const firebaseConfig = {
    apiKey: "AIzaSyApfh_WhMNyPl0Dl3J_9vVOxSJ982xmw3M",
    authDomain: "x-education-32dfb.firebaseapp.com",
    databaseURL: "https://x-education-32dfb-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "x-education-32dfb",
    storageBucket: "x-education-32dfb.appspot.com",
    messagingSenderId: "519926685073",
    appId: "1:519926685073:web:2a7a447a54fe2e51c28e30",
    measurementId: "G-Z2R9SVL6QS"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);