import React, { FC, useEffect, useState } from "react";
import { User } from "../../../types-obj/types-obj";
import { db } from "../../../../firebase";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import styles from "./UsersList.module.css";
import ConfirmAction from "../ConfirmAction";

interface UsersListProps {
  openAddUserModal: () => void;
}

const UsersList: FC<UsersListProps> = ({ openAddUserModal }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedUserId, setExpandedUserId] = useState<string | null>(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
  const [userIdToDelete, setUserIdToDelete] = useState<string | null>(null);

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

  const deleteUser = async (id: string) => {
    try {
      await deleteDoc(doc(db, "Users", id));
      setError(null);
    } catch (error) {
      console.error("Error deleting user: ", error);
      setError("Error deleting user.");
    }
  };

  const confirmDeleteUser = (id: string) => {
    setUserIdToDelete(id);
    setConfirmDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (userIdToDelete) {
      deleteUser(userIdToDelete);
    }
    setConfirmDialogOpen(false);
    setUserIdToDelete(null);
  };

  const handleCancelDelete = () => {
    setConfirmDialogOpen(false);
    setUserIdToDelete(null);
  };

  const toggleUserDetails = (id: string) => {
    setExpandedUserId(expandedUserId === id ? null : id);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Users</h1>
      <button onClick={openAddUserModal}>Add User</button>
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
                    : "No"}
                </div>
                <div>
                  <strong>User Role:</strong> {user.roleUser ? "User" : ""}
                </div>
                <div>
                  <strong>User ID:</strong> {user.userId}
                </div>
                <button onClick={() => confirmDeleteUser(user.id!)}>
                  Delete User
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
      {error && <div className={styles.error}>{error}</div>}
      <ConfirmAction
        open={confirmDialogOpen}
        message="Are you sure you want to delete this user?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};

export default UsersList;
