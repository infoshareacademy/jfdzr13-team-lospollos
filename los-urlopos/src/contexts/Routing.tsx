import { Route, Routes } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Login from "../components/Login/Login";
import Settings from "../components/Settings/Settings"
import { UserPanel } from "../components/UserPanel/UserPanel";
import PrivateRoute from "./PrivateRoute";
import Logout from "../components/Logout/Logout";

const Routing = () => {
  return (
    <Routes>
      {/* public */}
      <Route path="login" element={<Login />} />
      {/* private */}
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Layout />}>
          <Route path="userPanel" element={<UserPanel />} />
          <Route path="settings" element={<Settings />} />
          <Route path="logout" element={<Logout />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Routing;
