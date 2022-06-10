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

import GenericGrid from "./GenericGrid";

type OrderedGridProps = {
  setRows: React.Dispatch<React.SetStateAction<GridRowModel[]>>;
  theme: Theme;
  rows: GridRowModel[];
  columns: GridColumns;
  hasToolbar: boolean;
  add: {
    text: string;
    handler: () => void;
  };
};

export default function OrderedGrid({
  setRows,
  theme,
  rows,
  columns,
  hasToolbar,
  add,
}: OrderedGridProps) {
  // Move row to index
  const moveRow = React.useCallback((row: GridRowModel, index: number) => {
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

  // Called when the "Upward" action is pressed
  const handleUpward = React.useCallback(
    (row: GridRowModel) => () => {
      const { order } = row;
      moveRow(row, order - 1);
      updateOrder();
    },
    []
  );

  // Called when the "Downward" action is pressed
  const handleDownward = React.useCallback(
    (row: GridRowModel) => () => {
      const { order } = row;
      moveRow(row, order + 1);
      updateOrder();
    },
    []
  );

  const wrappedColumns = React.useMemo<GridColumns<GridRowModel>>(
    () => [
      {
        field: "order",
        headerName: "Order",
        headerAlign: "center",
        align: "center",
        type: "number",
        width: 75,
        editable: true,
        preProcessEditCellProps: preProcessEditOrder,
        renderCell: (params: { row: GridRowModel }) => (
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
        ),
      },
      ...columns,
    ],
    []
  );

  return (
    <GenericGrid
      theme={theme}
      rows={rows}
      columns={wrappedColumns}
      hasToolbar={hasToolbar}
      add={add}
    />
  );
}
