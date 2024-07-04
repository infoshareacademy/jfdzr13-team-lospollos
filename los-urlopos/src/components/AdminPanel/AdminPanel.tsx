import React, { FC, useState } from "react";
import styles from "./AdminPanel.module.css";
import UsersList from "./UsersList/UsersList";
import DepartmentsList from "./DepartmentsList/DepartmentsList";
import BankHolidaysForm from "./BankHolidaysForm/BankHolidaysForm";

const AdminPanel: FC = () => {
  const [selectedSection, setSelectedSection] = useState<string>("users");

  const renderSection = () => {
    switch (selectedSection) {
      case "users":
        return <UsersList />;
      case "departments":
        return <DepartmentsList />;
      case "bankHolidays":
        return <BankHolidaysForm />;
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
      </div>
      {renderSection()}
    </div>
  );
};

export default AdminPanel;
