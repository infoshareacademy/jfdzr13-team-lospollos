// AdminPanel.tsx
import React, { FC, useEffect, useState } from "react";
import { User } from "../../types-obj/types-obj";
import { db } from "../../../firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";

const AdminPanel: FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState<User>({ name: "", email: "" });

  useEffect(() => {
    const usersCollection = collection(db, "Users");
    const unsub = onSnapshot(usersCollection, (snapshot) => {
      const usersData: User[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as User),
      }));
      setUsers(usersData);
    });
    return () => unsub();
  }, []);

  const addUser = async (event) => {
    event.preventDefault();
    try {
      await addDoc(collection(db, "Users"), newUser);
      setNewUser({ name: "", email: "" });
    } catch (error) {
      console.error("Error adding user: ", error);
    }
  };

  const deleteUser = async (id: string) => {
    try {
      await deleteDoc(doc(db, "Users", id));
    } catch (error) {
      console.error("Error deleting user: ", error);
    }
  };

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name}, {user.email}
            <button onClick={() => deleteUser(user.id!)}>Delete User</button>
          </li>
        ))}
      </ul>
      <h2>Add User</h2>
      <form onSubmit={addUser}>
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default AdminPanel;
