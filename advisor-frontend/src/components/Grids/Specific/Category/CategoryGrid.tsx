import * as React from "react";
import { BlockPicker, ColorResult } from "react-color";

import {
  GridActionsCellItem,
  GridColumns,
  GridPreProcessEditCellProps,
  GridRowId,
  GridRowModel,
} from "@mui/x-data-grid";
import { Theme } from "@mui/material/styles";
import { IconButton, Tooltip } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import UpwardIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import DownwardIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

import GenericGrid from "../../Generic/GenericGrid";
import {
  handleAdd,
  handleColor,
  handleDelete,
  handleDuplicate,
  handleMoveRows,
  preProcessEditOrder,
  processRowUpdate,
  updateOrderRows,
} from "../handlers";

// Define type for the rows in the grid
type Row = {
  id: number;
  order: number;
  name: string;
  color: string;
  enabled: boolean;
};

// Generate new id based on time
const generateId = () => Date.now();

// Get row object with default values
const getDefaultRow = (rows: Row[]) => {
  const defaultRow = {
    id: generateId(),
    order: rows.length,
    name: "Name...",
    color: "#fff",
    enabled: false,
  };
  return defaultRow;
};

type CategoryGridProps = {
  theme: Theme;
  templateId: number;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function CategoryGrid({ theme, templateId }: CategoryGridProps) {
  const [rows, setRows] = React.useState<Row[]>([]);

  // Fetch initial rows of the grid
  React.useEffect(() => {
    // TODO Replace this by API fetch
    setRows(() => []);
  }, []);

  // Called when the 'Order' column is edited
  const preProcessEditOrderDecorator = React.useCallback(
    (params: GridPreProcessEditCellProps) => preProcessEditOrder(rows, params),
    [rows]
  );

  // Called when a row is edited
  const processRowUpdateDecorator = React.useCallback(
    (newRow: GridRowModel, oldRow: GridRowModel) =>
      processRowUpdate(setRows, newRow, oldRow, true),
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

  // Called when color picker registers a complete change
  const handleColorDecorator = React.useCallback(
    (color: ColorResult, row: Row) => {
      handleColor(setRows, row, color);
    },
    []
  );

  // Called when the "Visit" action is pressed
  const handleVisit = React.useCallback(
    (rowId: GridRowId) => () => {
      // TODO Replace this by routing
      window.location.href = `http://google.com/search?q=${rowId}`;
    },
    []
  );

  // Called when the "Delete" action is pressed in the menu
  const handleDeleteDecorator = React.useCallback(
    (rowId: GridRowId) => () => {
      handleDelete(setRows, rowId);
      updateOrderRows(setRows);
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
    handleAdd(setRows, getDefaultRow(rows));
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
        preProcessEditCellProps: preProcessEditOrderDecorator,
      },
      {
        field: "name",
        headerName: "Name",
        type: "string",
        flex: 1,
        editable: true,
      },
      {
        field: "color",
        headerName: "Color Theme",
        flex: 1,
        editable: false,
        renderCell: (params: { row: Row }) => (
          <BlockPicker
            width="250px"
            colors={[]}
            triangle="hide"
            color={params.row.color}
            onChangeComplete={(color: ColorResult) =>
              handleColorDecorator(color, params.row)
            }
            styles={{
              default: {
                head: {
                  height: "50px",
                  borderStyle: "solid",
                  borderColor:
                    params.row.order % 2 === 0
                      ? theme.palette.secondary.light
                      : "white",
                },
                body: {
                  backgroundColor:
                    params.row.order % 2 === 0
                      ? theme.palette.secondary.light
                      : "white",
                },
              },
            }}
          />
        ),
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
        width: 125,
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
    [
      handleUpward,
      handleDownward,
      preProcessEditOrderDecorator,
      handleColorDecorator,
      handleVisit,
      handleDuplicateDecorator,
      handleDeleteDecorator,
    ]
  );

  return (
    <GenericGrid
      theme={theme}
      rows={rows}
      columns={columns}
      processRowUpdate={processRowUpdateDecorator}
      hasToolbar
      add={{
        text: "CREATE NEW AREA",
        handler: handleAddDecorator,
      }}
    />
  );
}
