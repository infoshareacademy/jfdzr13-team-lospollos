import { useMemo, useState } from "react";
import styles from "./listComponent.module.css";
import Button from "@mui/material/Button";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { data as initialData } from "./mokDB";
import { Select, MenuItem } from "@mui/material";
import types from "../../../types-obj/types-obj";

interface Request {
  name: string;
  dateFrom: string;
  dateTo: string;
  status: string;
  createdAt: string;
  department: string;
}

export default function ListComponent() {
  const [data, setData] = useState(initialData);
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [userStatus, setUserStatus] = useState<string>("roleSupervisor");

  const handleButtonClick = (row: Request, action: string) => {
    const updatedData = data.map((item) => {
      if (item.name === row.name) {
        return {
          ...item,
          status:
            action === "accept"
              ? "Accepted"
              : action === "reject"
              ? "Rejected"
              : "Cancelled",
        };
      }
      return item;
    });
    setData(updatedData);
  };

  const columns = useMemo<MRT_ColumnDef<Request>[]>(
    () => [
      {
        id: "requestListHeader",
        header: "Request List",
        columns: [
          {
            accessorKey: "name",
            header: "Name",
            enableHiding: false,
            muiTableHeadCellProps: { align: "center" },
            muiTableBodyCellProps: {
              align: "center",
              sx: { fontWeight: "bold" },
            },
          },
          {
            accessorKey: "dateFrom",
            header: "From",
            enableSorting: false,
            muiTableHeadCellProps: { align: "right" },
            muiTableBodyCellProps: { align: "right" },
          },
          {
            accessorKey: "dateTo",
            header: "To",
            enableSorting: false,
            muiTableHeadCellProps: { align: "left" },
            muiTableBodyCellProps: { align: "left" },
          },
          {
            accessorKey: "status",
            header: "Status",
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
              return { style: { color } };
            },
          },
          {
            accessorKey: "createdAt",
            header: "Created At",
          },
          {
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
              {userStatus === "roleSupervisor" && (
                <Select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  displayEmpty
                  style={{
                    marginRight: "10px",
                    width: "220px",
                    height: "40px",
                  }}
                >
                  <MenuItem value="" disabled>
                    Choose department
                  </MenuItem>
                  <MenuItem value="Department 1">Department 1</MenuItem>
                  <MenuItem value="Department 2">Department 2</MenuItem>
                  <MenuItem value="Department 3">Department 3</MenuItem>
                  <MenuItem value="Department 4">Department 4</MenuItem>
                </Select>
              )}
            </div>
          </div>
        ),
      },
    ],
    [data, userStatus]
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enableHiding: false,
    enableColumnActions: false,
    enableExpanding: true,
    enableDensityToggle: false,
    initialState: { density: "compact" },
    renderDetailPanel: ({ row }) => (
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
          <br /> {row.original.name}
        </p>
        <p>
          From:
          <br /> {row.original.dateFrom}
        </p>
        <p>
          To:
          <br /> {row.original.dateTo}
        </p>
        <p>
          Request Type:
          <br /> XXXXXXXXXXXXXXXX
        </p>
        <p>
          Days Request:
          <br /> XX
        </p>
        <p>
          Supervisor:
          <br /> XXXXXXXXXXXXXXXXXX
        </p>
        <p>
          Status:
          <br /> {row.original.status}
        </p>
        <p>
          Created At:
          <br /> {row.original.createdAt}
        </p>
        <p>
          Comment:
          <br />
          XXXXX XXXXX XXXXX XXXXX XXXXX
        </p>
      </div>
    ),
  });
  return (
    <div className={styles.listWrapper}>
      <MaterialReactTable table={table} />
    </div>
  );
}
