import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../../firebase.js";
import { User } from "../types-obj/types-obj.js";

type TODO = any;
const AuthContext = createContext({});

const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<TODO>(null);

  const [userData, setUserData] = useState<User | null>(null);

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => signOut(auth);

  const getUserById = async (id: string) => {
    const docRef = doc(db, "Users", id);
    let user = null;
    try {
      const fetchUserData = await getDoc(docRef);
      user = fetchUserData.data() as User;
      console.log(user);
      setUserData(user);
    } catch (error) {
      console.error(error);
      setUserData(null);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      console.log("user after loging", authUser);
      setCurrentUser(authUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (currentUser != null) {
      getUserById(currentUser);
    }
  }, [currentUser]);

  const authHandler = {
    currentUser,
    userData,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authHandler}>{children}</AuthContext.Provider>
  );
};

export default useAuth;
