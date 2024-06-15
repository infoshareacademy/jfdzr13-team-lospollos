import { createContext, useContext, useEffect, useState } from "react";
import { getUserById } from "../services/UserService";
import { getBankHolidays } from "../services/BankHolidaysService";
import { getDepartment } from "../services/DepartmentService";

import useAuth from "./AuthContext";

const UserDataContext = createContext({});
const useUserData = () => useContext(UserDataContext);

export const UserDataProvider = ({ children }) => {
  const { authUser } = useAuth();

  const [userData, setUserData] = useState(null);
  const [bankHolidaysData, setBankHolidaysData] = useState(null);
  const [departmentsList, setDepartmentsList] = useState(null);

  const getUserData = async () => {
    try {
      const user = await getUserById(authUser!.id);
      setUserData(user);
    } catch (error) {
      console.error(error);
    }
  };

  const getBankHoliydaysData = async () => {
    try {
      const holidays = await getBankHolidays();
      setBankHolidaysData(holidays);
    } catch (error) {
      console.error(error);
    }
  };

  const getDepartmentList = async () => {
    try {
      const departments = await getDepartment();
      setDepartmentsList(departments);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    getBankHoliydaysData();
  }, []);

  useEffect(() => {
    getDepartmentList();
  }, []);

  const userDataHandler = {
    userData,
    getUserData,
    bankHolidaysData,
    getBankHoliydaysData,
    departmentsList,
    getDepartmentList,
  };

  return (
    <UserDataContext.Provider value={userDataHandler}>
      {children}
    </UserDataContext.Provider>
  );
};

export default useUserData;
