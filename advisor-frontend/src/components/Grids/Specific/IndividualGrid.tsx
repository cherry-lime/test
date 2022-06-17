import * as React from "react";

import { GridActionsCellItem, GridColumns, GridRowId } from "@mui/x-data-grid";
import { Theme } from "@mui/material/styles";
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Tooltip,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/HighlightOff";

import GenericGrid from "../Generic/GenericGrid";
import { handleDelete } from "../handlers";

// Define type for the rows in the grid
type Row = {
  id: number;
  name: string;
  role: string;
};

type IndividualGridProps = {
  theme: Theme;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function IndividualGrid({ theme }: IndividualGridProps) {
  const [rows, setRows] = React.useState<Row[]>([
    { id: 0, name: "Alice", role: "ADMIN" },
  ]);
  const roles = ["USER", "ASSESSOR", "ADMIN"];

  // Fetch initial rows of the grid
  React.useEffect(() => {
    // TODO Replace this by API fetch
  }, []);

  // Called when maturity level changes
  const handleRoleChange = React.useCallback(
    (row: Row, event: SelectChangeEvent<string>) => {
      setRows((prevRows) => {
        const role = event.target.value;

        // Change role of this row
        const newRows = prevRows.map((prevRow) =>
          prevRow.id === row.id ? { ...prevRow, role } : prevRow
        );

        // Update row in database with role
        // TODO

        return newRows;
      });
    },
    []
  );

  // Called when the "Delete" action is pressed in the menu
  const handleDeleteDecorator = React.useCallback(
    (rowId: GridRowId) => () => {
      handleDelete(setRows, rowId);
    },
    []
  );

  const columns = React.useMemo<GridColumns<Row>>(
    () => [
      {
        field: "name",
        headerName: "Name",
        type: "string",
        flex: 1,
      },
      {
        field: "role",
        headerName: "Role",
        type: "string",
        flex: 1,
        renderCell: (params: { row: Row }) => (
          <FormControl sx={{ m: 1, width: 200 }}>
            <Select
              value={params.row.role}
              onChange={(event: SelectChangeEvent<string>) =>
                handleRoleChange(params.row, event)
              }
            >
              {roles.map((role) => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ),
      },
      {
        field: "actions",
        type: "actions",
        width: 100,
        getActions: (params: { id: GridRowId }) => [
          <GridActionsCellItem
            icon={
              <Tooltip title="Remove">
                <RemoveIcon />
              </Tooltip>
            }
            label="Remove"
            onClick={handleDeleteDecorator(params.id)}
          />,
        ],
      },
    ],
    [handleRoleChange, handleDeleteDecorator]
  );

  return <GenericGrid theme={theme} rows={rows} columns={columns} hasToolbar />;
}
