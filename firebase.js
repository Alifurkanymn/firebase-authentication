'use client';
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBYulfKSRsd9uK0USrGkbjA2L9hJkggdmY",
    authDomain: "fir-auth-9ef18.firebaseapp.com",
    projectId: "fir-auth-9ef18",
    storageBucket: "fir-auth-9ef18.appspot.com",
    messagingSenderId: "481757460514",
    appId: "1:481757460514:web:76a7aee75522fe7e3f327b",
    measurementId: "G-JZXKFZRQLW"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

let analytics;
if (typeof window !== "undefined") {
    isSupported().then((supported) => {
        if (supported) {
            analytics = getAnalytics(app);
        }
    });
}

export { auth, app, analytics };
