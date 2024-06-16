import styles from "./App.module.css";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import PrivateRoute from "./contexts/PrivateRoute";
import Layout from "./components/Layout/Layout";
import Dashboard from "./components/Dashboard/Dashboard";
import { SpvPanel } from "./components/SupervisorPanel/SpvPanel";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import { UserPanel } from "./components/UserPanel/UserPanel";
import Settings from "./components/Settings/Settings";
import Logout from "./components/Logout/Logout";

function App() {
  return (
    <Routes>
      {/* public */}
      <Route path="login" element={<Login />} />
      {/* private */}
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Layout />}>
          <Route path="/home" element={<Dashboard />} />
          <Route path="/supervisor-panel" element={<SpvPanel />} />
          <Route path="/admin-panel" element={<AdminPanel />} />
          <Route path="/user-panel" element={<UserPanel />} />
          <Route path="settings" element={<Settings />} />
          <Route path="logout" element={<Logout />} />
        </Route>
        {/* safe route to always redirect to home when logged*/}
        <Route path="*" element={<Layout />} /> {/*zamienic na 404*/}
      </Route>
    </Routes>
  );
}

export default App;
