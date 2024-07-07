import { useEffect, useMemo, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
} from "@mui/material";
import styles from "./spvRequestsTable.module.css";

import useUserData from "../../../contexts/ViewDataContext";
import { getDepartment } from "../../../services/DepartmentService";
import {
  getRequestAll,
  getRequestDeptId,
} from "../../../services/LeaveRequestService";
import { acceptRequest, rejectRequest } from "../../../utils/RequestActions";
import { DateToShowOptions, Request } from "../../../types-obj/types-obj";
import REQUEST_STATUS from "../../../enums/requestStatus";
import TYPE_OF_LEAVE from "../../../enums/typeOfLeave";
import { getAllUsers } from "../../../services/UserService";

const dateOptions: DateToShowOptions = {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
};

export default function SpvRequestsTable({ getDeptContext }) {
  const { userData, refreshUserViewData } = useUserData();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [spvDepartments, setSpvDepartments] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState("");
  const [currentRequest, setCurrentRequest] = useState({});

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const allUsers = await getAllUsers();
      setUsers(allUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDepartments = async () => {
    setIsLoading(true);
    try {
      const response = await getDepartment();
      const userDepartments = response.filter(
        (department) => department.head === userData.userId
      );
      setSpvDepartments(userDepartments);
      if (userDepartments.length === 1) {
        setSelectedDepartment(userDepartments[0].deptId);
      } else if (
        userDepartments.length > 1 &&
        location.pathname === "/supervisor-panel"
      ) {
        setSelectedDepartment("allRequests");
      }
    } catch (error) {
      console.error("Error fetching departments:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDeptRequestsData = async () => {
    setIsLoading(true);
    try {
      if (selectedDepartment && selectedDepartment !== "allRequests") {
        const response = await getRequestDeptId(selectedDepartment);
        setData(response);
        getDeptContext(selectedDepartment);
      } else if (selectedDepartment === "allRequests") {
        const response = await getRequestAll();
        const allRequests = response.filter((request) =>
          spvDepartments.some(
            (department) => department.deptId === request.deptId
          )
        );
        setData(allRequests);
        getDeptContext(null);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    fetchDepartments();
  }, [userData.userId]);

  useEffect(() => {
    fetchDeptRequestsData();
  }, [selectedDepartment, spvDepartments, getDeptContext]);

  const handleButtonClick = (row: Request, action: string) => {
    setCurrentAction(action);
    setCurrentRequest(row);
    setDialogOpen(true);
  };

  const handleActionConfirm = async () => {
    if (currentAction === "accept") {
      await acceptRequest(currentRequest);
      await refreshUserViewData();
    } else if (currentAction === "reject") {
      const lengthValidation: number = 100;
      const rejectReasonValue: string = (
        document.getElementById("rejectReason") as HTMLInputElement
      ).value.trim();
      if (rejectReasonValue.length > lengthValidation) {
        toast.error(
          `Comment length is ${rejectReasonValue.length}. Max is ${lengthValidation}`
        );
        return;
      }
      if (rejectReasonValue === "") {
        toast.error("Reject Reason is required!");
        return;
      } else {
        await rejectRequest(currentRequest, rejectReasonValue);
        await refreshUserViewData();
      }
    }
    setDialogOpen(false);
    fetchDeptRequestsData();
  };

  const columns = useMemo<MRT_ColumnDef<Request>[]>(
    () => [
      {
        id: "requestListHeader",
        header: "Request List",
        columns: [
          {
            id: "userNameColumn",
            accessorKey: "userId",
            header: "Employee's name",
            enableHiding: false,
            size: 150,
            muiTableHeadCellProps: { align: "center" },
            muiTableBodyCellProps: {
              align: "center",
              sx: { fontWeight: "bold" },
            },
            Cell: ({ row }) => {
              const userId = row.original.userId;
              const user = users.find((user) => user.userId === userId);
              const name = user
                ? `${user.firstName} ${user.surname}`
                : "Unknown";
              return (
                <div style={{ fontWeight: "bold", fontSize: "1.2em" }}>
                  {name}
                </div>
              );
            },
          },
          {
            id: "requestTypeColumn",
            accessorKey: "requestType",
            header: "Request type",
            enableSorting: false,
            enableColumnFilter: true,
            filterVariant: "select",
            filterSelectOptions: [
              TYPE_OF_LEAVE.AnnualLeave,
              TYPE_OF_LEAVE.AdditionalLeave,
              TYPE_OF_LEAVE.SpecialLeave,
              TYPE_OF_LEAVE.SickLeave,
              TYPE_OF_LEAVE.ChildLeave,
              TYPE_OF_LEAVE.UnpaidLeave,
              TYPE_OF_LEAVE.OnDemandLeave,
            ],
            size: 100,
            muiTableHeadCellProps: { align: "center" },
            muiTableBodyCellProps: {
              align: "center",
              sx: { fontWeight: "bold" },
            },
          },
          {
            id: "deptColumn",
            accessorFn: (row) => {
              const dept = spvDepartments.find(
                (dept) => dept.deptId === row.deptId
              );
              return dept ? dept.dept : "Not assigned";
            },
            header: "Department",
            enableSorting: false,
            enableColumnFilter: false,
            muiTableHeadCellProps: { align: "center" },
            muiTableBodyCellProps: { align: "center" },
            size: 60,
          },
          {
            id: "daysReq",
            accessorKey: "daysReq",
            header: "Days requested",
            enableSorting: true,
            enableColumnFilter: false,
            muiTableHeadCellProps: { align: "center" },
            muiTableBodyCellProps: { align: "center" },
            size: 60,
          },
          {
            id: "dayFromColumn",
            accessorKey: "dayFrom",
            Cell: ({ cell }) => {
              const date = new Date(cell.getValue<string>()).toLocaleDateString(
                "Pl-pl",
                dateOptions
              );
              return date;
            },
            header: "From",
            enableSorting: true,
            enableColumnFilter: false,
            muiTableHeadCellProps: { align: "right" },
            muiTableBodyCellProps: { align: "right" },
            size: 60,
          },
          {
            id: "dayToColumn",
            accessorKey: "dayTo",
            Cell: ({ cell }) => {
              const date = new Date(cell.getValue<string>()).toLocaleDateString(
                "Pl-pl",
                dateOptions
              );
              return date;
            },
            header: "To",
            enableSorting: true,
            enableColumnFilter: false,
            muiTableHeadCellProps: { align: "left" },
            muiTableBodyCellProps: { align: "left" },
            size: 60,
          },
          {
            id: "statusColumn",
            accessorKey: "status",
            header: "Status",
            enableSorting: false,
            enableColumnFilter: true,
            filterVariant: "select",
            filterSelectOptions: [
              REQUEST_STATUS.Approved,
              REQUEST_STATUS.Cancelled,
              REQUEST_STATUS.Pending,
              REQUEST_STATUS.Rejected,
            ],
            size: 60,
            muiTableHeadCellProps: { align: "center" },
            muiTableBodyCellProps: (props) => {
              const status = props.cell.getValue();
              let color;
              if (status === "Pending") {
                color = "rgba(3, 11, 252, 0.70)";
              } else if (status === "Rejected") {
                color = "rgba(213, 69, 69, 0.73)";
              } else if (status === "Approved") {
                color = "rgba(84, 169, 84, 0.884)";
              } else if (status === "Cancelled") {
                color = "gray";
              }
              return { style: { color }, align: "center" };
            },
          },
          {
            id: "createdAtColumn",
            accessorKey: "createdAt",
            header: "Created At",
            enableColumnFilter: false,
            Cell: ({ cell }) => {
              const date = new Date(cell.getValue<number>()).toLocaleDateString(
                "Pl-pl",
                dateOptions
              );
              return date;
            },
            muiTableHeadCellProps: { align: "center" },
            muiTableBodyCellProps: { align: "center" },
            size: 60,
          },
          {
            id: "actionsColumn",
            accessorKey: "actions",
            header: "",
            size: 150,
            enableSorting: false,
            enableColumnFilter: false,
            muiTableHeadCellProps: { align: "center" },
            muiTableBodyCellProps: { align: "center" },
            Cell: ({ row }) => (
              <div>
                {row.original.status === "Pending" && (
                  <>
                    <Button
                      variant="contained"
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
                      onClick={() => handleButtonClick(row.original, "accept")}
                    >
                      Accept
                    </Button>
                    <Button
                      variant="contained"
                      sx={{
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
                      onClick={() => handleButtonClick(row.original, "reject")}
                    >
                      Reject
                    </Button>
                  </>
                )}
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
                Requests List
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
              {spvDepartments.length > 1 && (
                <Select
                  defaultValue="allRequests"
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  style={{
                    marginRight: "10px",
                    width: "220px",
                    height: "40px",
                  }}
                >
                  <MenuItem value="allRequests">All Requests</MenuItem>
                  {spvDepartments.map((department) => (
                    <MenuItem value={department.deptId} key={department.deptId}>
                      {department.dept}
                    </MenuItem>
                  ))}
                </Select>
              )}
            </div>
          </div>
        ),
      },
    ],
    [userData.firstName, userData.surname, spvDepartments, selectedDepartment]
  );

  const table = useMaterialReactTable({
    columns,

    data,
    enableHiding: false,
    enableColumnActions: false,
    columnFilterDisplayMode: "popover",
    enableExpanding: true,
    enableDensityToggle: false,
    muiPaginationProps: {
      rowsPerPageOptions: [8, 16, 32, 48, 64, 128],
    },
    initialState: {
      density: "compact",
      pagination: {
        pageSize: 8,
        pageIndex: 0,
      },
      sorting: [
        {
          id: "dayFromColumn",
          desc: false,
        },
      ],
    },
    renderDetailPanel: ({ row }) => {
      return (
        <div
          style={{
            display: "flex",
            alignContent: "center",
            justifyContent: "space-around",
          }}
        >
          <div
            style={{
              width: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div>
              <p style={{ textAlign: "center" }}>
                Comment:
                <br />
                <span className={styles.detailsSpanText}>
                  {row.original.comment || "No comment"}
                </span>
              </p>
            </div>
          </div>
          <div style={{ width: "50%" }}>
            {row.original.rejectReason && (
              <p style={{ textAlign: "center" }}>
                Reject Reason:
                <br />
                <span className={styles.detailsRejectSpan}>
                  {row.original.rejectReason}
                </span>
              </p>
            )}
          </div>
        </div>
      );
    },
  });

  if (isLoading) {
    return <div className={styles.spinner}></div>;
  }

  return (
    <div className={styles.tableWrapper}>
      <MaterialReactTable table={table} />
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        sx={{
          background: "rgba(128, 128, 128, 0.384)",
        }}
      >
        <DialogTitle>
          {`Are you sure you want to ${currentAction} this request?`}
        </DialogTitle>
        <DialogContent>
          <Toaster position="top-center" reverseOrder={false} />
          {currentAction === "reject" && (
            <textarea
              id="rejectReason"
              className={styles.textName}
              placeholder="Max comment length 100 characters"
            ></textarea>
          )}
        </DialogContent>
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
            onClick={handleActionConfirm}
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
