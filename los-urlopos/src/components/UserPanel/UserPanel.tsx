import React from "react";
import styles from "./userPanel.module.css";
import { UserComponent } from "./UserComponent/UserComponent";
import { ListComponent } from "./ListComponent/ListComponent";

export function UserPanel() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.devNavbar}>
        NAVBAR NAVBAR NAVBAR NAVBAR NAVBAR NAVBAR NAVBAR NAVBAR NAVBAR NAVBAR
        NAVBAR NAVBAR NAVBAR NAVBAR NAVBAR NAVBAR NAVBAR NAVBAR NAVBAR NAVBAR
        NAVBAR NAVBAR NAVBAR NAVBAR NAVBAR NAVBAR NAVBAR NAVBAR NAVBAR NAVBAR
        NAVBAR NAVBAR NAVBAR NAVBAR NAVBAR NAVBAR NAVBAR NAVBAR NAVBAR NAVBAR
        NAVBAR NAVBAR NAVBAR NAVBAR NAVBAR NAVBAR NAVBAR NAVBAR NAVBAR NAVBAR
        NAVBAR NAVBAR NAVBAR NAVBAR NAVBAR NAVBAR NAVBAR NAVBAR NAVBAR NAVBAR
      </div>
      <div className={styles.userAndListContainer}>
        <UserComponent />
        <ListComponent />
      </div>
    </div>
  );
}
