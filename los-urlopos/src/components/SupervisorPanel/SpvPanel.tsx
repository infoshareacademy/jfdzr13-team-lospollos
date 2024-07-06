import { useEffect, useState } from "react";
import useUserData from "../../contexts/ViewDataContext";
import { AddRequest } from "../AddRequest/AddRequest";
import SpvRequestsTable from "./SpvRequestsTable/SpvRequestsTable";
import { SpvComponent } from "./SupervisorComponent/SpvComponent";
import styles from "./spvPanel.module.css";

export function SpvPanel() {
  const [showAddRequest, setShowAddRequest] = useState(false);
  const { userData } = useUserData();
  const [bgClass, setBgClass] = useState(styles.bgUser); // Default class
  const [navbarClass, setNavbarClass] = useState(styles.navbarUser); // Default class
  const [deptContext, setDeptContext] = useState<string | null>(null);

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

  const getDeptIfFromChild = (departmentId: string | null) => {
    setDeptContext(departmentId);
  };

  return (
    <div className={`${styles.mainContainer} ${bgClass}`}>
      <div
        className={`${styles.userAndListContainer} ${
          showAddRequest ? styles.dimmed : ""
        }`}
      >
        <SpvComponent departmentId={deptContext} />
        <SpvRequestsTable getDeptContext={getDeptIfFromChild} />
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
