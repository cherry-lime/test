import * as React from "react";
import { ColorResult } from "react-color";
import {
  GridPreProcessEditCellProps,
  GridRowId,
  GridRowModel,
} from "@mui/x-data-grid";

export function initRows(
  setRows: React.Dispatch<React.SetStateAction<GridRowModel[]>>,
  rows: GridRowModel[]
) {
  // Initialize rows
  setRows(() => rows);
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
  rowId: GridRowId
) {
  setRows((prevRows) => {
    // Filter row with rowId from state
    const newRows = prevRows.filter((row) => row.id !== rowId);

    // Update rows state with deleted row
    return newRows;
  });
}

export function changeColorRow(
  setRows: React.Dispatch<React.SetStateAction<GridRowModel[]>>,
  row: GridRowModel,
  color: ColorResult
) {
  setRows((prevRows) => {
    // Change color of this row
    const newRows = prevRows.map((prevRow) =>
      prevRow.id === row.id ? { ...prevRow, color: color.hex } : prevRow
    );

    // Update row in rows state with color
    return newRows;
  });
}

export function updateRowOrder(
  setRows: React.Dispatch<React.SetStateAction<GridRowModel[]>>
) {
  setRows((prevRows) => {
    // Map each row's order to its index
    const newRows = prevRows.map((prevRow, index) => ({
      ...prevRow,
      order: index,
    }));

    // Update rows state with new orders
    return newRows;
  });
}

export function moveRow(
  setRows: React.Dispatch<React.SetStateAction<GridRowModel[]>>,
  row: GridRowModel,
  index: number
) {
  setRows((prevRows) => {
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

  updateRowOrder(setRows);
}

export function preProcessEditOrder(
  rows: GridRowModel[],
  params: GridPreProcessEditCellProps
) {
  const { value } = params.props;

  // If order is below 0, above row length, or null: reject
  const hasError = value < 0 || value >= rows.length || value === null;

  return { ...params.props, error: hasError };
}

export function updateRow(
  setRows: React.Dispatch<React.SetStateAction<GridRowModel[]>>,
  newRow: GridRowModel,
  oldRow: GridRowModel
) {
  // If this grid is ordered
  if (Object.prototype.hasOwnProperty.call(newRow, "order")) {
    // If the 'Order' value has changed
    if (newRow.order !== oldRow.order) {
      // Move row
      moveRow(setRows, oldRow, newRow.order);
    }
  } else {
    // Update rows state with new row
    setRows((prevRows) =>
      prevRows.map((prevRow) => (prevRow.id === newRow.id ? newRow : prevRow))
    );
  }
}

export async function processRowUpdate(
  setRows: React.Dispatch<React.SetStateAction<GridRowModel[]>>,
  newRow: GridRowModel,
  oldRow: GridRowModel,
  mutate: (row: GridRowModel) => Promise<void>
) {
  // If row has not changed
  if (JSON.stringify(newRow) === JSON.stringify(oldRow)) {
    // Keep internal state
    return oldRow;
  }

  // Mutate may throw error
  try {
    // Mutate new row to API
    await mutate(newRow);

    // Update row state with new row
    updateRow(setRows, newRow, oldRow);

    // Update internal state
    return newRow;
  } catch (error) {
    // Keep internal state
    return oldRow;
  }
}
