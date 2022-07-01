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
import {
  handleChange,
  handleDelete,
  handleInit,
} from "../../functions/handlers/handlers";
import {
  useDeleteUser,
  useGetUsers,
  usePatchUser,
  UserAPP,
} from "../../../../api/UserAPI/UserAPI";

import ErrorPopup, {
  getOnError,
  RefObject,
} from "../../../ErrorPopup/ErrorPopup";

type IndividualGridProps = {
  theme: Theme;
};

export default function IndividualGrid({ theme }: IndividualGridProps) {
  const [rows, setRows] = React.useState<UserAPP[]>([]);
  const roles = ["USER", "ASSESSOR", "ADMIN"];

  // Ref for error popup
  const refErrorIndividual = React.useRef<RefObject>(null);
  const onErrorIndividual = getOnError(refErrorIndividual);

  // User query
  const { status, data } = useGetUsers(undefined, onErrorIndividual);

  // User mutations
  const patchUser = usePatchUser(onErrorIndividual);
  const deleteUser = useDeleteUser(onErrorIndividual);

  // Called when "status" of user query is changed
  React.useEffect(() => {
    handleInit(setRows, status, data);
  }, [status, data]);

  // Called when maturity level changes
  const handleRoleChange = React.useCallback(
    (row: UserAPP, event: SelectChangeEvent<string>) => {
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

  const columns = React.useMemo<GridColumns<UserAPP>>(
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
        renderCell: (params: { row: UserAPP }) => (
          <FormControl sx={{ m: 1, width: 200 }}>
            <Select
              value={params.row.role}
              onChange={(event: SelectChangeEvent<string>) =>
                handleRoleChange(params.row, event)
              }
            >
              {roles.map((role) => (
                <MenuItem key={role} value={role}>
                  {role === "ASSESSOR" ? "FACILITATOR" : role}
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
        getActions: (params: { id: GridRowId; row: UserAPP }) =>
          params.row.role !== "ADMIN"
            ? [
                <GridActionsCellItem
                  icon={
                    <Tooltip title="Remove">
                      <RemoveIcon />
                    </Tooltip>
                  }
                  label="Remove"
                  onClick={handleDeleteDecorator(params.id)}
                />,
              ]
            : [],
      },
    ],
    [handleRoleChange, handleDeleteDecorator]
  );

  return (
    <>
      <GenericGrid
        theme={theme}
        rows={rows}
        columns={columns}
        hasToolbar
        sortModel={[{ field: "name", sort: "asc" }]}
      />
      <ErrorPopup ref={refErrorIndividual} />
    </>
  );
}
