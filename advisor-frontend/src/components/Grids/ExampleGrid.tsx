import * as React from 'react';
import { createTheme } from '@mui/material/styles';
import { GridActionsCellItem, GridColumns, GridRowId } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import DeleteIcon from '@mui/icons-material/Delete';

import GenericGrid from './GenericGrid';

const theme = createTheme({
  // Style color palette
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

type Row = {
  id: number;
  name: string;
  date: Date;
};

// Get row object with default values
const getDefaultRow = () => {
  const defaultRow = { id: Date.now(), name: 'Name', date: new Date() };
  return defaultRow;
};

// Initial rows that are rendered in the grid
const initialRows: Row[] = [
  {
    id: 1,
    name: 'Alice '.repeat(50),
    date: new Date(1979, 0, 1),
  },
  {
    id: 2,
    name: 'Bob',
    date: new Date(1984, 1, 1),
  },
  {
    id: 3,
    name: 'Charlie',
    date: new Date(1992, 2, 1),
  },
  {
    id: 4,
    name: 'Denise',
    date: new Date(1992, 2, 1),
  },
];

export default function ExampleGrid() {
  const [rows, setRows] = React.useState<Row[]>(initialRows);

  // Generate new id based on time
  const generateId = () => Date.now();

  // Called when "Add" button is pressed below the grid
  const handleAdd = () => {
    setRows((prevRows) => {
      // Create new id
      const newId = generateId();

      // Create new row with default content
      const newRow = { ...getDefaultRow(), id: newId };
      console.log(`Adding row ${JSON.stringify(newRow)} to database`);
      return [...prevRows, newRow];
    });
  };

  // Called when the "Delete" action is pressed in the action menu
  const handleDelete = React.useCallback(
    (rowId: GridRowId) => () => {
      // Use setTimeout to deal with delay
      setTimeout(() => {
        // Filter row with rowId from state
        setRows((prevRows) => prevRows.filter((row) => row.id !== rowId));

        // Update database to remove row with rowId
        console.log(`Removing row with id ${rowId} from database`);
      });
    },
    []
  );

  // Called when the "Duplicate" action is pressed in the action menu
  const handleDuplicate = React.useCallback(
    (rowId: GridRowId) => () => {
      setRows((prevRows) => {
        // Get the row with rowId
        const rowToDuplicate = prevRows.find((row) => row.id === rowId)!;

        // Create new id
        const newId = generateId();

        // Create new row with duplicated content
        const newRow = { ...rowToDuplicate, id: newId };
        console.log(`Adding row ${JSON.stringify(newRow)} to database`);
        return [...prevRows, newRow];
      });
    },
    []
  );

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
        width: 200,
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
          <Button variant='outlined'>
            <strong>Outlined</strong>
          </Button>,
          <GridActionsCellItem icon={<ArrowForwardIcon />} label='Visit' />,
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
    [handleDuplicate, handleDelete]
  );

  return (
    <GenericGrid
      theme={theme}
      rows={rows}
      columns={columns}
      hasToolbar
      textAdd='add user'
      handleAdd={handleAdd}
    />
  );
}
