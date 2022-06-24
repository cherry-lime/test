import * as React from "react";
import { UseMutationResult } from "react-query";

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

import GenericGrid from "../../Generic/GenericGrid";
import { handleChange, handleDelete, handleInit } from "../handlers";
import {
  useDeleteUser,
  useGetUsers,
  usePatchUser,
} from "../../../../api/UserAPI";

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
  const [rows, setRows] = React.useState<Row[]>([]);
  const roles = ["USER", "ASSESSOR", "ADMIN"];

  // User query
  const { status, data, error } = useGetUsers();

  // User mutations
  const patchUser = usePatchUser();
  const deleteUser = useDeleteUser();

  // Called when "status" of user query is changed
  React.useEffect(() => {
    handleInit(setRows, status, data, error);
  }, [status]);

  // Called when maturity level changes
  const handleRoleChange = React.useCallback(
    (row: Row, event: SelectChangeEvent<string>) => {
      handleChange(
        setRows,
        patchUser as UseMutationResult,
        { ...row, role: event.target.value },
        row
      );
    },
    []
  );

  // Called when the "Delete" action is pressed in the menu
  const handleDeleteDecorator = React.useCallback(
    (rowId: GridRowId) => () => {
      handleDelete(setRows, deleteUser as UseMutationResult, rowId as number);
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

  return (
    <GenericGrid
      theme={theme}
      rows={rows}
      columns={columns}
      hasToolbar
      sortModel={[{ field: "name", sort: "asc" }]}
    />
  );
}
