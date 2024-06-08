import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import MockUser from "../components/MockComponents/MockUser";
import PrivateRoute from "./PrivateRoute";
import { UserPanel } from "../components/UserPanel/UserPanel";
import Login from "../components/Login/Login";

const Routing = () => {
  return (
    <Routes>
      {/* public */}
      <Route path="login" element={<Login />} />
      {/* private */}
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Layout />}>
          <Route path="/userPanel" element={<UserPanel />}></Route>
          <Route path="/user">
            <Route index element={<MockUser />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default Routing;
