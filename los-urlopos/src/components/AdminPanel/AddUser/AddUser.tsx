import React, { FC, FormEvent, ChangeEvent } from "react";
import { User } from "../../../types-obj/types-obj";
import styles from "./AddUser.module.css";

interface AddUserProps {
  newUser: User;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  addUser: (event: FormEvent) => void;
  error: string | null;
  closeAddUser: () => void;
}

export const AddUser: FC<AddUserProps> = ({
  newUser,
  handleInputChange,
  addUser,
  error,
  closeAddUser,
}) => {
  return (
    <div className={styles.popupWrapper}>
      <div className={styles.popupContent}>
        <div className={styles.addUserContent}>
          <h2 className={styles.addUserH2}>Add User</h2>
          <form onSubmit={addUser} className={styles.addUserForm}>
            <label className={styles.addUserLabel}>
              First Name:
              <input
                className={styles.addUserInput}
                type="text"
                name="firstName"
                placeholder="First Name"
                value={newUser.firstName}
                onChange={handleInputChange}
              />
            </label>
            <label className={styles.addUserLabel}>
              Surname:
              <input
                className={styles.addUserInput}
                type="text"
                name="surname"
                placeholder="Surname"
                value={newUser.surname}
                onChange={handleInputChange}
              />
            </label>
            <label className={styles.addUserLabel}>
              Email:
              <input
                className={styles.addUserInput}
                type="email"
                name="email"
                placeholder="Email"
                value={newUser.email}
                onChange={handleInputChange}
              />
            </label>
            <label className={styles.addUserLabel}>
              Created By:
              <input
                className={styles.addUserInput}
                type="text"
                name="createdBy"
                placeholder="Created By"
                value={newUser.createdBy}
                onChange={handleInputChange}
              />
            </label>
            <label className={styles.addUserLabel}>
              Current Days:
              <input
                className={styles.addUserInput}
                type="number"
                name="currentDays"
                placeholder="Current Days"
                value={newUser.currentDays}
                onChange={handleInputChange}
              />
            </label>
            <label className={styles.addUserLabel}>
              Days:
              <input
                className={styles.addUserInput}
                type="number"
                name="days"
                placeholder="Days"
                value={newUser.days}
                onChange={handleInputChange}
              />
            </label>
            <label className={styles.addUserLabel}>
              Department ID:
              <input
                className={styles.addUserInput}
                type="text"
                name="deptId"
                placeholder="Department ID"
                value={newUser.deptId}
                onChange={handleInputChange}
              />
            </label>
            <label className={styles.addUserLabel}>
              On Demand:
              <input
                className={styles.addUserInput}
                type="number"
                name="onDemand"
                placeholder="On Demand"
                value={newUser.onDemand}
                onChange={handleInputChange}
              />
            </label>
            <label className={styles.addUserLabel}>
              Admin
              <input
                className={styles.addUserInput}
                type="checkbox"
                name="roleAdmin"
                checked={newUser.roleAdmin}
                onChange={handleInputChange}
              />
            </label>
            <label className={styles.addUserLabel}>
              User
              <input
                className={styles.addUserInput}
                type="checkbox"
                name="roleUser"
                checked={newUser.roleUser}
                onChange={handleInputChange}
              />
            </label>
            <label className={styles.addUserLabel}>
              Supervisor
              <input
                className={styles.addUserInput}
                type="checkbox"
                name="roleSupervisor"
                checked={newUser.roleSupervisor}
                onChange={handleInputChange}
              />
            </label>
            <label className={styles.addUserLabel}>
              User ID:
              <input
                className={styles.addUserInput}
                type="text"
                name="userId"
                placeholder="User ID"
                value={newUser.userId}
                onChange={handleInputChange}
              />
            </label>
            <div className={styles.addUserBtns}>
              <button className={styles.addUserBtn} type="submit">
                Add User
              </button>
              <button
                type="button"
                onClick={closeAddUser}
                className={styles.closePopup}
              >
                Close
              </button>
            </div>
          </form>
          {error && <div className={styles.error}>{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default AddUser;
