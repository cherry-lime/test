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
import UpwardIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import DownwardIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

import GenericGrid from '../Generic/GenericGrid';

// Define type for the rows in the grid
type Row = {
  id: number;
  order: number;
  name: string;
};

// Generate new id based on time
const generateId = () => Date.now();

// Get row object with default values
const getDefaultRow = (prevRows: Row[]) => {
  const defaultRow = {
    id: prevRows.length,
    order: prevRows.length,
    name: 'Name...',
  };
  return defaultRow;
};

type MaturityGridProps = {
  theme: Theme;
  templateId: number;
};

export default function MaturityGrid({ theme, templateId }: MaturityGridProps) {
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

  // Change order of rows: row with oldOrder (index) will go to newOrder (index)
  const changeOrder = (oldOrder: number, newOrder: number) => {
    // Reorder rows state
    setRows((prevRows) => {
      if (
        newOrder === oldOrder ||
        newOrder < 0 ||
        newOrder >= prevRows.length
      ) {
        return prevRows;
      }

      // Copy prevRows into oldRows (prevRows is read-only)
      const oldRows = [...prevRows];

      // Get the row with the old order
      const row = oldRows.splice(oldOrder, 1)[0];

      // Insert row at new order
      oldRows.splice(newOrder, 0, row);

      // Update 'Order' column accordingly
      const newRows = oldRows.map((prevRow, index) => ({
        ...prevRow,
        order: index,
      }));

      return newRows;
    });
  };

  // Called when the "Upward" action is pressed
  const handleUpward = React.useCallback(
    (row: Row) => () => {
      // swapOrder(row, row.order - 1);
      const { order } = row;
      changeOrder(order, order - 1);
    },
    []
  );

  // Called when the "Downward" action is pressed
  const handleDownward = React.useCallback(
    (row: Row) => () => {
      // swapOrder(row, row.order + 1);
      const { order } = row;
      changeOrder(order, order + 1);
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
          prevRows.find((row) => row.id === rowId) ?? getDefaultRow(prevRows);

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
  const handleAdd = React.useCallback(() => {
    setRows((prevRows) => {
      // Create new row with default content and generated id
      const newRow = { ...getDefaultRow(prevRows), id: generateId() };

      // Create newRow in database
      // TODO

      return [...prevRows, newRow].sort((x, y) => (x.order > y.order ? 1 : -1));
    });
  }, []);

  const columns = React.useMemo<GridColumns<Row>>(
    () => [
      {
        field: 'order',
        headerName: 'Order',
        type: 'number',
        width: 75,
        editable: true,
      },
      {
        field: 'name',
        headerName: 'Name',
        type: 'string',
        flex: 1,
        editable: true,
      },
      {
        field: 'actions',
        type: 'actions',
        width: 150,
        getActions: (params: { id: GridRowId; row: Row }) => [
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
          <div>
            <GridActionsCellItem
              icon={<UpwardIcon />}
              label='Upward'
              onClick={handleUpward(params.row)}
            />
            <GridActionsCellItem
              icon={<DownwardIcon />}
              label='Downward'
              onClick={handleDownward(params.row)}
            />
          </div>,
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
        text: 'CREATE NEW MATURITY LEVEL',
        handler: handleAdd,
      }}
    />
  );
}
