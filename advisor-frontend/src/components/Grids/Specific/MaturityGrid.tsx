import * as React from 'react';

import {
  GridActionsCellItem,
  GridColumns,
  GridPreProcessEditCellProps,
  GridRowId,
  GridRowModel,
} from '@mui/x-data-grid';
import { Theme } from '@mui/material/styles';
import { IconButton } from '@mui/material';

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
  enabled: boolean;
};

// Generate new id based on time
const generateId = () => Date.now();

// Get row object with default values
const getDefaultRow = (prevRows: Row[]) => {
  const defaultRow = {
    id: generateId(),
    order: prevRows.length,
    name: 'Name...',
    enabled: false,
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

  // Move row to index
  const moveRow = React.useCallback((row: Row, index: number) => {
    // Reorder rows state
    setRows((prevRows) => {
      if (index < 0 || index >= prevRows.length) {
        return prevRows;
      }

      // Remove row from previous rows
      const newRows = prevRows.filter((prevRow) => prevRow.id !== row.id);

      // Insert row at index
      newRows.splice(index, 0, row);

      return newRows;
    });
  }, []);

  // Update 'Order' column based on index
  const updateOrder = React.useCallback(() => {
    setRows((prevRows) => {
      const newRows = prevRows.map((prevRow, index) => ({
        ...prevRow,
        order: index,
      }));

      return newRows;
    });
  }, []);

  // Called when the 'Order' column is edited
  const preProcessEditOrder = React.useCallback(
    (params: GridPreProcessEditCellProps) => {
      const { value } = params.props;

      // If order is below 0, above row length, or null: reject
      const hasError = value < 0 || value >= rows.length || value === null;

      return { ...params.props, error: hasError };
    },
    [rows]
  );

  // Called when a row is edited
  const processRowUpdate = React.useCallback(
    (newRow: GridRowModel, oldRow: GridRowModel) => {
      // If row has not changed, return old row
      if (JSON.stringify(newRow) === JSON.stringify(oldRow)) {
        return oldRow;
      }

      // If the 'Order' value has changed, move row and update order
      if (newRow.order !== oldRow.order) {
        moveRow(newRow, newRow.order);
        updateOrder();
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

  // Called when the "Upward" action is pressed
  const handleUpward = React.useCallback(
    (row: Row) => () => {
      const { order } = row;
      moveRow(row, order - 1);
      updateOrder();
    },
    []
  );

  // Called when the "Downward" action is pressed
  const handleDownward = React.useCallback(
    (row: Row) => () => {
      const { order } = row;
      moveRow(row, order + 1);
      updateOrder();
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
        updateOrder();

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
        const newRow = { ...row, id: generateId(), order: prevRows.length };

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
        preProcessEditCellProps: preProcessEditOrder,
        renderCell: (params: { row: Row }) => (
          <div className='parent'>
            <div className='child'>
              <IconButton onClick={handleUpward(params.row)}>
                <UpwardIcon />
              </IconButton>
            </div>
            <strong>{params.row.order}</strong>
            <div className='child'>
              <IconButton onClick={handleDownward(params.row)}>
                <DownwardIcon />
              </IconButton>
            </div>
          </div>
        ),
      },
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
        width: 75,
        getActions: (params: { id: GridRowId; row: Row }) => [
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
        text: 'CREATE NEW MATURITY LEVEL',
        handler: handleAdd,
      }}
    />
  );
}
