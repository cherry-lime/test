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

import { AssessmentType } from "../../../types/AssessmentType";
import {
  handleAdd,
  handleDelete,
  handleDuplicate,
  processRowUpdate,
} from "../handlers";

// Define type for the rows in the grid
type Row = {
  id: number;
  name: string;
  description: string;
};

// Get row object with default values
const getDefaultRow = () => {
  const defaultRow = {
    id: Date.now(),
    name: "Name...",
    description: "Description...",
  };
  return defaultRow;
};

type TemplateGridProps = {
  theme: Theme;
  assessmentType: AssessmentType;
};

export default function TemplateGrid({
  theme,
  assessmentType,
}: TemplateGridProps) {
  const [rows, setRows] = React.useState<Row[]>([]);

  // Fetch initial rows of the grid
  React.useEffect(() => {
    // TODO Replace this by API fetch
    setRows(() => []);
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

  // Called when the "Duplicate" action is pressed in the menu
  const handleDuplicateDecorator = React.useCallback(
    (row: GridRowModel) => () => {
      handleDuplicate(setRows, row);
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
        headerName: "Name",
        type: "string",
        flex: 1,
        editable: true,
      },
      {
        field: "description",
        headerName: "Description",
        type: "string",
        flex: 1,
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
            onClick={handleDuplicateDecorator(params.row)}
            showInMenu
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteDecorator(params.id)}
            showInMenu
          />,
        ],
      },
    ],
    [handleVisit, handleDuplicateDecorator, handleDeleteDecorator]
  );

  return (
    <GenericGrid
      theme={theme}
      rows={rows}
      columns={columns}
      processRowUpdate={processRowUpdateDecorator}
      hasToolbar
      add={{
        text: `CREATE NEW ${assessmentType} EVALUATION TEMPLATE`,
        handler: handleAddDecorator,
      }}
    />
  );
}
