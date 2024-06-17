import { onAuthStateChanged } from "firebase/auth";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth } from "../../firebase";
import { login, logout, changePassword } from "../services/AuthService";
import { AuthUser, AuthContext as ContextType } from "../types-obj/types-obj";

const defaultState: ContextType = {
  authUser: null,
  login: (email, password) => new Promise((resolve) => resolve),
  logout: () => new Promise((resolve) => resolve),
  changePassword: (newPassword) => {},
};

const AuthContext = createContext(defaultState);
const useAuth = (): ContextType => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      user != null
        ? setAuthUser({
            id: user.uid,
            email: user?.email ?? "",
            name: user?.displayName ?? "",
          })
        : setAuthUser(null);
    });

    return () => unsubscribe();
  }, []);

  const authHandler: ContextType = {
    authUser,
    login,
    logout,
    changePassword,
  };

  return (
    <AuthContext.Provider value={authHandler}>{children}</AuthContext.Provider>
  );
};

export default useAuth;
