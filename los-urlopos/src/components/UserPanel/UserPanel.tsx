import React, { useState } from "react";
import styles from "./userPanel.module.css";
import { UserComponent } from "./UserComponent/UserComponent";
import ListComponent from "./ListComponent/ListComponent";
import { AddRequest } from "../AddRequest/AddRequest";

export function UserPanel() {
  const [showAddRequest, setShowAddRequest] = useState(false);

  const handleAddButtonClick = () => {
    setShowAddRequest(true);
  };

  const handleCloseRequest = () => {
    setShowAddRequest(false);
  };

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
      <div
        className={`${styles.userAndListContainer} ${
          showAddRequest ? styles.dimmed : ""
        }`}
      >
        <UserComponent onAddButtonClick={handleAddButtonClick} />
        <ListComponent />
      </div>
      {showAddRequest && (
        <>
          <div className={styles.overlay}></div>
          <AddRequest onClose={handleCloseRequest} />
        </>
      )}
    </div>
  );
}
