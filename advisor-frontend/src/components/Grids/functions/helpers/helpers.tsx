import { GridRowModel } from "@mui/x-data-grid";

/**
 * Initializes the rows of the grid
 * @param setRows - Set function for rows state
 * @param rows - Rows that will be initialized
 */
export function initRows(rows: GridRowModel[]) {
  // If the rows are nonempty ordered
  if (
    rows.length > 0 &&
    Object.prototype.hasOwnProperty.call(rows[0], "order")
  ) {
    // Sort the rows by order
    return [...rows].sort((a, b) => a.order - b.order);
  }

  return rows;
}

/**
 * Updates the order of the rows in the grid
 * @param setRows - Set function for rows state
 */
export function updateOrderRows(rows: GridRowModel[]) {
  // Map each row's order to its index + 1
  const newRows = rows.map((prevRow, index) => ({
    ...prevRow,
    order: index + 1,
  }));

  // Update rows state with new orders
  return newRows;
}

/**
 * Moves a row in the grid
 * @param setRows - Set function for rows state
 * @param row - The row that should be moved
 * @param order - The new order it should be moved to
 */
export function moveRow(
  prevRows: GridRowModel[],
  row: GridRowModel,
  order: number
) {
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
  return updateOrderRows(newRows);
}

/**
 * Updates a row in the grid
 * @param setRows - Set function for rows state
 * @param newRow - The row after update
 * @param oldRow - The row before update
 */
export function updateRow(
  prevRows: GridRowModel[],
  newRow: GridRowModel,
  oldRow: GridRowModel
) {
  // If this grid is ordered and the 'Order' value has changed
  if (
    Object.prototype.hasOwnProperty.call(newRow, "order") &&
    newRow.order !== oldRow.order
  ) {
    // Move the row to its new order
    return moveRow(prevRows, oldRow, newRow.order);
  }

  // Update rows state with new row
  return prevRows.map((prevRow) =>
    prevRow.id === newRow.id ? newRow : prevRow
  );
}

/**
 * Adds a row to the grid
 * @param setRows - Set function for rows state
 * @param row - The row that should be added
 */
export function addRow(prevRows: GridRowModel[], row: GridRowModel) {
  // Add row the the previous rows
  return [...prevRows, row];
}

/**
 * Deletes a row from the grid
 * @param setRows - Set function for rows state
 * @param row - The row that should be deleted
 */
export function deleteRow(prevRows: GridRowModel[], row: GridRowModel) {
  // Filter row with rowId from state
  const newRows = prevRows.filter((prevRow) => prevRow.id !== row.id);

  // Update rows state with deleted row
  return newRows;

  // If this grid is ordered
  if (Object.prototype.hasOwnProperty.call(row, "order")) {
    updateOrderRows(newRows);
  }
}
