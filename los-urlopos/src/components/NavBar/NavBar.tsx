import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";
import useUserData from "../../contexts/ViewDataContext";

const NavBar: FC = () => {
  const { userData } = useUserData();
  console.log(userData);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <nav className={styles.navbar}>
      <div>
        <NavLink to="/home">Home</NavLink>
        {userData.roleUser && <NavLink to="/userPanel">User Panel</NavLink>}
        {userData.roleSupervisor && (
          <NavLink to="/supervisorPanel">Supervisor Panel</NavLink>
        )}
        {userData.roleAdmin && <NavLink to="/adminPanel">Admin Panel</NavLink>}
      </div>
      <div>
        <NavLink to="/user">User</NavLink>
        <NavLink to="/login">Logout</NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
