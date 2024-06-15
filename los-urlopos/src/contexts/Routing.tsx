import { Route, Routes } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Login from "../components/Login/Login";
import Settings from "../components/Settings/Settings";
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
          <Route path="settings" element={<Settings />} />
          <Route path="logout" element={<Logout />} />
        </Route>
        {/* safe route to always redirect to home when logged*/}
        <Route path="*" element={<Layout />} /> {/*zamienic na 404*/}
      </Route>
    </Routes>
  );
};

export default Routing;
