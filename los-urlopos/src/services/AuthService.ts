import {
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
} from "firebase/auth";
import { auth } from "../../firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export const login = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logout = () => signOut(auth);

export const changePassword = async (newPassword: string) => {
  const user = auth.currentUser;
  await updatePassword(user!, newPassword);
};

export const createUser = async (email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const newUser = userCredential.user;

  return newUser;
};

export const getCurrentUser = () => {
  const auth = getAuth();
  return auth.currentUser;
};
