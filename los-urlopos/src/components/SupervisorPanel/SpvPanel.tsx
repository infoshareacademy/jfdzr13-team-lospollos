import { useState, useEffect } from "react";
import { AddRequest } from "../AddRequest/AddRequest";
import ListComponent from "../TableComponent/TableComponent";
import { UserComponent } from "../UserPanel/UserComponent/UserComponent";
import useUserData from "../../contexts/ViewDataContext";
import styles from "./spvPanel.module.css";

export function SpvPanel() {
  const [showAddRequest, setShowAddRequest] = useState(false);
  const { userData } = useUserData();
  const [bgClass, setBgClass] = useState(styles.bgUser); // Default class
  const [navbarClass, setNavbarClass] = useState(styles.navbarUser); // Default class

  useEffect(() => {
    if (userData) {
      if (userData.roleAdmin) {
        setBgClass(styles.bgAdmin);
        setNavbarClass(styles.navbarAdmin);
      } else if (userData.roleSupervisor) {
        setBgClass(styles.bgSupervisor);
        setNavbarClass(styles.navbarSupervisor);
      } else if (userData.roleUser) {
        setBgClass(styles.bgUser);
        setNavbarClass(styles.navbarUser);
      }
    }
  }, [userData]);

  const handleAddButtonClick = () => {
    setShowAddRequest(true);
  };

  const handleCloseRequest = () => {
    setShowAddRequest(false);
  };

  return (
    <div className={`${styles.mainContainer} ${bgClass}`}>
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
