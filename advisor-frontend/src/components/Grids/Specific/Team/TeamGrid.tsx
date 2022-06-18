import * as React from "react";

import {
  GridActionsCellItem,
  GridColumns,
  GridRowId,
  GridRowModel,
} from "@mui/x-data-grid";
import { Theme } from "@mui/material/styles";
import { Tooltip } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import RemoveIcon from "@mui/icons-material/HighlightOff";

import GenericGrid from "../../Generic/GenericGrid";

import { UserRole } from "../../../../types/UserRole";
import { handleAdd, handleDelete, processRowUpdate } from "../handlers";

// Define type for the rows in the grid
type Row = {
  id: number;
  name: string;
};

// Get row object with default values
const getDefaultRow = () => {
  const defaultRow = {
    id: Date.now(),
    name: "New Team",
  };
  return defaultRow;
};

type TeamGridProps = {
  theme: Theme;
  userId: number;
  userRole: UserRole;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function TeamGrid({ theme, userId, userRole }: TeamGridProps) {
  const [rows, setRows] = React.useState<Row[]>([]);

  // Fetch initial rows of the grid
  React.useEffect(() => {
    // TODO Replace this by API fetch
  }, []);

  // Called when a row is edited
  const processRowUpdateDecorator = React.useCallback(
    (newRow: GridRowModel, oldRow: GridRowModel) =>
      processRowUpdate(setRows, newRow, oldRow, false),
    []
  );

  // Called when the "Visit" action is pressed
  const handleVisit = React.useCallback(
    (rowId: GridRowId) => () => {
      // TODO Replace this by correct link
      window.location.href = `http://google.com/search?q=${rowId}`;
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

  // Called when the "Add" button is pressed below the grid
  const handleAddDecorator = React.useCallback(() => {
    handleAdd(setRows, getDefaultRow());
  }, [rows]);

  const columns = React.useMemo<GridColumns<Row>>(
    () => [
      {
        field: "name",
        headerName: "Team Name",
        type: "string",
        flex: 1,
        editable: userRole === "ASSESSOR",
      },
      {
        field: "actions",
        type: "actions",
        width: 100,
        getActions: (params: { id: GridRowId }) => [
          <GridActionsCellItem
            icon={
              <Tooltip title="Visit">
                <ArrowForwardIcon />
              </Tooltip>
            }
            label="Visit"
            onClick={handleVisit(params.id)}
          />,
          <GridActionsCellItem
            icon={
              <Tooltip title="Leave">
                <RemoveIcon />
              </Tooltip>
            }
            label="Remove"
            onClick={handleDeleteDecorator(params.id)}
          />,
        ],
      },
    ],
    [handleVisit, handleDeleteDecorator]
  );

  return (
    <GenericGrid
      theme={theme}
      rows={rows}
      columns={columns}
      processRowUpdate={processRowUpdateDecorator}
      hasToolbar
      add={
        userRole === "ASSESSOR"
          ? { text: "CREATE NEW TEAM", handler: handleAddDecorator }
          : undefined
      }
    />
  );
}
