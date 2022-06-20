import * as React from "react";
import { Link } from "react-router-dom";

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
                <Link to={`/teams/${params.id}`}>
                  <ArrowForwardIcon />
                </Link>
              </Tooltip>
            }
            label="Visit"
          />,
          <GridActionsCellItem
            icon={
              <Tooltip title="Leave">
                <RemoveIcon />
              </Tooltip>
            }
            label="Remove"
            onClick={handleDelete(params.id)}
          />,
        ],
      },
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
          ? { text: "CREATE NEW TEAM", handler: handleAdd }
          : undefined
      }
    />
  );
}
