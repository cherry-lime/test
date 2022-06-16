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
import FileCopyIcon from "@mui/icons-material/FileCopy";
import DeleteIcon from "@mui/icons-material/Delete";

import GenericGrid from "../Generic/GenericGrid";
import {
  handleAddDecorator,
  handleDeleteDecorator,
  handleDuplicateDecorator,
  processRowUpdateDecorator,
} from "../decorators";

// Define type for the rows in the grid
type Row = {
  id: number;
  name: string;
  enabled: boolean;
};

// Get row object with default values
const getDefaultRow = () => {
  const defaultRow = {
    id: Date.now(),
    name: "Name...",
    enabled: false,
  };
  return defaultRow;
};

type TopicGridProps = {
  theme: Theme;
  templateId: number;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function TopicGrid({ theme, templateId }: TopicGridProps) {
  const [rows, setRows] = React.useState<Row[]>([]);

  // Fetch initial rows of the grid
  React.useEffect(() => {
    // TODO Replace this by API fetch
    setRows(() => []);
  }, []);

  // Called when a row is edited
  const processRowUpdate = React.useCallback(
    (newRow: GridRowModel, oldRow: GridRowModel) =>
      processRowUpdateDecorator(setRows, newRow, oldRow, false),
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
  const handleDelete = React.useCallback(
    (rowId: GridRowId) => () => {
      handleDeleteDecorator(setRows, rowId);
    },
    []
  );

  // Called when the "Duplicate" action is pressed in the menu
  const handleDuplicate = React.useCallback(
    (row: GridRowModel) => () => {
      handleDuplicateDecorator(setRows, row);
    },
    []
  );

  // Called when the "Add" button is pressed below the grid
  const handleAdd = React.useCallback(() => {
    handleAddDecorator(setRows, getDefaultRow());
  }, [rows]);

  const columns = React.useMemo<GridColumns<Row>>(
    () => [
      {
        field: "name",
        headerName: "Name",
        type: "string",
        flex: 1,
        editable: true,
      },
      {
        field: "enabled",
        headerName: "Enabled",
        type: "boolean",
        width: 75,
        editable: true,
      },
      {
        field: "actions",
        type: "actions",
        width: 100,
        getActions: (params: { id: GridRowId; row: Row }) => [
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
            icon={<FileCopyIcon />}
            label="Duplicate"
            onClick={handleDuplicate(params.row)}
            showInMenu
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDelete(params.id)}
            showInMenu
          />,
        ],
      },
    ],
    [handleVisit, handleDuplicate, handleDelete]
  );

  return (
    <GenericGrid
      theme={theme}
      rows={rows}
      columns={columns}
      processRowUpdate={processRowUpdate}
      hasToolbar
      add={{
        text: "CREATE NEW TOPIC",
        handler: handleAdd,
      }}
    />
  );
}
