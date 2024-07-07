import { Outlet } from "react-router-dom";
import InactiveUserComponent from "../components/InactiveUser/InactiveUserComponent";
import useUserData from "./ViewDataContext";

const InactiveUserRoute = () => {
  const { userData } = useUserData();

  console.log(userData.isActive);

  return <>{userData.isActive ? <Outlet /> : <InactiveUserComponent />}</>;
};

export default InactiveUserRoute;
