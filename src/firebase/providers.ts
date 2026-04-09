import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { FirebaseAuth } from "./config";
import { FirebaseError } from "firebase/app";

export interface RegisterNewUser {
  email: string;
  password: string;
  displayName: string;
}

export interface ReturnRegisterNewUser {
  ok?: boolean;
  uid?: string;
  email?: string;
  displayName?: string;
  photoURL?: string | null;
  errorMessage?: Error | null | string;
}

export interface LoginEmailPassword {
  email: string;
  password: string;
}

const googleProvider = new GoogleAuthProvider();

//Sign In with google
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(FirebaseAuth, googleProvider);

    const { uid, email, displayName, photoURL } = result.user;

    return {
      ok: true,
      uid,
      email,
      displayName,
      photoURL,
    };
  } catch (error) {
    if (error instanceof FirebaseError) {
      return { ok: false, errorMessage: "Google sign in failed. Please try again." };
    }
  }
};

//Register user with email and password
export const registerUserWithEmailPassword = async ({
  displayName,
  email,
  password,
}: RegisterNewUser): Promise<ReturnRegisterNewUser> => {
  try {
    const resp = await createUserWithEmailAndPassword(
      FirebaseAuth,
      email,
      password,
    );
    const { uid, photoURL } = resp.user;

    await updateProfile(FirebaseAuth.currentUser!, { displayName });

    return {
      ok: true,
      uid,
      photoURL,
      displayName,
      email,
    };
  } catch (error) {
    if (error instanceof FirebaseError) {
      let errorMessage = error.message;
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "Ya existe una cuenta con el correo";
      }

      return {
        ok: false,
        errorMessage,
      };
    }

    return {};
  }
};

const loginErrorMessages: Record<string, string> = {
  "auth/invalid-credential": "Incorrect email or password.",
  "auth/invalid-email": "The email address is not valid.",
  "auth/user-disabled": "This account has been disabled.",
  "auth/too-many-requests": "Too many failed attempts. Try again later.",
};

//Login with email and password
export const loginWithEmailPassword = async ({
  email,
  password,
}: LoginEmailPassword) => {
  try {
    const resp = await signInWithEmailAndPassword(
      FirebaseAuth,
      email,
      password,
    );
    const { uid, displayName, photoURL } = resp.user;

    return {
      ok: true,
      uid,
      email,
      displayName,
      photoURL,
    };
  } catch (error) {
    if (error instanceof FirebaseError) {
      const errorMessage =
        loginErrorMessages[error.code] ?? "Sign in failed. Please try again.";
      return { ok: false, errorMessage };
    }

    return {};
  }
};

// Logout de Firebase
export const logoutFirebase = async () => {
  return await FirebaseAuth.signOut();
};
