'use client'

import { useContext, useState, useEffect, createContext } from "react";
import {
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "firebase/auth";
import { auth } from '../../firebase';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
    };

    const logOut = () => {
        signOut(auth);
    };

    const registerWithEmail = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const loginWithEmail = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, googleSignIn, logOut, registerWithEmail, loginWithEmail }}>
            {children}
        </AuthContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(AuthContext);
};
