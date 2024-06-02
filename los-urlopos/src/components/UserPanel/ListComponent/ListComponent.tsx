import React, { useMemo, useState } from "react";
import styles from "./listComponent.module.css";
import Button from "@mui/material/Button";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { data as initialData } from "./mokDB";

export default function ListComponent() {
  const [data, setData] = useState(initialData);

  const handleButtonClick = (row: Request, action: string) => {
    const updatedData = data.map((item) => {
      if (item.name === row.name) {
        return {
          ...item,
          status: action === "accept" ? "Accepted" : "Rejected",
        };
      }
      return item;
    });
    setData(updatedData);
  };

  const columns = useMemo<MRT_ColumnDef<Request>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        muiTableHeadCellProps: { align: "center" },
        muiTableBodyCellProps: { align: "center", sx: { fontWeight: "bold" } },
        enableHiding: false,
      },
      {
        accessorKey: "dateFrom",
        header: "From",
        enableSorting: false,
        muiTableHeadCellProps: { align: "right" },
        muiTableBodyCellProps: {
          align: "right",
        },
      },
      {
        accessorKey: "dateTo",
        header: "To",
        enableSorting: false,
        muiTableHeadCellProps: { align: "left" },
        muiTableBodyCellProps: {
          align: "left",
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        muiTableBodyCellProps(props) {
          if (props.cell.getValue() === "Pending") {
            return { style: { color: "Blue" } };
          } else if (props.cell.getValue() === "Rejected") {
            return { style: { color: "Red" } };
          } else if (props.cell.getValue() === "Accepted") {
            return { style: { color: "Green" } };
          }
        },
      },
      {
        accessorKey: "createdAt",
        header: "createdAt",
      },
      {
        accessorKey: "action",
        header: "Action",
        enableSorting: false,
        Cell: ({ row }) =>
          row.original.status === "Pending" ? (
            <div>
              <Button
                variant="contained"
                color="primary"
                sx={{ marginRight: "10px", backgroundColor: "Green" }}
                onClick={() => handleButtonClick(row.original, "accept")}
              >
                Accept
              </Button>
              <Button
                variant="contained"
                color="primary"
                sx={{ backgroundColor: "Red" }}
                onClick={() => handleButtonClick(row.original, "reject")}
              >
                Reject
              </Button>
            </div>
          ) : null,
      },
    ],
    [data]
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enableHiding: false,
    enableColumnActions: false,
    enableRowExpansion: true,
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
