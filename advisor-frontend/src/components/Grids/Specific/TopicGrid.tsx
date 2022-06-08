import * as React from 'react';

import {
  GridActionsCellItem,
  GridColumns,
  GridRowId,
  GridRowModel,
} from '@mui/x-data-grid';
import { Theme } from '@mui/material/styles';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import DeleteIcon from '@mui/icons-material/Delete';

import GenericGrid from '../Generic/GenericGrid';

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
    name: 'Name...',
    enabled: true,
  };
  return defaultRow;
};

// Generate new id based on time
const generateId = () => Date.now();

type TemplateGridProps = {
  theme: Theme;
  templateId: number;
};

export default function TopicGrid({ theme, templateId }: TemplateGridProps) {
  const [rows, setRows] = React.useState<Row[]>([]);

  // Fetch initial rows of the grid
  React.useEffect(() => {
    // TODO Replace this by API fetch
    setRows(() => []);
  }, []);

  // Called when a row is edited
  const processRowUpdate = React.useCallback(
    (newRow: GridRowModel, oldRow: GridRowModel) => {
      if (JSON.stringify(newRow) === JSON.stringify(oldRow)) {
        return oldRow;
      }

      // Update the database with row changes, ask for validation
      // TODO

      setRows((prevRows) =>
        prevRows.map((prevRow) => (prevRow.id === newRow.id ? newRow : prevRow))
      );

      return newRow;
    },
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
    (row: Row) => () => {
      setRows((prevRows) => {
        // Create new row with duplicated content and generated id
        const newRow = { ...row, id: generateId() };

        // Create newRow in database
        // TODO

        return [...prevRows, newRow];
      });
    },
    []
  );

  // Called when "Add" button is pressed below the grid
  const handleAdd = React.useCallback(() => {
    setRows((prevRows) => {
      // Create new row with default content and generated id
      const newRow = { ...getDefaultRow(), id: generateId() };

      // Create newRow in database
      // TODO

      return [...prevRows, newRow];
    });
  }, []);

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
        field: 'enabled',
        headerName: 'Enabled',
        type: 'boolean',
        width: 75,
        editable: true,
      },
      {
        field: 'actions',
        type: 'actions',
        width: 100,
        getActions: (params: { id: GridRowId; row: Row }) => [
          <GridActionsCellItem
            icon={<ArrowForwardIcon />}
            label='Visit'
            onClick={handleVisit(params.id)}
          />,
          <GridActionsCellItem
            icon={<FileCopyIcon />}
            label='Duplicate'
            onClick={handleDuplicate(params.row)}
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
      add={{
        text: 'CREATE NEW TOPIC',
        handler: handleAdd,
      }}
    />
  );
}
