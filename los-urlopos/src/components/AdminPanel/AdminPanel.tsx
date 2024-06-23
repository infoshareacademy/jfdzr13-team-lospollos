import React, { FC, useState } from "react";
import styles from "./AdminPanel.module.css";
import AddUser from "./AddUser/AddUser";
import UsersList from "./UsersList/UsersList";
import RequestsList from "./RequestsList/RequestsList";
import DepartmentsList from "./DepartmentsList/DepartmentsList";
import Modal from "react-modal";
import BankHolidaysForm from "./BankHolidaysForm/BankHolidaysForm";

const AdminPanel: FC = () => {
  const [selectedSection, setSelectedSection] = useState<string>("users");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const renderSection = () => {
    switch (selectedSection) {
      case "users":
        return <UsersList openAddUserModal={openModal} />;

      case "requests":
        return <RequestsList />;
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
        <button onClick={() => setSelectedSection("users")}>Users</button>
        <button onClick={() => setSelectedSection("requests")}>Requests</button>
        <button onClick={() => setSelectedSection("departments")}>
          Departments
        </button>
        <button onClick={() => setSelectedSection("bankHolidays")}>
          Bank Holidays
        </button>
      </div>
      {renderSection()}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Add User"
      >
        <button onClick={closeModal}>Close</button>
        <AddUser onUserAdded={closeModal} />
      </Modal>
    </div>
  );
};

export default AdminPanel;
