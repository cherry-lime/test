import * as React from 'react';

import {
  GridActionsCellItem,
  GridColumns,
  GridRowId,
  GridRowModel,
} from '@mui/x-data-grid';
import { Theme } from '@mui/material/styles';

import RemoveIcon from '@mui/icons-material/HighlightOff';

import GenericGrid from '../Generic/GenericGrid';

import { UserRole } from '../../../types/UserRole';

// Define type for the rows in the grid
type Row = {
  id: number;
  name: string;
};

// Get row object with default values
const getDefaultRow = () => {
  const defaultRow = {
    id: Date.now(),
    name: '',
  };
  return defaultRow;
};

// Generate new id based on time
const generateId = () => Date.now();

type MemberGridProps = {
  theme: Theme;
  userId: number;
  userRole: UserRole;
  teamId: number;
  forAssessors: boolean; // Is the grid for assessors (true) or users (false)
};

export default function MemberGrid({
  theme,
  userId,
  userRole,
  teamId,
  forAssessors,
}: MemberGridProps) {
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
        headerName: forAssessors ? 'Assessor Name' : 'Member Name',
        type: 'string',
        flex: 1,
        editable: userRole === 'ASSESSOR',
      },
      ...(userRole === 'ASSESSOR'
        ? [
            {
              field: 'actions',
              type: 'actions',
              width: 100,
              getActions: (params: { id: GridRowId }) => [
                <GridActionsCellItem
                  icon={<RemoveIcon />}
                  label='Remove'
                  onClick={handleRemove(params.id)}
                />,
              ],
            },
          ]
        : []),
    ],
    [handleRemove]
  );

  return (
    <GenericGrid
      theme={theme}
      rows={rows}
      columns={columns}
      processRowUpdate={processRowUpdate}
      hasToolbar
      add={
        userRole === 'ASSESSOR'
          ? {
              text: forAssessors ? 'Add Assessor' : 'Add Member',
              handler: handleAdd,
            }
          : undefined
      }
    />
  );
}
