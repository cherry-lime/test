import * as React from "react";

import {
  GridActionsCellItem,
  GridColumns,
  GridPreProcessEditCellProps,
  GridRowId,
  GridRowModel,
} from "@mui/x-data-grid";
import { Theme } from "@mui/material/styles";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import UpwardIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import DownwardIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { IconButton } from "@mui/material";

import GenericGrid from "../Generic/GenericGrid";
import {
  handleAddDecorator,
  handleDeleteDecorator,
  handleDuplicateDecorator,
  handleMoveRows,
  preProcessEditOrderDecorator,
  processRowUpdateDecorator,
  updateOrderRows,
} from "../decorators";

// Define type for the rows in the grid
type Row = {
  id: number;
  order: number;
  name: string;
  summary: string;
  description: string;
  enabled: boolean;
};

// Get row object with default values
const getDefaultRow = (prevRows: Row[]) => {
  const defaultRow = {
    id: Date.now(),
    order: prevRows.length,
    name: "Name...",
    summary: "Summary...",
    description: "Description...",
    enabled: false,
  };
  return defaultRow;
};

type SubareaGridProps = {
  theme: Theme;
  templateId: number;
  categoryId: number;
};

export default function SubareaGrid({
  theme,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  templateId,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  categoryId,
}: SubareaGridProps) {
  const [rows, setRows] = React.useState<Row[]>([]);

  // Fetch initial rows of the grid
  React.useEffect(() => {
    // TODO Replace this by API fetch
    setRows(() => []);
  }, []);

  // Called when the 'Order' column is edited
  const preProcessEditOrder = React.useCallback(
    (params: GridPreProcessEditCellProps) =>
      preProcessEditOrderDecorator(rows, params),
    [rows]
  );

  // Called when a row is edited
  const processRowUpdate = React.useCallback(
    (newRow: GridRowModel, oldRow: GridRowModel) =>
      processRowUpdateDecorator(setRows, newRow, oldRow, true),
    []
  );

  // Called when the "Upward" action is pressed
  const handleUpward = React.useCallback(
    (row: Row) => () => {
      handleMoveRows(setRows, row, row.order - 1);
    },
    []
  );

  // Called when the "Downward" action is pressed
  const handleDownward = React.useCallback(
    (row: Row) => () => {
      handleMoveRows(setRows, row, row.order + 1);
    },
    []
  );

  // Called when the "Delete" action is pressed in the menu
  const handleDelete = React.useCallback(
    (rowId: GridRowId) => () => {
      handleDeleteDecorator(setRows, rowId);
      updateOrderRows(setRows);
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
    handleAddDecorator(setRows, getDefaultRow(rows));
  }, [rows]);

  const columns = React.useMemo<GridColumns<Row>>(
    () => [
      {
        field: "",
        width: 50,
        renderCell: (params: { row: Row }) => (
          <div className="parent">
            <div className="child">
              <IconButton onClick={handleUpward(params.row)}>
                <UpwardIcon />
              </IconButton>
            </div>
            <div className="child">
              <IconButton onClick={handleDownward(params.row)}>
                <DownwardIcon />
              </IconButton>
            </div>
          </div>
        ),
      },
      {
        field: "order",
        headerName: "Order",
        headerAlign: "center",
        align: "center",
        type: "number",
        width: 75,
        editable: true,
        preProcessEditCellProps: preProcessEditOrder,
      },
      {
        field: "name",
        headerName: "Name",
        type: "string",
        width: 200,
        editable: true,
      },
      {
        field: "summary",
        headerName: "Summary",
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
        field: "enabled",
        headerName: "Enabled",
        type: "boolean",
        width: 75,
        editable: true,
      },
      {
        field: "actions",
        type: "actions",
        width: 75,
        getActions: (params: { id: GridRowId; row: Row }) => [
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
    [
      handleUpward,
      handleDownward,
      preProcessEditOrder,
      handleDuplicate,
      handleDelete,
    ]
  );

  return (
    <GenericGrid
      theme={theme}
      rows={rows}
      columns={columns}
      processRowUpdate={processRowUpdate}
      hasToolbar
      add={{
        text: "CREATE NEW SUBAREA",
        handler: handleAdd,
      }}
    />
  );
}
