import {
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
} from "firebase/auth";
import { auth } from "../../firebase";

export const login = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logout = () => signOut(auth);

export const changePassword = async (newPassword: string) => {
  const user = auth.currentUser;
  await updatePassword(user!, newPassword);
};
