import React from "react";
import { Routes, Route } from "react-router-dom";
import MockLogin from "../components/MockComponents/MockLogin";
import Layout from "../components/Layout/Layout";
import MockUser from "../components/MockComponents/MockUser";
import MockUserPanel from "../components/MockComponents/MockUserPanel";
import PrivateRoute from "./PrivateRoute";

const Routing = () => {
  return (
    <Routes>
      {/* public */}
      <Route path="login" element={<MockLogin />} />
      {/* private */}
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Layout />}>
          <Route path="/userPanel" element={<MockUserPanel />}></Route>
          <Route path="/user">
            <Route index element={<MockUser />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default Routing;
