import { useState } from "react";
import { AddRequest } from "../AddRequest/AddRequest";
import ListComponent from "../UserPanel/ListComponent/ListComponent";
import { UserComponent } from "../UserPanel/UserComponent/UserComponent";
import styles from "./spvPanel.module.css";

export function SpvPanel() {
  const [showAddRequest, setShowAddRequest] = useState(false);

  const handleAddButtonClick = () => {
    setShowAddRequest(true);
  };

  const handleCloseRequest = () => {
    setShowAddRequest(false);
  };

  return (
    <div className={styles.mainContainer}>
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
