import { Route, Routes } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Login from "../components/Login/Login";
import MockUser from "../components/MockComponents/MockUser";
import { UserPanel } from "../components/UserPanel/UserPanel";
import PrivateRoute from "./PrivateRoute";
import { UserDataProvider } from "./UserDataContext";
import { SpvPanel } from "../components/SupervisorPanel/SpvPanel";

const Routing = () => {
  return (
    <Routes>
      {/* public */}
      <Route path="login" element={<Login />} />
      {/* private */}
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Layout />}>
          <Route path="/userPanel" element={<UserPanel />}></Route>
          <Route path="/spvPanel" element={<SpvPanel />}></Route>
          <Route path="/user">
            <Route index element={<MockUser />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default Routing;
