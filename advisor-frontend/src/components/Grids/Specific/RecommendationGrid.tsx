import * as React from "react";

import {
  GridColumns,
  GridPreProcessEditCellProps,
  GridRowModel,
} from "@mui/x-data-grid";
import { Theme } from "@mui/material/styles";
import { IconButton } from "@mui/material";
import UpwardIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import DownwardIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

import GenericGrid from "../Generic/GenericGrid";

import { UserRole } from "../../../types/UserRole";
import { AssessmentType } from "../../../types/AssessmentType";

// Define type for the rows in the grid
type Row = {
  id: number;
  order: number;
  description: string;
  additionalInfo: string;
};

type RecommendationGridProps = {
  theme: Theme;
  assessmentId: number;
  assessmentType: AssessmentType;
  userId: number;
  userRole: UserRole;
};

export default function RecommendationGrid({
  theme,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  assessmentId,
  assessmentType,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  userId,
  userRole,
}: RecommendationGridProps) {
  const [rows, setRows] = React.useState<Row[]>([
    {
      id: 0,
      order: 0,
      description: "Description A",
      additionalInfo: "Additional information A",
    },
    {
      id: 1,
      order: 1,
      description: "Description B",
      additionalInfo: "Additional information B",
    },
  ]);

  // Fetch initial rows of the grid
  React.useEffect(() => {
    // TODO Replace this by API fetch
    // setRows(() => []);
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

  const columns = React.useMemo<GridColumns<Row>>(
    () => [
      {
        field: "order",
        headerName: "Order",
        headerAlign: "center",
        align: "center",
        type: "number",
        width: 75,
        editable: userRole === "ASSESSOR" && assessmentType === "TEAM",
        preProcessEditCellProps: preProcessEditOrder,
        renderCell: (params: { row: Row }) =>
          userRole === "ASSESSOR" && assessmentType === "TEAM" ? (
            <div className="parent">
              <div className="child">
                <IconButton onClick={handleUpward(params.row)}>
                  <UpwardIcon />
                </IconButton>
              </div>
              <strong>{params.row.order}</strong>
              <div className="child">
                <IconButton onClick={handleDownward(params.row)}>
                  <DownwardIcon />
                </IconButton>
              </div>
            </div>
          ) : (
            <strong>{params.row.order}</strong>
          ),
      },
      {
        field: "description",
        headerName: "Description",
        type: "string",
        flex: 1,
        editable: userRole === "ASSESSOR" && assessmentType === "TEAM",
      },
      {
        field: "additionalInfo",
        headerName: "Additional Information",
        type: "string",
        flex: 1,
        editable: userRole === "ASSESSOR" && assessmentType === "TEAM",
      },
    ],
    [preProcessEditOrder, handleUpward, handleDownward]
  );

  return (
    <GenericGrid
      theme={theme}
      rows={rows}
      columns={columns}
      processRowUpdate={processRowUpdate}
      hasToolbar
    />
  );
}
