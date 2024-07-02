import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import useUserData from "../../../contexts/ViewDataContext";
import { getDepartment } from "../../../services/DepartmentService";
import {
  getRequestAll,
  getRequestDeptId,
  getRequestUserId,
} from "../../../services/LeaveRequestService";
import { Request } from "../../../types-obj/types-obj";
import {
  acceptRequest,
  cancelRequest,
  rejectRequest,
} from "../../../utils/RequestActions";
import styles from "./listComponent.module.css";

interface ListComponentProps {
  onAddButtonClick: () => void;
}

export default function ListComponent({
  onAddButtonClick,
}: ListComponentProps) {
  const { userData } = useUserData();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [userStatus, setUserStatus] = useState<string>("");
  const [spvDepartments, setSpvDepartments] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState("");
  const [currentRequest, setCurrentRequest] = useState({});

  const [columnVisibility, setColumnVisibility] = useState({
    userNameColumn: true,
    requestTypeColumn: true,
    deptColumn: true,
    dayFromColumn: true,
    dayToColumn: true,
    statusColumn: true,
    createdAtColumn: true,
    actionsColumn: true,
  });

  const handleButtonClick = (row: Request, action: string) => {
    setCurrentAction(action);
    setCurrentRequest(row);
    setDialogOpen(true);
  };

  const handleActionConfirm = () => {
    if (currentAction === "accept") {
      acceptRequest(currentRequest);
    } else if (currentAction === "reject") {
      let rejectReasonValue: string = (
        document.getElementById("rejectReason") as HTMLInputElement
      ).value;
      rejectRequest(currentRequest, rejectReasonValue);
    } else if (currentAction === "cancel") {
      cancelRequest(currentRequest);
    }
    setDialogOpen(false);
  };

  useEffect(() => {
    if (selectedDepartment && selectedDepartment !== "allRequests") {
      getRequestDeptId(selectedDepartment).then((response) => {
        console.log(response);
        setData(response);
        setIsLoading(false);
      });
    } else if (selectedDepartment === "allRequests") {
      getRequestAll().then((response) => {
        console.log(response, "all");
        const allRequests = response.filter((request) =>
          spvDepartments.some(
            (department) => department.deptId === request.deptId
          )
        );
        setData(allRequests);
        setIsLoading(false);
      });
    }
  }, [selectedDepartment, spvDepartments]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await getDepartment();
        const userDepartments = response.filter(
          (department) => department.head === userData.userId
        );
        setSpvDepartments(userDepartments);
        if (userDepartments.length == 1) {
          setSelectedDepartment(userDepartments[0].deptId);
        } else if (
          userDepartments.length > 1 &&
          location.pathname === "/supervisor-panel"
        ) {
          setSelectedDepartment("allRequests");
        }
      } catch (error) {
        console.error("Error", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDepartments();
  }, [userData.userId, location.pathname]);

  useEffect(() => {
    if (userData.roleSupervisor && location.pathname === "/supervisor-panel") {
      setUserStatus("roleSupervisor");
      setColumnVisibility({
        userNameColumn: true,
        requestTypeColumn: true,
        deptColumn: true,
        dayFromColumn: true,
        dayToColumn: true,
        statusColumn: true,
        createdAtColumn: true,
        actionsColumn: true,
      });
    } else if (userData.roleUser && location.pathname === "/user-panel") {
      setUserStatus("roleUser");
      setColumnVisibility({
        userNameColumn: false,
        requestTypeColumn: true,
        deptColumn: true,
        dayFromColumn: true,
        dayToColumn: true,
        statusColumn: true,
        createdAtColumn: true,
        actionsColumn: true,
      });
      getRequestUserId(userData.userId).then((response) => {
        setData(response);
        setIsLoading(false);
      });
    }
  }, [userData, location.pathname]);

  const columns = useMemo<MRT_ColumnDef<Request>[]>(
    () => [
      {
        id: "requestListHeader",
        header: "Request List",
        columns: [
          {
            id: "userNameColumn",
            accessorFn: (row) => `${row.firstName} ${row.surname}`,
            header: "Employee's name",
            enableHiding: false,
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
            id: "dayFromColumn",
            accessorKey: "dayFrom",
            header: "From",
            enableSorting: false,
            muiTableHeadCellProps: { align: "right" },
            muiTableBodyCellProps: { align: "right" },
            size: 60,
          },
          {
            id: "dayToColumn",
            accessorKey: "dayTo",
            header: "To",
            enableSorting: false,
            muiTableHeadCellProps: { align: "left" },
            muiTableBodyCellProps: { align: "left" },
            size: 60,
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
              } else if (status === "Accepted") {
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
            header: "Actions",
            enableSorting: false,
            Cell: ({ row }) => (
              <div>
                {row.original.status === "Pending" &&
                  userStatus === "roleSupervisor" && (
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
                        onClick={() =>
                          handleButtonClick(row.original, "accept")
                        }
                      >
                        Accept
                      </Button>
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
                        onClick={() =>
                          handleButtonClick(row.original, "reject")
                        }
                      >
                        Reject
                      </Button>
                    </>
                  )}
                {row.original.status === "Pending" &&
                  userStatus === "roleUser" && (
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{
                        marginRight: "10px",
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
              {userStatus === "roleSupervisor" && spvDepartments.length > 1 && (
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
              {userStatus === "roleUser" && (
                <div className={styles.addButtonContainer}>
                  <Button
                    onClick={onAddButtonClick}
                    sx={{
                      backgroundColor: "rgba(3, 11, 252, 0.7)",
                      borderRadius: "5px",
                      color: "white",
                      border: "none",
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
                    ADD REQUEST
                  </Button>
                </div>
              )}
            </div>
          </div>
        ),
      },
    ],
    [data, userStatus, spvDepartments, selectedDepartment]
  );

  const table = useMaterialReactTable({
    columns,
    data,
    state: {
      columnVisibility,
    },
    enableHiding: false,
    enableColumnActions: false,
    enableExpanding: true,
    enableDensityToggle: false,
    muiPaginationProps: {
      rowsPerPageOptions: [10, 20, 30, 40, 50],
    },
    initialState: {
      density: "compact",
      pagination: {
        pageSize: 10,
        pageIndex: 0,
      },
    },
    renderDetailPanel: ({ row }) => {
      const dept = spvDepartments.find(
        (dept) => dept.deptId === row.original.deptId
      );
      return (
        <div
          style={{
            padding: "16px",
            display: "flex",
            gap: "36px",
            alignContent: "center",
          }}
        >
          <strong>Details:</strong>
          <p>
            Name:
            <br /> {row.original.firstName} {row.original.surname}
          </p>
          <p>
            From:
            <br /> {row.original.dayFrom}
          </p>
          <p>
            To:
            <br /> {row.original.dayTo}
          </p>
          <p>
            Request Type:
            <br /> {row.original.requestType}
          </p>
          <p>
            Days Request:
            <br /> {row.original.daysReq}
          </p>
          <p>
            Supervisor:
            <br /> {dept ? dept.head : "Unknown"}
          </p>
          <p>
            Status:
            <br /> {row.original.status}
          </p>
          <p>
            Created At:
            <br /> {new Date(row.original.createdAt).toLocaleDateString()}
          </p>
          <p>
            Comment:
            <br />
            {row.original.comment}
          </p>
        </div>
      );
    },
  });

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <div className={styles.listWrapper}>
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
