import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";
import useUserData from "../../contexts/ViewDataContext";

const NavBar: FC = () => {
  const { userData } = useUserData();

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <nav className={styles.navbar}>
      <div>
        {userData.roleUser && <NavLink to="/user-panel">User Panel</NavLink>}
        {userData.roleSupervisor && (
          <NavLink to="/supervisor-panel">Supervisor Panel</NavLink>
        )}
        {userData.roleAdmin && <NavLink to="/admin-panel">Admin Panel</NavLink>}
      </div>
      <div>
        <NavLink to="settings">Settings</NavLink>
        <NavLink to="logout">Logout</NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
