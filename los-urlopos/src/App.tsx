import { Route, Routes } from "react-router-dom";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import Dashboard from "./components/Dashboard/Dashboard";
import Layout from "./components/Layout/Layout";
import Login from "./components/Login/Login";
import Logout from "./components/Logout/Logout";
import Settings from "./components/Settings/Settings";
import { SpvPanel } from "./components/SupervisorPanel/SpvPanel";
import { UserPanel } from "./components/UserPanel/UserPanel";
import InactiveUserRoute from "./contexts/InactiveUserRoute";
import PrivateRoute from "./contexts/PrivateRoute";

function App() {
  return (
    <Routes>
      {/* public */}
      <Route path="login" element={<Login />} />
      {/* private */}
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Layout />}>
          <Route element={<InactiveUserRoute />}>
            <Route index element={<Dashboard />} />{" "}
            {/* Default element for '/' */}
            <Route path="supervisor-panel" element={<SpvPanel />} />
            <Route path="admin-panel" element={<AdminPanel />} />
            <Route path="user-panel" element={<UserPanel />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="logout" element={<Logout />} />
          {/* safe route to always redirect to / when logged*/}
          <Route path="*" element={<Settings />} />{" "}
          {/* Handle unknown routes */}
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
