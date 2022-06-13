import * as React from "react";

import {
  GridActionsCellItem,
  GridColumns,
  GridPreProcessEditCellProps,
  GridRowId,
  GridRowModel,
} from "@mui/x-data-grid";
import { Theme } from "@mui/material/styles";
import {
  FormControl,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import UpwardIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import DownwardIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

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
  description: string;
  additionalInfo: string;
  topic: string[];
  maturityLevel: string;
  weight: number;
  enabled: boolean;
};

// Generate new id based on time
const generateId = () => Date.now();

// Get row object with default values
const getDefaultRow = (prevRows: Row[]) => {
  const defaultRow = {
    id: generateId(),
    order: prevRows.length,
    description: "Description...",
    additionalInfo: "Additional Information...",
    topic: [],
    maturityLevel: "",
    weight: 0,
    enabled: false,
  };
  return defaultRow;
};

type CheckpointGridProps = {
  theme: Theme;
  templateId: number;
  categoryId: number;
};

export default function CheckpointGrid({
  theme,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  templateId,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  categoryId,
}: CheckpointGridProps) {
  const [rows, setRows] = React.useState<Row[]>([]);

  // TODO Remove this and fetch topics from database
  const topics = ["Topic 1", "Topic 2", "Topic 3"];

  // TODO Remove this and fetch topics from database
  const maturityLevels = [
    "Maturity Level 1",
    "Maturity Level 2",
    "Maturity Level 3",
  ];

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
    (newRow: GridRowModel, oldRow: GridRowModel) => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      const handleRowAPI = () => {};
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      const handleOrderAPI = () => {};

      return processRowUpdateDecorator(
        handleRowAPI,
        setRows,
        newRow,
        oldRow,
        handleOrderAPI
      );
    },
    []
  );

  // Called when the "Upward" action is pressed
  const handleUpward = React.useCallback(
    (row: Row) => () => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      const handleAPI = () => {};

      handleMoveRows(handleAPI, setRows, row, row.order - 1);
    },
    []
  );

  // Called when the "Downward" action is pressed
  const handleDownward = React.useCallback(
    (row: Row) => () => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      const handleAPI = () => {};

      handleMoveRows(handleAPI, setRows, row, row.order + 1);
    },
    []
  );

  // Called when topic changes
  const handleTopicChange = React.useCallback(
    (row: Row, event: SelectChangeEvent<string[]>) => {
      setRows((prevRows) => {
        const { value } = event.target;
        const topic = typeof value === "string" ? value.split(",") : value;

        // Change topic of this row
        const newRows = prevRows.map((prevRow) =>
          prevRow.id === row.id ? { ...prevRow, topic } : prevRow
        );

        // Update row in database with topic
        // TODO

        return newRows;
      });
    },
    []
  );

  // Called when maturity level changes
  const handleMaturityLevelChange = React.useCallback(
    (row: Row, event: SelectChangeEvent<string>) => {
      setRows((prevRows) => {
        const maturityLevel = event.target.value;

        // Change maturity level of this row
        const newRows = prevRows.map((prevRow) =>
          prevRow.id === row.id ? { ...prevRow, maturityLevel } : prevRow
        );

        // Update row in database with maturity level
        // TODO

        return newRows;
      });
    },
    []
  );

  // Called when the "Delete" action is pressed in the menu
  const handleDelete = React.useCallback(
    (rowId: GridRowId) => () => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      const handleAPI = () => {};

      handleDeleteDecorator(handleAPI, setRows, rowId);
      updateOrderRows(setRows);
    },
    []
  );

  // Called when the "Duplicate" action is pressed in the menu
  const handleDuplicate = React.useCallback(
    (row: GridRowModel) => () => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      const handleAPI = () => {};

      handleDuplicateDecorator(handleAPI, setRows, row);
    },
    []
  );

  // Called when the "Add" button is pressed below the grid
  const handleAdd = React.useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const handleAPI = () => {};

    handleAddDecorator(handleAPI, setRows, getDefaultRow(rows));
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
        field: "description",
        headerName: "Description",
        type: "string",
        flex: 1.5,
        editable: true,
      },
      {
        field: "additionalInfo",
        headerName: "Additional Information",
        type: "string",
        flex: 1.5,
        editable: true,
      },
      {
        field: "topic",
        headerName: "Topic",
        type: "string",
        flex: 1,
        renderCell: (params: { row: Row }) => (
          <FormControl sx={{ m: 1, width: 200 }}>
            <Select
              multiple
              value={params.row.topic}
              onChange={(event: SelectChangeEvent<string[]>) =>
                handleTopicChange(params.row, event)
              }
            >
              {topics.map((topic) => (
                <MenuItem key={topic} value={topic}>
                  {topic}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ),
      },
      {
        field: "maturityLevel",
        headerName: "Maturity Level",
        type: "string",
        flex: 1,
        renderCell: (params: { row: Row }) => (
          <FormControl sx={{ m: 1, width: 200 }}>
            <Select
              value={params.row.maturityLevel}
              onChange={(event: SelectChangeEvent<string>) =>
                handleMaturityLevelChange(params.row, event)
              }
            >
              {maturityLevels.map((maturityLevel) => (
                <MenuItem key={maturityLevel} value={maturityLevel}>
                  {maturityLevel}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
      preProcessEditOrder,
      handleUpward,
      handleDownward,
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
        text: "CREATE CHECKPOINT",
        handler: handleAdd,
      }}
    />
  );
}
