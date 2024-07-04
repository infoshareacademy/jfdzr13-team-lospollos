import { FC, useEffect, useState } from "react";
import { User } from "../../../types-obj/types-obj";
import styles from "./UsersList.module.css";
import { subscribeToUsers } from "../../../services/UserService";
import AddUser from "../AddUser/AddUser";
import AdminUsersTable from "../AdminUsersTable/AdminUsersTable";

type UsersListProps = {
  openAddUserModal: () => void;
};

const UsersList: FC<UsersListProps> = ({}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsAddUserDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsAddUserDialogOpen(false);
  };

  useEffect(() => {
    const unsub = subscribeToUsers(
      (usersData) => {
        setUsers(usersData);
        setIsLoading(false);
      },
      (errorMessage) => {
        setError(errorMessage);
        setIsLoading(false);
      }
    );

    return () => unsub();
  }, []);

  if (isLoading) {
    return <div className={styles.spinner}></div>;
  }
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <dialog open={isAddUserDialogOpen} onClose={handleCloseDialog}>
        <AddUser onUserAdded={handleCloseDialog} onClose={handleCloseDialog} />
      </dialog>
      <div className={styles.tableWrapper}>
        <AdminUsersTable onAddUserBtnClick={handleOpenDialog} />
      </div>
    </div>
  );
};

export default UsersList;
