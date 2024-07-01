import { useEffect, useMemo, useState } from "react";
import styles from "./spvRequestsTable.module.css";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import {
  Select,
  MenuItem,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import { Request } from "../../../types-obj/types-obj";
import useUserData from "../../../contexts/ViewDataContext";
import { getDepartment } from "../../../services/DepartmentService";
import { acceptRequest, rejectRequest } from "../../../utils/RequestActions";
import {
  getRequestDeptId,
  getRequestAll,
} from "../../../services/LeaveRequestService";

export default function SpvRequestsTable() {
  const { userData } = useUserData();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [spvDepartments, setSpvDepartments] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState("");
  const [currentRequest, setCurrentRequest] = useState({});
  const [rejectReasonError, setRejectReasonError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (selectedDepartment && selectedDepartment !== "allRequests") {
          const response = await getRequestDeptId(selectedDepartment);
          setData(response);
        } else if (selectedDepartment === "allRequests") {
          const response = await getRequestAll();
          const allRequests = response.filter((request) =>
            spvDepartments.some(
              (department) => department.deptId === request.deptId
            )
          );
          setData(allRequests);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedDepartment, spvDepartments]);

  useEffect(() => {
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

    fetchDepartments();
  }, [userData.userId]);

  const handleButtonClick = (row: Request, action: string) => {
    setCurrentAction(action);
    setCurrentRequest(row);
    setDialogOpen(true);
  };

  const handleActionConfirm = async () => {
    if (currentAction === "accept") {
      await acceptRequest(currentRequest);
    } else if (currentAction === "reject") {
      const rejectReasonValue: string = (
        document.getElementById("rejectReason") as HTMLInputElement
      ).value.trim();

      if (rejectReasonValue === "") {
        setRejectReasonError("Reject Reason is required!");
        return;
      } else {
        setRejectReasonError("");
        await rejectRequest(currentRequest, rejectReasonValue);
      }
    }
    setDialogOpen(false);
    fetchData();
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      if (selectedDepartment && selectedDepartment !== "allRequests") {
        const response = await getRequestDeptId(selectedDepartment);
        setData(response);
      } else if (selectedDepartment === "allRequests") {
        const response = await getRequestAll();
        const allRequests = response.filter((request) =>
          spvDepartments.some(
            (department) => department.deptId === request.deptId
          )
        );
        setData(allRequests);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const columns = useMemo<MRT_ColumnDef<Request>[]>(
    () => [
      {
        id: "requestListHeader",
        header: "Request List",
        columns: [
          {
            id: "userNameColumn",
            accessorFn: (userData) =>
              `${userData.firstName} ${userData.surname}`,
            header: "Employee's name",
            enableHiding: false,
            size: 150,
            muiTableHeadCellProps: { align: "center" },
            muiTableBodyCellProps: {
              align: "center",
              sx: { fontWeight: "bold" },
            },
          },
          {
            id: "requestTypeColumn",
            accessorKey: "requestType",
            header: "Request type",
            enableSorting: true,
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
            enableSorting: true,
            muiTableHeadCellProps: { align: "center" },
            muiTableBodyCellProps: { align: "center" },
            size: 60,
          },
          {
            id: "daysReq",
            accessorKey: "daysReq",
            header: "Days requested",
            enableSorting: true,
            muiTableHeadCellProps: { align: "center" },
            muiTableBodyCellProps: { align: "center" },
            size: 60,
          },
          {
            id: "dayFromColumn",
            accessorKey: "dayFrom",
            header: "From",
            enableSorting: true,
            muiTableHeadCellProps: { align: "right" },
            muiTableBodyCellProps: { align: "right" },
            size: 60,
            Cell: ({ cell }) => {
              const dateValue = cell.getValue<string>();
              const date = new Date(dateValue);
              return date.toLocaleDateString();
            },
          },
          {
            id: "dayToColumn",
            accessorKey: "dayTo",
            header: "To",
            enableSorting: false,
            muiTableHeadCellProps: { align: "left" },
            muiTableBodyCellProps: { align: "left" },
            size: 60,
            Cell: ({ cell }) => {
              const dateValue = cell.getValue<string>();
              const date = new Date(dateValue);
              return date.toLocaleDateString();
            },
          },
          {
            id: "statusColumn",
            accessorKey: "status",
            header: "Status",
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
            Cell: ({ cell }) => {
              const date = new Date(cell.getValue<number>());
              return date.toLocaleDateString();
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
                Request List
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
          }}
        >
          <div
            style={{
              display: "flex",
              width: "50%",
              justifyContent: "center",
            }}
          >
            <span>Comment: {row.original.comment || "No comment"}</span>
          </div>
          <div
            style={{
              display: "flex",
              width: "50%",
              justifyContent: "center",
            }}
          >
            {row.original.rejectReason && (
              <span style={{ color: "red" }}>
                Reject Reason: {row.original.rejectReason}
              </span>
            )}
          </div>
        </div>
      );
    },
  });

  if (isLoading) {
    return <CircularProgress />;
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
          {currentAction === "reject" && (
            <>
              <TextField
                required
                error={!!rejectReasonError}
                helperText={rejectReasonError}
                margin="dense"
                id="rejectReason"
                name="rejectReason"
                label="Reject Reason"
                type="text"
                variant="standard"
                fullWidth
              />
            </>
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
