import { Route, Routes } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Login from "../components/Login/Login";
import MockUser from "../components/MockComponents/MockUser";
import { UserPanel } from "../components/UserPanel/UserPanel";
import PrivateRoute from "./PrivateRoute";
import Logout from "../components/Logout/Logout";
import Dashboard from "../components/Dashboard/Dashboard";
import SupervisorPanel from "../components/SupervisorPanel/SupervisorPanel";
import AdminPanel from "../components/AdminPanel/AdminPanel";

const Routing = () => {
  return (
    <Routes>
      {/* public */}
      <Route path="login" element={<Login />} />
      {/* private */}
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Layout />}>
          <Route path="/home" element={<Dashboard />} />
          <Route path="/supervisorPanel" element={<SupervisorPanel />} />
          <Route path="/adminPanel" element={<AdminPanel />} />
          <Route path="/userPanel" element={<UserPanel />} />
          <Route path="/user" element={<MockUser />} />
          <Route path="logout" element={<Logout />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Routing;
