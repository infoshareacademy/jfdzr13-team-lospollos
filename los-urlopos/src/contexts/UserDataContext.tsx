import { createContext, useContext, useEffect, useState } from "react";
import { getUserById } from "../services/UserService";
import useAuth from "./AuthContext";

const UserDataContext = createContext({});
const useUserData = () => useContext(UserDataContext);

export const UserDataProvider = ({ children }) => {
  const { authUserId } = useAuth();

  const [userData, setUserData] = useState(null);

  const getUserData = async () => {
    try {
      const user = await getUserById(authUserId);
      setUserData(user);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const userDataHandler = {
    userData,
    getUserData,
  };

  return (
    <UserDataContext.Provider value={userDataHandler}>
      {children}
    </UserDataContext.Provider>
  );
};

export default useUserData;
