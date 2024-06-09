import { createContext, useContext, useEffect, useState } from "react";
import { getUserById } from "../services/UserService";
import useAuth from "./AuthContext";

const UserDataContext = createContext({});
const useUserData = () => useContext(UserDataContext);
const { authUserId } = useAuth();

export const UserDataProvider = ({ children }) => {
  const entryUser = getUserById(authUserId);
  const [userData, setUserData] = useState(entryUser);
  const [userModified, setUserModified] = useState(false);

  const reloadUser = () => {
    setUserModified(true);
  };

  useEffect(() => {
    {
      getUserById(authUserId).then((user) => {
        setUserData(user);
      });
      setUserModified(false);
    }
  }, [userModified]);

  const userDataHandler = {
    userData,
    reloadUser,
  };

  return (
    <UserDataContext.Provider value={userDataHandler}>
      {children}
    </UserDataContext.Provider>
  );
};

export default useUserData;
