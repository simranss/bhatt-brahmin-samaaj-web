'use client'

import { signOut, signInWithPhone, verifyCode, onAuthStateChanged } from "@/../lib/firebase/auth";
import { useEffect, useRef } from "react";
import { auth } from "../../lib/firebase/firebase";

export default function LoginScreen() {

    const otpRef = useRef<HTMLInputElement | null>(null);
    useEffect(() => {
        onAuthStateChanged((user) => {
            if (user) {
                console.log(`user is logged in: ${JSON.stringify(user)}`);
            } else {
                console.log("user is logged out");
            }
        });
    }, []);
    const handleSignOut = (event: React.SyntheticEvent) => {
        event.preventDefault();
        signOut();
    };

    const handleSignIn = async (event: React.MouseEvent) => {
        event.preventDefault();
        await signInWithPhone("+916505551234", "recaptcha-container");
    };

    const handleVerifyCode = async (event: React.MouseEvent) => {
        event.preventDefault();
        let otp = otpRef.current?.value ?? "123456";
        console.log(`otp: ${otp}`);
        await verifyCode(otp);

    }

    return (<div>
        <h1>Login Page</h1>
        <div id="recaptcha-container"></div>
        <input ref={otpRef} type="text" />
        <button onClick={handleSignIn}>Sign In</button>
        <button onClick={handleVerifyCode}>Verify Code</button>
    </div>);
}