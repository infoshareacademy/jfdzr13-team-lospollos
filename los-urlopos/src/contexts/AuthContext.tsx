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
import { AuthContext as ContextType } from "../types-obj/types-obj";

const defaultState: ContextType = {
  authUserId: null,
  login: (email, password) => new Promise((resolve) => resolve),
  logout: () => new Promise((resolve) => resolve),
};

const AuthContext = createContext(defaultState);
const useAuth = (): ContextType => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authUserId, setAuthUserId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      user != null ? setAuthUserId(user.uid) : setAuthUserId(null);
    });

    return () => unsubscribe();
  }, []);

  const authHandler: ContextType = {
    authUserId,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authHandler}>{children}</AuthContext.Provider>
  );
};

export default useAuth;
