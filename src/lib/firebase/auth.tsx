import {
    onAuthStateChanged as _onAuthStateChanged,
    NextOrObserver,
    User,
    RecaptchaVerifier,
    signInWithPhoneNumber,
    updateProfile,
} from "firebase/auth";

import { auth, CustomWindow } from "./firebase";

export function onAuthStateChanged(cb: NextOrObserver<User>) {
    return _onAuthStateChanged(auth, cb);
}

declare const window: CustomWindow;

export async function signInWithPhone(phone: string, buttonId: string) {
    try {
        await initializeRecaptcha(buttonId);

        let result = await signInWithPhoneNumber(auth, phone, window.recaptchaVerifier!);
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        console.log("sms sent");
        window.confirmationResult = result;
    } catch (error) {
        // Error; SMS not sent
        console.log(`sms not sent: ${error}`);

    }
}

export async function verifyCode(otp: string) {
    try {
        let result = await window.confirmationResult!.confirm(otp);
        // User signed in successfully.
        console.log("User signed in successfully.");
        const user = result.user;
        console.log(`user: ${JSON.stringify(user)}`);
    } catch (error) {
        // User couldn't sign in (bad verification code?)
        console.log(`verifyCode error: ${error}`);

    }
}

export async function signOut() {
    try {
        return auth.signOut();
    } catch (error) {
        console.error("Error signing out with Google", error);
    }
}

export async function updateUserData(displayName: string) {
    if (auth.currentUser) {
        updateProfile(auth.currentUser!!, { displayName });
    } else {
        console.log("user null");

    }
}

const initializeRecaptcha = async (buttonId: string) => {
    try {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, buttonId, {
            'size': 'normal',
            'callback': (response: any) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                console.log("recaptcha solved");

            },
            'expired-callback': () => {
                // Response expired. Ask user to solve reCAPTCHA again.
                console.log("recaptcha expired");

            }
        });

        let widgetId = await window.recaptchaVerifier!.render();
        window.recaptchaWidgetId = widgetId;
        console.log(`widgetId: ${widgetId}`);

        // if phone not valid or signing in process started, then disable the button

    } catch (error) {
        console.error('Recaptcha initialization error:', error);
        // Handle error state or retry logic if necessary
    }
};