import * as React from "react";

import {
  GridActionsCellItem,
  GridColumns,
  GridRowId,
  GridRowModel,
} from "@mui/x-data-grid";
import { Theme } from "@mui/material/styles";
import { Tooltip } from "@mui/material";
import RemoveIcon from "@mui/icons-material/HighlightOff";

import GenericGrid from "../Generic/GenericGrid";

import { UserRole } from "../../../types/UserRole";
import {
  handleAddDecorator,
  handleDeleteDecorator,
  processRowUpdateDecorator,
} from "../decorators";

// Define type for the rows in the grid
type Row = {
  id: number;
  name: string;
};

// Get row object with default values
const getDefaultRow = () => {
  const defaultRow = {
    id: Date.now(),
    name: "",
  };
  return defaultRow;
};

type MemberGridProps = {
  theme: Theme;
  userId: number;
  userRole: UserRole;
  teamId: number;
  forAssessors: boolean; // Is the grid for assessors (true) or users (false)
};

export default function MemberGrid({
  theme,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  userId,
  userRole,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  teamId,
  forAssessors,
}: MemberGridProps) {
  const [rows, setRows] = React.useState<Row[]>([
    { id: 0, name: "Alice" },
    { id: 1, name: "Bob" },
  ]);

  // Fetch initial rows of the grid
  React.useEffect(() => {
    // TODO Replace this by API fetch
  }, []);

  // Called when a row is edited
  const processRowUpdate = React.useCallback(
    (newRow: GridRowModel, oldRow: GridRowModel) => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      const handleRowAPI = () => {};

      return processRowUpdateDecorator(handleRowAPI, setRows, newRow, oldRow);
    },
    []
  );

  // Called when the "Delete" action is pressed in the menu
  const handleDelete = React.useCallback(
    (rowId: GridRowId) => () => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      const handleAPI = () => {};

      handleDeleteDecorator(handleAPI, setRows, rowId);
    },
    []
  );

  // Called when the "Add" button is pressed below the grid
  const handleAdd = React.useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const handleAPI = () => {};

    handleAddDecorator(handleAPI, setRows, getDefaultRow());
  }, [rows]);

  const columns = React.useMemo<GridColumns<Row>>(
    () => [
      {
        field: "name",
        headerName: forAssessors ? "Assessor Name" : "Member Name",
        type: "string",
        flex: 1,
        editable: userRole === "ASSESSOR",
      },
      ...(userRole === "ASSESSOR"
        ? [
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
                  onClick={handleDelete(params.id)}
                />,
              ],
            },
          ]
        : []),
    ],
    [handleDelete]
  );

  return (
    <GenericGrid
      theme={theme}
      rows={rows}
      columns={columns}
      processRowUpdate={processRowUpdate}
      hasToolbar
      add={
        userRole === "ASSESSOR"
          ? {
              text: forAssessors ? "ADD ASSESSOR" : "ADD MEMBER",
              handler: handleAdd,
            }
          : undefined
      }
    />
  );
}
