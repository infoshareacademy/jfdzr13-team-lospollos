import React, { FC, FormEvent, ChangeEvent, useState, useEffect } from "react";
import { Departments, User } from "../../../types-obj/types-obj";
import { createUser, getCurrentUser } from "../../../services/AuthService";
import { addUser } from "../../../services/UserService";
import styles from "./AddUser.module.css";
import { getDepartment } from "../../../services/DepartmentService";

type AddUserProps = {
  onUserAdded: () => void;
  onClose: () => void;
};

const AddUser: FC<AddUserProps> = ({ onUserAdded, onClose }) => {
  const [newUser, setNewUser] = useState<User>({
    createdAt: Date.now(),
    createdBy: "",
    currentDays: 0,
    days: 0,
    deptId: "",
    email: "",
    firstName: "",
    surname: "",
    onDemand: 0,
    roleAdmin: false,
    roleUser: false,
    roleSupervisor: false,
    userId: "",
    isActive: true,
  });
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    null
  );
  const [departments, setDepartments] = useState<Departments[]>([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const depts = await getDepartment();
        console.log("Departments:", depts);
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
        setNewUser((prevUser) => ({
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
    if (name === "password") {
      setPassword(value);
    } else {
      setNewUser((prevUser) => ({
        ...prevUser,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleInputChangeNumber = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (name === "password") {
      setPassword(value);
    } else {
      setNewUser((prevUser) => ({
        ...prevUser,
        [name]: type === "checkbox" ? checked : parseInt(value),
      }));
    }
  };

  const handleAddUser = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const user = await createUser(newUser.email, password);
      console.log("New User", user);
      await addUser(user.uid, {
        ...newUser,
        userId: user.uid,
      });

      setNewUser({
        createdAt: Date.now(),
        createdBy: "",
        currentDays: 0,
        days: 0,
        deptId: "",
        email: "",
        firstName: "",
        surname: "",
        onDemand: 0,
        roleAdmin: false,
        roleUser: true,
        roleSupervisor: false,
        userId: "",
      });
      setPassword("");
      setError(null);
      onUserAdded();
      onClose();
    } catch (error) {
      console.error("Error adding user: ", error);
      setError("Error adding user.");
    }
  };

  return (
    <div className={styles.popupWrapper}>
      <div className={styles.popupContent}>
        <div className={styles.addUserContent}>
          <h2 className={styles.addUserH2}>Add User</h2>
          <form onSubmit={handleAddUser} className={styles.addUserForm}>
            <label className={styles.addUserLabel}>
              First Name:
              <input
                className={styles.addUserInput}
                type="text"
                name="firstName"
                placeholder="First Name"
                value={newUser.firstName}
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
                value={newUser.surname}
                onChange={handleInputChange}
                required
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
                required
              />
            </label>
            <label className={styles.addUserLabel}>
              Initial Password:
              <input
                className={styles.addUserInput}
                type="text"
                name="password"
                placeholder="Password"
                value={password}
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
                value={newUser.currentDays}
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
                value={newUser.days}
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
                  console.log(selectedDepartment);
                  setNewUser((prevUser) => ({
                    ...prevUser,
                    deptId: event.target.value,
                  }));
                  console.log(newUser);
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
              On Demand:
              <input
                className={styles.addUserInput}
                type="number"
                name="onDemand"
                placeholder="On Demand"
                value={newUser.onDemand}
                onChange={handleInputChangeNumber}
                required
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
            <div className={styles.addUserBtns}>
              <button className={styles.addUserBtn} type="submit">
                Add User
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

export default AddUser;
