import React, { FC, FormEvent, ChangeEvent, useState, useEffect } from "react";
import { Departments, User } from "../../../types-obj/types-obj";
import { getCurrentUser } from "../../../services/AuthService";
import { updateUser } from "../../../services/UserService";
import styles from "../AddUser/AddUser.module.css";
import { getDepartment } from "../../../services/DepartmentService";

type EditUserProps = {
  user: User;
  onUserUpdated: () => void;
  onClose: () => void;
};

const EditUser: FC<EditUserProps> = ({ user, onUserUpdated, onClose }) => {
  const [editedUser, setEditedUser] = useState<User>({ ...user });
  const [error, setError] = useState<string | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>();
  const [departments, setDepartments] = useState<Departments[]>([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const depts = await getDepartment();
        setDepartments(depts);
        setError(null);
      } catch (error) {
        console.error("Error fetching departments: ", error);
        setError("Error fetching departments.");
      }
    };

    fetchDepartments();
  }, []);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setEditedUser((prevUser) => ({
          ...prevUser,
          createdBy: currentUser ? currentUser.uid : "",
        }));
      } catch (error) {
        console.error("Error fetching current user: ", error);
        setError("Error fetching current user.");
      }
    };

    fetchCurrentUser();
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleInputChangeNumber = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked }: any = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: type === "checkbox" ? checked : parseInt(value),
    }));
  };

  const handleEditUser = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await updateUser(user.userId, editedUser);

      setError(null);
      onUserUpdated();
      onClose();
    } catch (error) {
      console.error("Error editing user: ", error);
      setError("Error editing user.");
    }
  };

  return (
    <div className={styles.popupWrapper}>
      <div className={styles.popupContent}>
        <div className={styles.addUserContent}>
          <h2 className={styles.addUserH2}>Edit User</h2>
          <form onSubmit={handleEditUser} className={styles.addUserForm}>
            <label className={styles.addUserLabel}>
              First Name:
              <input
                className={styles.addUserInput}
                type="text"
                name="firstName"
                placeholder="First Name"
                value={editedUser.firstName}
                onChange={handleInputChange}
                required
              />
            </label>
            <label className={styles.addUserLabel}>
              Surname:
              <input
                className={styles.addUserInput}
                type="text"
                name="surname"
                placeholder="Surname"
                value={editedUser.surname}
                onChange={handleInputChange}
                required
              />
            </label>

            <label className={styles.addUserLabel}>
              Current Days:
              <input
                className={styles.addUserInput}
                type="number"
                name="currentDays"
                placeholder="Current Days"
                value={editedUser.currentDays}
                onChange={handleInputChangeNumber}
                required
              />
            </label>
            <label className={styles.addUserLabel}>
              Days:
              <input
                className={styles.addUserInput}
                type="number"
                name="days"
                placeholder="Days"
                value={editedUser.days}
                onChange={handleInputChangeNumber}
                required
              />
            </label>
            <label className={styles.addUserLabel}>
              Department:
              <select
                className={styles.deptSelector}
                value={selectedDepartment || ""}
                onChange={(event) => {
                  setSelectedDepartment(event.target.value);
                  setEditedUser((prevUser) => ({
                    ...prevUser,
                    deptId: event.target.value,
                  }));
                }}
              >
                <option value="" disabled hidden>
                  Select a department
                </option>
                {departments.map((department) => (
                  <option key={department.deptId} value={department.deptId}>
                    {department.dept}
                  </option>
                ))}
              </select>
            </label>
            <label className={styles.addUserLabel}>
              Admin
              <input
                className={styles.addUserInput}
                type="checkbox"
                name="roleAdmin"
                checked={editedUser.roleAdmin}
                onChange={handleInputChange}
              />
            </label>
            <label className={styles.addUserLabel}>
              User
              <input
                className={styles.addUserInput}
                type="checkbox"
                name="roleUser"
                checked={editedUser.roleUser}
                onChange={handleInputChange}
              />
            </label>
            <label className={styles.addUserLabel}>
              Supervisor
              <input
                className={styles.addUserInput}
                type="checkbox"
                name="roleSupervisor"
                checked={editedUser.roleSupervisor}
                onChange={handleInputChange}
              />
            </label>
            <div className={styles.addUserBtns}>
              <button className={styles.addUserBtn} type="submit">
                Save Changes
              </button>
              <button
                className={styles.closePopup}
                type="button"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </form>
          {error && <div style={{ color: "red" }}>{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default EditUser;
