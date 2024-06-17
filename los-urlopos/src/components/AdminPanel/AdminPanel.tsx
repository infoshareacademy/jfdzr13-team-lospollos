// AdminPanel.tsx
import styles from "./AdminPanel.module.css";
import { Toaster } from "react-hot-toast";
import React, { FC, useEffect, useState, FormEvent, ChangeEvent } from "react";
import { User } from "../../types-obj/types-obj";
import { db } from "../../../firebase";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

const AdminPanel: FC = () => {
  const [users, setUsers] = useState<User[]>([]);
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
    roleUser: true,
    roleSupervisor: false,
    userId: "",
    isActive: true,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedUserId, setExpandedUserId] = useState<string | null>(null);

  useEffect(() => {
    const usersCollection = collection(db, "Users");
    const unsub = onSnapshot(
      usersCollection,
      (snapshot) => {
        const usersData: User[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as User),
        }));
        setUsers(usersData);
        setLoading(false);
      },
      (error) => {
        setError(error.message);
        setLoading(false);
      }
    );

    return () => unsub();
  }, []);

  const addUser = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const password = "123456789";

      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        newUser.email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "Users", user?.uid), {
        ...newUser,
        userId: user?.uid ?? "",
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
        isActive: true,
      });
      setError(null);
    } catch (error) {
      console.error("Error adding user: ", error);
      setError("Error adding user.");
    }
  };

  const deleteUser = async (id: string) => {
    try {
      //add deleting from authentication !!!!!

      await deleteDoc(doc(db, "Users", id));
      setError(null);
    } catch (error) {
      console.error("Error deleting user: ", error);
      setError("Error deleting user.");
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const toggleUserDetails = (id: string) => {
    setExpandedUserId(expandedUserId === id ? null : id);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.adminPanel}>
      <Toaster />
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
          Created By:
          <input
            type="text"
            name="createdBy"
            placeholder="Created By"
            value={newUser.createdBy}
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
        <label>
          User ID:
          <input
            type="text"
            name="userId"
            placeholder="User ID"
            value={newUser.userId}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Add User</button>
      </form>

      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <div className={styles.userHeader}>
              <span>
                <strong>Name:</strong> {user.firstName} {user.surname}
              </span>
              <button onClick={() => toggleUserDetails(user.id!)}>
                {expandedUserId === user.id ? "Hide details" : "Show details"}
              </button>
            </div>
            {expandedUserId === user.id && (
              <div className={styles.userDetails}>
                <div>
                  <strong>Email:</strong> {user.email}
                </div>
                <div>
                  <strong>Created At:</strong>{" "}
                  {new Date(user.createdAt).toLocaleString()}
                </div>
                <div>
                  <strong>Created By:</strong> {user.createdBy}
                </div>
                <div>
                  <strong>Current Days:</strong> {user.currentDays}
                </div>
                <div>
                  <strong>Days:</strong> {user.days}
                </div>
                <div>
                  <strong>Dept ID:</strong> {user.deptId}
                </div>
                <div>
                  <strong>On Demand:</strong> {user.onDemand}
                </div>
                <div>
                  <strong>Role:</strong>{" "}
                  {user.roleAdmin
                    ? "Admin"
                    : user.roleSupervisor
                    ? "Supervisor"
                    : "User"}
                </div>
                <div>
                  <strong>User Role:</strong> {user.roleUser ? "User" : ""}
                </div>
                <div>
                  <strong>User ID:</strong> {user.userId}
                </div>
                <button onClick={() => deleteUser(user.id!)}>
                  Delete User
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default AdminPanel;
