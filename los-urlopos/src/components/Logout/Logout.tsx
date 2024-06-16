import useAuth from "../../contexts/AuthContext";

const Logout = () => {

  useAuth().logout();

  return <></>;
};

export default Logout;
