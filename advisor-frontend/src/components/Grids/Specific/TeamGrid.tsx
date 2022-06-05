import * as React from 'react';
import {
  GridActionsCellItem,
  GridColumns,
  GridRowId,
  GridRowModel,
} from '@mui/x-data-grid';
import { Theme } from '@mui/material/styles';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import RemoveIcon from '@mui/icons-material/HighlightOff';

import GenericGrid from '../Generic/GenericGrid';

// Define type for the rows in the grid
type Row = {
  id: number;
  name: string;
};

// Get row object with default values
const getDefaultRow = () => {
  const defaultRow = {
    id: Date.now(),
    name: 'New Team',
  };
  return defaultRow;
};

// Generate new id based on time
const generateId = () => Date.now();

type TeamGridProps = {
  theme: Theme;
  isAssessor: boolean;
};

export default function TeamGrid({ theme, isAssessor }: TeamGridProps) {
  const [rows, setRows] = React.useState<Row[]>([]);

  // Fetch initial rows of the grid
  React.useEffect(() => {
    // TODO Replace this by API fetch
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

  // Called when the "Remove" action is pressed
  const handleRemove = React.useCallback(
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
        headerName: 'Team Name',
        type: 'string',
        flex: 1,
        editable: isAssessor,
      },
      {
        field: 'actions',
        type: 'actions',
        width: 100,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<ArrowForwardIcon />}
            label='Visit'
            onClick={handleVisit(params.id)}
          />,
          <GridActionsCellItem
            icon={<RemoveIcon />}
            label='Remove'
            onClick={handleRemove(params.id)}
          />,
        ],
      },
    ],
    [handleVisit, handleRemove]
  );

  return (
    <GenericGrid
      theme={theme}
      rows={rows}
      columns={columns}
      processRowUpdate={processRowUpdate}
      hasToolbar
      add={
        isAssessor ? { text: 'Create new team', handler: handleAdd } : undefined
      }
    />
  );
}
