import React, { FC, FormEvent, ChangeEvent, useState, useEffect } from "react";
import { User } from "../../../types-obj/types-obj";
import { db } from "../../../../firebase";
import { setDoc, doc } from "firebase/firestore";
import { createUser, getCurrentUser } from "../../../services/AuthService";

interface AddUserProps {
  onUserAdded: () => void;
  onClose: () => void;
}

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
  });
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

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

  const addUser = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const user = await createUser(newUser.email, password);
      await setDoc(doc(db, "Users", user.uid), {
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
    <div>
      <h2>Add User</h2>
      <form onSubmit={addUser}>
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={newUser.firstName}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Surname:
          <input
            type="text"
            name="surname"
            placeholder="Surname"
            value={newUser.surname}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={newUser.email}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Initial Password:
          <input
            type="text"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Current Days:
          <input
            type="number"
            name="currentDays"
            placeholder="Current Days"
            value={newUser.currentDays}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Days:
          <input
            type="number"
            name="days"
            placeholder="Days"
            value={newUser.days}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Department ID:
          <input
            type="text"
            name="deptId"
            placeholder="Department ID"
            value={newUser.deptId}
            onChange={handleInputChange}
          />
        </label>
        <label>
          On Demand:
          <input
            type="number"
            name="onDemand"
            placeholder="On Demand"
            value={newUser.onDemand}
            onChange={handleInputChange}
          />
        </label>
        <label>
          <input
            type="checkbox"
            name="roleAdmin"
            checked={newUser.roleAdmin}
            onChange={handleInputChange}
          />
          Admin
        </label>
        <label>
          <input
            type="checkbox"
            name="roleUser"
            checked={newUser.roleUser}
            onChange={handleInputChange}
          />
          User
        </label>
        <label>
          <input
            type="checkbox"
            name="roleSupervisor"
            checked={newUser.roleSupervisor}
            onChange={handleInputChange}
          />
          Supervisor
        </label>
        <button type="submit">Add User</button>
      </form>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

export default AddUser;
