import React, { FC, useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import styles from "./NavBar.module.css";
import useUserData from "../../contexts/ViewDataContext";

const NavBar: FC = () => {
  const { userData } = useUserData();
  const location = useLocation();
  const [navbarClass, setNavbarClass] = useState(styles.navbar); // Początkowa klasa to domyślna klasa navbaru

  useEffect(() => {
    if (userData) {
      // Sprawdzamy role użytkownika i ustawiamy odpowiednią klasę navbaru
      if (userData.roleAdmin && userData.roleSupervisor && userData.roleUser) {
        setNavbarClass(styles.navbarAllRoles);
      } else if (userData.roleAdmin) {
        setNavbarClass(styles.navbarAdmin);
      } else if (userData.roleSupervisor) {
        setNavbarClass(styles.navbarSupervisor);
      } else if (userData.roleUser) {
        setNavbarClass(styles.navbarUser);
      }
    }
  }, [userData]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <nav className={navbarClass}>
      <div>
        <NavLink to="/home">Home</NavLink>
        <span className={styles.menuSpan}> | </span>
        {userData.roleUser && <NavLink to="/user-panel">User Panel</NavLink>}
        {userData.roleSupervisor || userData.roleAdmin ? (
          <span className={styles.menuSpan}> | </span>
        ) : null}
        {userData.roleSupervisor && (
          <NavLink to="/supervisor-panel">Supervisor Panel</NavLink>
        )}
        {userData.roleUser && userData.roleSupervisor && userData.roleAdmin ? (
          <span className={styles.menuSpan}> | </span>
        ) : null}
        {userData.roleAdmin && <NavLink to="/admin-panel">Admin Panel</NavLink>}
      </div>
      <div>
        <NavLink to="/settings">Settings</NavLink>
        <span className={styles.menuSpan}> | </span>
        <NavLink to="/logout">Logout</NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
