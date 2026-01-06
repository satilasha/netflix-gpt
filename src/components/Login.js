"use client";

import React from 'react'
import { validateSignIn } from '@/utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { useRouter } from "next/navigation";
import { addUser } from '../utils/userSlice';
import { updateProfile } from "firebase/auth";


const Login = () => {

    const dispatch = useDispatch();
    const router = useRouter();

    const [signIn, setSignIn] = React.useState(true);
    const [errorMessage, setErrorMessage] = React.useState("");

    const name = React.useRef(null);
    const password = React.useRef(null);
    const email = React.useRef(null);

    const handleOnSubmit = () => {

        const validation = validateSignIn(email.current.value, password.current.value, name.current ? name.current.value : "not_required");

        if (!validation.valid) {
            setErrorMessage(validation.message);
            return;
        }

        if (validation.message) return;

        //Sign In / Sign Up Logic Here

        if (!signIn) {
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {

                    updateProfile(auth.currentUser, {
                        displayName: name.current.value
                    }).then(() => {
                        dispatch(addUser({
                            uid,
                            email,
                            name: auth.currentUser.displayName,
                        }));
                    }).catch((error) => {
                        setErrorMessage(error.message);
                    });
                    // Signed up 
                    const user = userCredential.user;
                    console.log("User Signed Up: ", user);

                    const { uid, email } = user;

                    router.push("/browse");

                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "_" + errorMessage);
                });

        } else {
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    console.log("User Signed In: ", user)

                    router.push("/browse");
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "_" + errorMessage);
                });

        }
    }


    const toggleSignIn = () => {
        setSignIn(!signIn);
    }
    return (
        <div className='relative z-0 inset-0 bg-black/50'>
            <img
                src="https://assets.nflxext.com/ffe/siteui/vlv3/29b665f6-0a62-4745-b9c2-f617fb7eadc6/web/IN-en-20251208-TRIFECTA-perspective_c78aea89-8f13-4e2c-ba7a-f9b40f53bf8c_large.jpg" alt="Background Image" />

            <div className="absolute inset-0 bg-black/50 z-10"></div>

            <div className='absolute w-3/12 mx-auto left-0 right-0 top-36 z-20 p-10 bg-black/75 flex flex-col gap-8 text-white'>
                <h1 className='text-3xl font-bold'>{signIn ? "Sign In" : "Sign Up"}</h1>
                {!signIn && <input
                    ref={name}
                    className="p-4 bg-gray-500/50 text-white rounded-md w-full border border-white"
                    type="text"
                    placeholder="Full Name"
                />}
                <input
                    ref={email}
                    className="p-4 bg-gray-500/50 text-white rounded-md w-full border border-white"
                    type="text"
                    placeholder="Email or Mobile Number"
                />
                <input
                    ref={password}
                    className="p-4 bg-gray-500/50 text-white rounded-md w-full border border-white"
                    type="text"
                    placeholder='Password'
                />
                {!signIn && <input
                    ref={password}
                    className="p-4 bg-gray-500/50 text-white rounded-md w-full border border-white"
                    type="text"
                    placeholder="Re-enter Password"
                />}

                <p className='text-red-500'>{errorMessage}</p>

                <button className="px-4 py-2 bg-red-600 rounded-md text-white hover:bg-red-700 active:scale-95 transition-transform duration-150"
                    onClick={handleOnSubmit}>{"Sign " + (signIn ? "In" : "Up")}</button>
                <p className='text-left text-gray-500'>{signIn ? "New to Netflix?" : "Already Registered On Netflix,"}
                    <span
                        className='text-white cursor-pointer'
                        onClick={toggleSignIn}>{" Sign " + (signIn ? "Up now." : "In now.")}</span></p>
                <p className='text-left text-xs text-gray-500'>This page is protected by Google reCAPTCHA to ensure you're not a bot.</p>
            </div>
        </div>
    )
}

export default Login