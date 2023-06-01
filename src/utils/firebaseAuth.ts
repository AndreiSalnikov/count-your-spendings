import React from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

interface IFirebaseAuthProps {
    email: string,
    password: string
}

const FirebaseAuth: React.FC<IFirebaseAuthProps> = ({email,password}) => {
    const auth = getAuth()
    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    console.log(user)
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
    return null;
};

export default FirebaseAuth;
