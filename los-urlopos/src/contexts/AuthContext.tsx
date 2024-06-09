import { onAuthStateChanged } from "firebase/auth";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth } from "../../firebase";
import { login, logout } from "../services/AuthService";
import { getUserById } from "../services/UserService";
import { AuthContext as ContextType, User } from "../types-obj/types-obj";

const defaultState: ContextType = {
  authUserId: null,
  userData: null,
  login: (email, password) => new Promise((resolve) => resolve),
  logout: () => new Promise((resolve) => resolve),
};

const AuthContext = createContext(defaultState);
const useAuth = (): ContextType => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authUserId, setAuthUserId] = useState<string | null>(null);
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user != null) {
        setAuthUserId(user.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (authUserId != null) {
      getUserById(authUserId).then((user) => {
        setUserData(user);
      });
    }
  }, [authUserId]);

  const authHandler: ContextType = {
    authUserId,
    userData,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authHandler}>{children}</AuthContext.Provider>
  );
};

export default useAuth;
