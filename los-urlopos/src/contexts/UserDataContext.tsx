import { createContext, useContext, useEffect, useState } from "react";
import { getUserById } from "../services/UserService";
import { getBankHolidays } from "../services/BankHolidaysService";
import { getDepartmentById } from "../services/getDepartmentById";
import useAuth from "./AuthContext";

const UserDataContext = createContext({});
const useUserData = () => useContext(UserDataContext);

export const UserDataProvider = ({ children }) => {
  const { authUserId } = useAuth();

  const [userData, setUserData] = useState(null);
  const [bankHolidaysData, setBankHolidaysData] = useState(null);
  const [departmentData, setDepartmentData] = useState(null);

  const getUserData = async () => {
    try {
      const user = await getUserById(authUserId);
      console.log("User data:", user); // Debug log
      setUserData(user);
      if (user.deptId) {
        console.log("Department ID:", user.deptId); // Debug log for deptId
        const department = await getDepartmentById(user.deptId);
        console.log("Department data:", department); // Debug log
        setDepartmentData(department);
      } else {
        console.log("No department ID found for user."); // Debug log
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getBankHolidaysData = async () => {
    try {
      const holidays = await getBankHolidays();
      console.log("Bank holidays data:", holidays); // Debug log
      setBankHolidaysData(holidays);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (authUserId) {
      getUserData();
    }
  }, [authUserId]);

  useEffect(() => {
    getBankHolidaysData();
  }, []);

  const userDataHandler = {
    userData,
    departmentData,
    getUserData,
    bankHolidaysData,
    getBankHolidaysData,
  };

  return (
    <UserDataContext.Provider value={userDataHandler}>
      {children}
    </UserDataContext.Provider>
  );
};

export default useUserData;
