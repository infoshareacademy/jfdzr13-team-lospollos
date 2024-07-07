import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { useEffect, useMemo, useState } from "react";
import { getDepartment } from "../../../services/DepartmentService";
import { deleteAllRequestsByUserId } from "../../../services/LeaveRequestService";
import { subscribeToUsers, updateUser } from "../../../services/UserService";
import { User } from "../../../types-obj/types-obj";
import EditUser from "../AddUser/EditUser";
import styles from "./adminUsersTable.module.css";

type AdminUsersTableProps = {
  onAddUserBtnClick: () => void;
};

export function AdminUsersTable({ onAddUserBtnClick }: AdminUsersTableProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [departments, setDepartments] = useState<{ [key: string]: string }>({});
  const [userIdToDelete, setUserIdToDelete] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editUserId, setEditUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const departments = await getDepartment();
        const departmentsMap = departments.reduce((acc, department) => {
          acc[department.deptId] = department.dept;
          return acc;
        }, {});
        setDepartments(departmentsMap);

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
        console.error("Error fetching data:", error);
        setIsLoading(false);
        setError("Error fetching data.");
      }
    };

    fetchData();
  }, []);

  const handleDeleteUser = async (id: string) => {
    try {
      updateUser(id, { isActive: false });
      deleteAllRequestsByUserId(id);
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

  const handleEditClick = (id: string) => {
    setEditUserId(id);
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
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "rgba(0, 103, 240, 0.73)",
                    borderRadius: "5px",
                    color: "white",
                    border: "none",
                    ":hover": {
                      backgroundColor: "rgba(0, 103, 240, 0.549)",
                      transition: "0.2s",
                    },
                    ":active": {
                      backgroundColor: "rgba(0, 103, 240, 0.73)",
                      transform: "scale(0.98) translateY(0.7px)",
                      boxShadow: "3px 2px 22px 1px rgba(0, 0, 0, 0.24)",
                    },
                  }}
                  onClick={() => handleEditClick(row.original.userId)}
                >
                  EDIT
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
                  border: "none",
                  color: "white",
                  marginRight: "20px",
                  padding: "10px 20px",
                  ":hover": {
                    backgroundColor: "rgba(3, 11, 252, 0.54)",
                    transition: "0.2s",
                  },
                  ":active": {
                    backgroundColor: "rgba(3, 11, 252, 0.74)",
                    boxShadow: "3px 2px 22px 1px rgba(0, 0, 0, 0.24)",
                    transform: "scale(0.98) translateY(0.7px)",
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
            <span className={styles.detailsSpanText}>
              {row.original.createdBy}
            </span>
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

  const handleCloseEditUser = () => {
    setEditUserId(null);
  };

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
      {editUserId && (
        <EditUser
          user={users.find((user) => user.userId === editUserId)}
          onUserUpdated={() => {}}
          onClose={handleCloseEditUser}
        />
      )}
    </div>
  );
}

export default AdminUsersTable;
