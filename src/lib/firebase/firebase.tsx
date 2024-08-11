'use client';

import { initializeApp, getApps } from "firebase/app";
import { firebaseConfig } from "./firebaseConfig";
import { ConfirmationResult, getAuth, RecaptchaVerifier } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
export const firebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(firebaseApp);
export const database = getDatabase(firebaseApp);
export const storage = getStorage(firebaseApp);

export interface CustomWindow extends Window {
  signingIn?: boolean;
  verifyingCode?: boolean;
  confirmationResult?: ConfirmationResult | null;
  recaptchaVerifier?: RecaptchaVerifier;
  recaptchaWidgetId?: number;
}