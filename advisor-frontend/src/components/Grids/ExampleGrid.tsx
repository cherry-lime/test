import * as React from 'react';
import { createTheme } from '@mui/material/styles';
import {
  GridActionsCellItem,
  GridColumns,
  GridRowId,
  GridRowModel,
} from '@mui/x-data-grid';
import Button from '@mui/material/Button';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import DeleteIcon from '@mui/icons-material/Delete';

import GenericGrid from './GenericGrid';

// Style color palette
const theme = createTheme({
  palette: {
    primary: {
      light: '#FFD6B1', // Light Orange
      main: '#FF6200', // Orange
      dark: '#AA3909', // Dark Orange
    },
    secondary: {
      // Lightest Grey: #FAF6F3
      light: '#EDE6E2', // Light Grey
      main: '#8B817C', // Grey
      dark: '#5A534F', // Dark Grey
    },
    text: {
      primary: '#5A534F', // Dark Grey
    },
  },
});

// Define type for the rows in the grid
type Row = {
  id: number;
  name: string;
  date: Date;
  enabled: boolean;
};

// Initial rows that are rendered in the grid
const initialRows: Row[] = [
  {
    id: 1,
    name: 'Alice '.repeat(50),
    date: new Date(1979, 0, 1),
    enabled: true,
  },
  {
    id: 2,
    name: 'Bob',
    date: new Date(1984, 1, 1),
    enabled: false,
  },
  {
    id: 3,
    name: 'Charlie',
    date: new Date(1992, 11, 30),
    enabled: false,
  },
  {
    id: 4,
    name: 'Denise',
    date: new Date(1992, 2, 1),
    enabled: true,
  },
];

// Get row object with default values
const getDefaultRow = () => {
  const defaultRow = {
    id: Date.now(),
    name: 'Name',
    date: new Date(),
    enabled: true,
  };
  return defaultRow;
};

// Generate new id based on time
const generateId = () => Date.now();

export default function ExampleGrid() {
  const [rows, setRows] = React.useState<Row[]>([]);

  // Fetch initial rows of the grid
  React.useEffect(() => {
    // TODO Replace this by API fetch
    setRows(() => initialRows);
  }, []);

  // Called when a row is edited
  const processRowUpdate = React.useCallback(
    (newRow: GridRowModel, oldRow: GridRowModel) =>
      new Promise<GridRowModel>((resolve) => {
        if (JSON.stringify(newRow) === JSON.stringify(oldRow)) {
          resolve(oldRow);
        } else {
          // Update the database with row changes
          // TODO

          resolve(newRow);
        }
      }),
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

  // Called when the "Delete" action is pressed in the action menu
  const handleDelete = React.useCallback(
    (rowId: GridRowId) => () => {
      // Use setTimeout to deal with delay
      setTimeout(() => {
        // Filter row with rowId from state
        setRows((prevRows) => prevRows.filter((row) => row.id !== rowId));

        // Delete row with rowId from database
        // TODO
      });
    },
    []
  );

  // Called when the "Duplicate" action is pressed in the action menu
  const handleDuplicate = React.useCallback(
    (rowId: GridRowId) => () => {
      setRows((prevRows) => {
        // Get the row with rowId
        const rowToDuplicate =
          prevRows.find((row) => row.id === rowId) ?? getDefaultRow();

        // Create new row with duplicated content and generated id
        const newRow = { ...rowToDuplicate, id: generateId() };

        // Create newRow in database
        // TODO

        return [...prevRows, newRow];
      });
    },
    []
  );

  // Called when "Add" button is pressed below the grid
  const handleAdd = () => {
    setRows((prevRows) => {
      // Create new row with default content and generated id
      const newRow = { ...getDefaultRow(), id: generateId() };

      // Create newRow in database
      // TODO

      return [...prevRows, newRow];
    });
  };

  const columns = React.useMemo<GridColumns<Row>>(
    () => [
      {
        field: 'name',
        headerName: 'Name',
        type: 'string',
        flex: 1,
        editable: true,
      },
      {
        field: 'date',
        headerName: 'Date',
        type: 'date',
        width: 100,
        editable: true,
      },
      {
        field: 'enabled',
        headerName: 'Enabled',
        type: 'boolean',
        width: 125,
        editable: true,
      },
      {
        field: 'actions',
        type: 'actions',
        width: 350,
        getActions: (params) => [
          <Button variant='contained'>
            <strong>Contained</strong>
          </Button>,
          <Button variant='outlined' style={{ backgroundColor: 'white' }}>
            <strong>Outlined</strong>
          </Button>,
          <GridActionsCellItem
            icon={<ArrowForwardIcon />}
            label='Visit'
            onClick={handleVisit(params.id)}
          />,
          <GridActionsCellItem
            icon={<FileCopyIcon />}
            label='Duplicate'
            onClick={handleDuplicate(params.id)}
            showInMenu
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label='Delete'
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
      add={{ text: 'Add user', handler: handleAdd }}
    />
  );
}
