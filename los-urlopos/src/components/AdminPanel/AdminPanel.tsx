import React, { FC, useEffect, useState } from "react";
import styles from "./AdminPanel.module.css";
import UsersList from "./UsersList/UsersList";
import DepartmentsList from "./DepartmentsList/DepartmentsList";
import BankHolidaysForm from "./BankHolidaysForm/BankHolidaysForm";

const AdminPanel: FC = () => {
  const [selectedSection, setSelectedSection] = useState<string>("users");
  const [isDialogOpen, setIsDialogOpen] = useState(true);

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const renderSection = () => {
    switch (selectedSection) {
      case "users":
        return <UsersList />;
      case "departments":
        return <DepartmentsList />;
      case "bankHolidays":
        return (
          <dialog open={isDialogOpen}>
            <BankHolidaysForm onClose={handleCloseDialog} />;
          </dialog>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.adminPanel}>
      <div className={styles.navbar}>
        <button
          className={styles.adminPanelBtn}
          onClick={() => setSelectedSection("users")}
        >
          Users
        </button>
        <span className={styles.adminPanelSpan}> | </span>
        <button
          className={styles.adminPanelBtn}
          onClick={() => setSelectedSection("departments")}
        >
          Departments
        </button>
        <span className={styles.adminPanelSpan}> | </span>
        <button
          className={styles.adminPanelBtn}
          onClick={() => setSelectedSection("bankHolidays")}
        >
          Bank Holidays
        </button>
        <div className={styles.navbarWrapper}>
          <button
            className={styles.adminPanelBtn}
            onClick={() => {
              setSelectedSection("users");
              setIsDialogOpen(true);
            }}
          >
            Users
          </button>
          <span className={styles.adminPanelSpan}> | </span>
          <button
            className={styles.adminPanelBtn}
            onClick={() => {
              setSelectedSection("departments");
              setIsDialogOpen(true);
            }}
          >
            Departments
          </button>
          <span className={styles.adminPanelSpan}> | </span>
          <button
            className={styles.adminPanelBtn}
            onClick={() => setSelectedSection("bankHolidays")}
          >
            Admin Actions
          </button>
        </div>
      </div>
      {renderSection()}
    </div>
  );
};

export default AdminPanel;
