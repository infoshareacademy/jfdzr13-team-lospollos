import { Navigate, Outlet, useLocation } from "react-router-dom";
// import { user } from "../types-obj/types-obj";
import useAuth from "./AuthContext";

const PrivateRoute = () => {
  const location = useLocation();
  const { authUserId } = useAuth();

  return (
    <>
      {authUserId != null ? (
        <Outlet />
      ) : (
        <Navigate to="/login" state={{ from: location }} replace />
      )}
    </>
  );
};

export default PrivateRoute;
