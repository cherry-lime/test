import * as React from "react";
import { GridRowModel } from "@mui/x-data-grid";

export function initRows(
  setRows: React.Dispatch<React.SetStateAction<GridRowModel[]>>,
  rows: GridRowModel[]
) {
  // Initialize rows
  setRows(() => {
    // If the rows are nonempty ordered
    if (
      rows.length > 0 &&
      Object.prototype.hasOwnProperty.call(rows[0], "order")
    ) {
      // Sort the rows by order
      return [...rows].sort((a, b) => a.order - b.order);
    }

    return rows;
  });
}

export function updateOrderRows(
  setRows: React.Dispatch<React.SetStateAction<GridRowModel[]>>
) {
  setRows((prevRows) => {
    // Map each row's order to its index + 1
    const newRows = prevRows.map((prevRow, index) => ({
      ...prevRow,
      order: index + 1,
    }));

    // Update rows state with new orders
    return newRows;
  });
}

export function moveRow(
  setRows: React.Dispatch<React.SetStateAction<GridRowModel[]>>,
  row: GridRowModel,
  order: number
) {
  setRows((prevRows) => {
    const index = order - 1;

    // If index is invalid, keep previous rows
    if (index < 0 || index >= prevRows.length) {
      return prevRows;
    }

    // Remove row from previous rows
    const newRows = prevRows.filter((prevRow) => prevRow.id !== row.id);

    // Insert row at index
    newRows.splice(index, 0, row);

    // Update rows state with moved rows
    return newRows;
  });

  updateOrderRows(setRows);
}

export function updateRow(
  setRows: React.Dispatch<React.SetStateAction<GridRowModel[]>>,
  newRow: GridRowModel,
  oldRow: GridRowModel
) {
  // If this grid is ordered and the 'Order' value has changed
  if (
    Object.prototype.hasOwnProperty.call(newRow, "order") &&
    newRow.order !== oldRow.order
  ) {
    // Move the row to its new order
    moveRow(setRows, oldRow, newRow.order);
  } else {
    // Update rows state with new row
    setRows((prevRows) =>
      prevRows.map((prevRow) => (prevRow.id === newRow.id ? newRow : prevRow))
    );
  }
}

export function addRow(
  setRows: React.Dispatch<React.SetStateAction<GridRowModel[]>>,
  row: GridRowModel
) {
  // Add row the the previous rows
  setRows((prevRows) => [...prevRows, row]);
}

export function deleteRow(
  setRows: React.Dispatch<React.SetStateAction<GridRowModel[]>>,
  row: GridRowModel
) {
  setRows((prevRows) => {
    // Filter row with rowId from state
    const newRows = prevRows.filter((prevRow) => prevRow.id !== row.id);

    // Update rows state with deleted row
    return newRows;
  });

  // If this grid is ordered
  if (Object.prototype.hasOwnProperty.call(row, "order")) {
    updateOrderRows(setRows);
  }
}
