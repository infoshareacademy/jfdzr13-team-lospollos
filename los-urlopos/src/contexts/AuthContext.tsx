import { createContext, useContext, useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../firebase";

const AuthContext = createContext({});

const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [loggedUser, setLoggedUser] = useState(null);

  const login = (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password);

  const logout = () => signOut(auth);

  useEffect(() => onAuthStateChanged(auth, (user) => setLoggedUser(user)), []);

  const authHandler = {
    loggedUser,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authHandler}>{children}</AuthContext.Provider>
  );
};

export default useAuth;
