import { useEffect, useMemo, useState } from "react";
import styles from "./userRequestsTable.module.css";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import {
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
import { getRequestUserId } from "../../../services/LeaveRequestService";
import { getDepartmentById } from "../../../services/DepartmentService";
import { cancelRequest } from "../../../utils/RequestActions";
import { red } from "@mui/material/colors";
export default function UserRequestsTable() {
  const { userData } = useUserData();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [department, setDepartment] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState("");
  const [currentRequest, setCurrentRequest] = useState({});

  const fetchRequests = async () => {
    setIsLoading(true);
    const departmentData = await getDepartmentById(userData.deptId);
    if (departmentData) {
      setDepartment(departmentData);
    }
    const requestData = await getRequestUserId(userData.userId);
    setData(requestData);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchRequests();
  }, [userData]);

  const handleButtonClick = (row: Request, action: string) => {
    setCurrentAction(action);
    setCurrentRequest(row);
    setDialogOpen(true);
  };

  const handleActionConfirm = async () => {
    if (currentAction === "cancel") {
      await cancelRequest(currentRequest);
    }
    setDialogOpen(false);
    fetchRequests();
  };

  const columns = useMemo<MRT_ColumnDef<Request>[]>(
    () => [
      {
        id: "requestListHeader",
        header: "Request List",
        columns: [
          {
            id: "requestTypeColumn",
            accessorKey: "requestType",
            header: "Request type",
            size: 100,
            enableSorting: true,
            muiTableHeadCellProps: { align: "center" },
            muiTableBodyCellProps: {
              align: "center",
              sx: { fontWeight: "bold" },
            },
          },
          {
            id: "deptColumn",
            accessorFn: (row) => {
              if (row.deptId === userData.deptId) {
                return department.dept;
              }
              return "";
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
            enableSorting: true,
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
              return <span>{date.toLocaleDateString()}</span>;
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
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      backgroundColor: "rgba(255,165,0, 0.7)",
                      borderRadius: "5px",
                      color: "white",
                      border: "none",
                      ":hover": {
                        backgroundColor: "rgba(255,165,0, 0.54)",
                        transition: "0.2s",
                      },
                      ":active": {
                        backgroundColor: "rgba(255,165,0, 0.74)",
                        transform: "scale(0.98) translateY(0.7px)",
                        boxShadow: "3px 2px 22px 1px rgba(0, 0, 0, 0.24)",
                      },
                    }}
                    onClick={() => handleButtonClick(row.original, "cancel")}
                  >
                    Cancel Request
                  </Button>
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
                Your Requests List
              </span>
            </div>
            <div
              style={{
                width: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            ></div>
          </div>
        ),
      },
    ],
    [data]
  );
  const table = useMaterialReactTable({
    columns,
    data,
    enableHiding: false,
    enableColumnActions: false,
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
            <TextField
              required
              margin="dense"
              id="rejectReason"
              name="rejectReason"
              label="Reject Reason"
              type="text"
              variant="standard"
              fullWidth
            />
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
