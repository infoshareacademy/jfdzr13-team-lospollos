import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
// import { user } from "../types-obj/types-obj";
import useAuth from "./AuthContext";

const PrivateRoute = () => {
  const location = useLocation();
  const { loggedUser } = useAuth();

  return (
    <>
      {console.log(loggedUser)}
      {/* line below has to be changed to 'user' from '!user' to allow route to operate properly, this is only for site buidling for now*/}
      {loggedUser ? (
        <Outlet />
      ) : (
        <Navigate to="/login" state={{ from: location }} replace />
      )}
      console.log
    </>
  );
};

export default PrivateRoute;
