import * as React from "react";
import { ColorResult } from "react-color";
import {
  GridPreProcessEditCellProps,
  GridRowId,
  GridRowModel,
} from "@mui/x-data-grid";

// Generate new id based on time
const generateId = () => Date.now();

export function handleAddDecorator(
  handleAPI: () => void,
  setRows: React.Dispatch<React.SetStateAction<GridRowModel[]>>,
  defaultRow: GridRowModel
) {
  setRows((prevRows) => {
    // Create new row with default content and generated id
    const newRow = { ...defaultRow, id: generateId() };

    // Create newRow in database
    handleAPI();

    // Update rows state with added row
    return [...prevRows, newRow];
  });
}

export function handleDeleteDecorator(
  handleAPI: () => void,
  setRows: React.Dispatch<React.SetStateAction<GridRowModel[]>>,
  rowId: GridRowId
) {
  setRows((prevRows) => {
    // Filter row with rowId from state
    const newRows = prevRows.filter((row) => row.id !== rowId);

    // Delete row with rowId from database
    handleAPI();

    // Update rows state with deleted row
    return newRows;
  });
}

export function handleDuplicateDecorator(
  handleAPI: () => void,
  setRows: React.Dispatch<React.SetStateAction<GridRowModel[]>>,
  row: GridRowModel
) {
  setRows((prevRows) => {
    // Create new row with duplicated content and generated id
    const newRow = { ...row, id: generateId(), order: prevRows.length };

    // Create newRow in database
    handleAPI();

    // Update rows state with duplicated row
    return [...prevRows, newRow];
  });
}

export function handleColorDecorator(
  handleAPI: () => void,
  setRows: React.Dispatch<React.SetStateAction<GridRowModel[]>>,
  row: GridRowModel,
  color: ColorResult
) {
  setRows((prevRows) => {
    // Change color of this row
    const newRows = prevRows.map((prevRow) =>
      prevRow.id === row.id ? { ...prevRow, color: color.hex } : prevRow
    );

    // Update row in database with color
    handleAPI();

    // Update row in rows state with color
    return newRows;
  });
}

export function updateOrderRows(
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

export function handleMoveRows(
  handleAPI: () => void,
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

    // Update row in database with new index
    handleAPI();

    // Update rows state with moved rows
    return newRows;
  });

  updateOrderRows(setRows);
}

export function preProcessEditOrderDecorator(
  rows: GridRowModel[],
  params: GridPreProcessEditCellProps
) {
  const { value } = params.props;

  // If order is below 0, above row length, or null: reject
  const hasError = value < 0 || value >= rows.length || value === null;

  return { ...params.props, error: hasError };
}

export function processRowUpdateDecorator(
  handleRowAPI: () => void,
  setRows: React.Dispatch<React.SetStateAction<GridRowModel[]>>,
  newRow: GridRowModel,
  oldRow: GridRowModel,
  handleOrderAPI?: () => void
) {
  // If row has not changed
  if (JSON.stringify(newRow) === JSON.stringify(oldRow)) {
    // Keep internal state
    return oldRow;
  }

  // If this grid is ordered
  if (handleOrderAPI) {
    // If the 'Order' value has changed
    if (newRow.order !== oldRow.order) {
      // Move rows
      handleMoveRows(handleOrderAPI, setRows, oldRow, newRow.order);

      // Update internal state
      return newRow;
    }
  }

  // Update row change in database
  handleRowAPI();

  // Update row change in state
  setRows((prevRows) =>
    prevRows.map((prevRow) => (prevRow.id === newRow.id ? newRow : prevRow))
  );

  // Update internal state
  return newRow;
}
