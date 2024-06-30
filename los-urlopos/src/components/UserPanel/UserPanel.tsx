import { useState, useEffect } from "react";
import { AddRequest } from "../AddRequest/AddRequest";
import ListComponent from "../TableComponent/TableComponent";
import { UserComponent } from "./UserComponent/UserComponent";
import styles from "./userPanel.module.css";
import useUserData from "../../contexts/ViewDataContext";
import TableComponent from "../TableComponent/TableComponent";
import UserRequestsTable from "./UserRequestsTable/UserRequestsTable";

export function UserPanel() {
  const [showAddRequest, setShowAddRequest] = useState(false);
  const { userData } = useUserData();
  const [panelClass, setPanelClass] = useState(styles.panelUser); // Default class

  const handleAddButtonClick = () => {
    setShowAddRequest(true);
  };

  const handleCloseRequest = () => {
    setShowAddRequest(false);
  };

  useEffect(() => {
    if (userData) {
      if (userData.roleAdmin) {
        setPanelClass(styles.panelAdmin);
      } else if (userData.roleSupervisor) {
        setPanelClass(styles.panelSupervisor);
      } else if (userData.roleUser) {
        setPanelClass(styles.panelUser);
      }
    }
  }, [userData]);

  return (
    <div className={`${styles.mainContainer} ${panelClass}`}>
      <div
        className={`${styles.userAndListContainer} ${
          showAddRequest ? styles.dimmed : ""
        }`}
      >
        <UserComponent onAddButtonClick={handleAddButtonClick} />
        <UserRequestsTable />
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
