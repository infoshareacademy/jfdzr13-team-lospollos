import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import styles from "./Layout.module.css";
import NavBar from "../NavBar/NavBar";

const Layout: FC = () => {
  const { layout, header, content } = styles;
  return (
    <div className={layout}>
      <header className={header}>
        <NavBar />
      </header>
      <main className={content}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
