import { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { User } from "../../../types-obj/types-obj";
import {
  deleteUser,
  getUserById,
  subscribeToUsers,
} from "../../../services/UserService";
import { getDepartment } from "../../../services/DepartmentService";
import styles from "./adminUsersTable.module.css";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import AddUser from "../AddUser/AddUser";

interface AdminUsersTableProps {
  onAddUserBtnClick: () => void;
}

export function AdminUsersTable({ onAddUserBtnClick }: AdminUsersTableProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [departments, setDepartments] = useState<{ [key: string]: string }>({});
  const [userIdToDelete, setUserIdToDelete] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
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
      } catch (error) {
        console.error("Error subscribing to users:", error);
        setIsLoading(false);
        setError("Error subscribing to users.");
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchDepartments = async () => {
      setIsLoading(true);

      try {
        const deptList = await getDepartment();
        const deptMap = deptList.reduce(
          (acc, dept) => ({
            ...acc,
            [dept.deptId]: dept.dept,
          }),
          {}
        );
        console.log(deptMap);
        setDepartments(deptMap);
      } catch (error) {
        console.error("Error fetching departments:", error);
        setDepartments({});
      } finally {
        setIsLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  const handleDeleteUser = async (id: string) => {
    try {
      await deleteUser(id);
      setUsers((prevUsers) => prevUsers.filter((user) => user.userId !== id));
      setError(null);
    } catch (error) {
      console.error("Error deleting user: ", error);
      setError("Error deleting user.");
    }
  };

  const confirmDeleteUser = (id: string) => {
    setUserIdToDelete(id);
    setDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (userIdToDelete) {
      await handleDeleteUser(userIdToDelete);
    }
    setDialogOpen(false);
    setUserIdToDelete(null);
  };

  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => [
      {
        id: "usersTableHeader",
        header: "Users List",
        columns: [
          {
            id: "firstNameColumn",
            accessorKey: "firstName",
            header: "First Name",
            enableHiding: false,
            size: 60,
            muiTableHeadCellProps: { align: "right" },
            muiTableBodyCellProps: {
              align: "right",
              sx: { fontWeight: "bold" },
            },
          },
          {
            id: "surnameColumn",
            accessorKey: "surname",
            header: "Last Name",
            enableHiding: false,
            size: 60,
            muiTableHeadCellProps: { align: "left" },
            muiTableBodyCellProps: {
              align: "left",
              sx: { fontWeight: "bold" },
            },
          },
          {
            id: "roleColumn",
            accessorFn: (user) => {
              if (user.roleAdmin && user.roleSupervisor) {
                return "Admin, Supervisor";
              } else if (user.roleAdmin) {
                return "Admin";
              } else if (user.roleSupervisor) {
                return "Supervisor";
              } else {
                return "User";
              }
            },
            header: "Role",
            enableHiding: false,
            size: 100,
            muiTableHeadCellProps: { align: "center" },
            muiTableBodyCellProps: {
              align: "center",
            },
          },
          {
            id: "departmentColumn",
            accessorFn: (user) => departments[user.deptId] || "Not assigned",
            header: "Department",
            className: styles.departmentColumn,
            muiTableHeadCellProps: { align: "center" },
            muiTableBodyCellProps: {
              align: "center",
            },
          },
          {
            id: "emailColumn",
            accessorKey: "email",
            header: "Email",
            muiTableHeadCellProps: { align: "center" },
            muiTableBodyCellProps: {
              align: "center",
            },
          },
          {
            id: "actionsColumn",
            accessorKey: "actions",
            header: "",
            enableSorting: false,
            muiTableHeadCellProps: { align: "center" },
            muiTableBodyCellProps: {
              align: "center",
            },
            Cell: ({ row }) => (
              <div>
                <Button
                  variant="contained"
                  sx={{
                    marginRight: "10px",
                    backgroundColor: "rgba(213, 69, 69, 0.73)",
                    borderRadius: "5px",
                    color: "white",
                    border: "none",
                    ":hover": {
                      backgroundColor: "rgba(213, 69, 69, 0.549)",
                      transition: "0.2s",
                    },
                    ":active": {
                      backgroundColor: "rgba(213, 69, 69, 0.73)",
                      transform: "scale(0.98) translateY(0.7px)",
                      boxShadow: "3px 2px 22px 1px rgba(0, 0, 0, 0.24)",
                    },
                  }}
                  onClick={() => confirmDeleteUser(row.original.userId)}
                >
                  DELETE
                </Button>
              </div>
            ),
          },
        ],
        Header: () => (
          <div
            style={{
              display: "flex",
              width: "80vw",
            }}
          >
            <div
              style={{
                width: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "20px",
              }}
            >
              <span
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  marginRight: "20px",
                }}
              >
                Users List
              </span>
            </div>
            <div
              style={{
                width: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Button
                onClick={() => onAddUserBtnClick()}
                sx={{
                  backgroundColor: "rgba(3, 11, 252, 0.7)",
                  borderRadius: "5px",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  ":hover": {
                    backgroundColor: "rgba(3, 11, 252, 0.54)",
                    transition: "0.2s",
                  },
                  ":active": {
                    backgroundColor: "rgba(3, 11, 252, 0.74)",
                    transform: "scale(0.98) translateY(0.7px)",
                    boxShadow: "3px 2px 22px 1px rgba(0, 0, 0, 0.24)",
                  },
                }}
              >
                ADD NEW USER
              </Button>
            </div>
          </div>
        ),
      },
    ],
    [departments]
  );

  const table = useMaterialReactTable({
    columns,
    data: users,
    enableHiding: false,
    enableColumnActions: false,
    enableExpanding: true,
    enableDensityToggle: false,
    initialState: {
      density: "compact",
      pagination: {
        pageSize: 10,
        pageIndex: 0,
      },
      sorting: [
        {
          id: "surnameColumn",
          desc: false,
        },
      ],
    },

    renderDetailPanel: ({ row }) => {
      const [creatorName, setCreatorName] = useState("");

      useEffect(() => {
        const fetchCreator = async () => {
          const creator = await getUserById(row.original.createdBy);
          if (creator) {
            setCreatorName(`${creator.firstName} ${creator.surname}`);
          }
        };
        fetchCreator();
      }, [row.original.createdBy]);

      const date = new Date(row.original.createdAt).toLocaleDateString();

      return (
        <div
          style={{
            padding: "16px",
            display: "flex",
            gap: "36px",
            alignContent: "center",
            justifyContent: "space-around",
          }}
        >
          <p>
            User Id:
            <br />
            <span className={styles.detailsSpanText}>
              {row.original.userId}
            </span>
          </p>
          <p>
            Created At:
            <br /> <span className={styles.detailsSpanText}>{date}</span>
          </p>
          <p>
            Created By:
            <br />
            <span className={styles.detailsSpanText}>{creatorName}</span>
          </p>
          <p>
            Current Days:
            <br />
            <span className={styles.detailsSpanText}>
              {row.original.currentDays}
            </span>
          </p>
          <p>
            Days on demand:
            <br />
            <span className={styles.detailsSpanText}>
              {row.original.onDemand}
            </span>
          </p>
          <p>
            Days limit:
            <br />
            <span className={styles.detailsSpanText}>{row.original.days}</span>
          </p>
        </div>
      );
    },
  });

  if (isLoading) {
    return <div className={styles.spinner}></div>;
  }

  return (
    <div className={styles.tableContainer}>
      <MaterialReactTable table={table} />
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        sx={{
          background: "rgba(128, 128, 128, 0.384)",
        }}
      >
        <DialogTitle>
          {`Are you sure you want to delete this user?`}
        </DialogTitle>
        <DialogActions>
          <Button
            onClick={() => setDialogOpen(false)}
            sx={{
              marginRight: "10px",
              backgroundColor: "rgba(213, 69, 69, 0.73)",
              borderRadius: "5px",
              color: "white",
              border: "none",
              ":hover": {
                backgroundColor: "rgba(213, 69, 69, 0.549)",
                transition: "0.2s",
              },
              ":active": {
                backgroundColor: "rgba(213, 69, 69, 0.73)",
                transform: "scale(0.98) translateY(0.7px)",
                boxShadow: "3px 2px 22px 1px rgba(0, 0, 0, 0.24)",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            sx={{
              marginRight: "10px",
              backgroundColor: "rgba(84, 169, 84, 0.884)",
              borderRadius: "5px",
              color: "white",
              border: "none",
              ":hover": {
                backgroundColor: "rgba(84, 169, 84, 0.671)",
                transition: "0.2s",
              },
              ":active": {
                backgroundColor: "rgba(84, 169, 84, 0.884)",
                transform: "scale(0.98) translateY(0.7px)",
                boxShadow: "3px 2px 22px 1px rgba(0, 0, 0, 0.24)",
              },
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AdminUsersTable;