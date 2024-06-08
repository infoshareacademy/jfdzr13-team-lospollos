import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";

const NavBar: FC = () => {
  const { navbar } = styles;
  return (
    <nav className={navbar}>
      <ul>
        <NavLink to="/userPanel">Home</NavLink>
        <div>
          <NavLink to="/user">User</NavLink>
          <NavLink to="/login">Logout</NavLink>
        </div>
      </ul>
    </nav>
  );
};

export default NavBar;
