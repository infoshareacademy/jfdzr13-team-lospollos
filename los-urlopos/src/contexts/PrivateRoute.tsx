import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { user } from "../types-obj/types-obj";

const PrivateRoute = () => {
  const location = useLocation();

  return (
    <>
      {/* line below has to be changed to 'user' from '!user' to allow route to operate properly, this is only for site buidling for now*/}
      {!user ? (
        <Outlet />
      ) : (
        <Navigate to="/login" state={{ from: location }} replace />
      )}
    </>
  );
};

export default PrivateRoute;
