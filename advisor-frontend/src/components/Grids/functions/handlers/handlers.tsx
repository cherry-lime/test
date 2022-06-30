import * as React from "react";
import { UseMutationResult, UseQueryResult } from "react-query";
import { GridPreProcessEditCellProps, GridRowModel } from "@mui/x-data-grid";
import {
  initRows,
  addRow,
  deleteRow,
  updateRow,
  moveRow,
} from "../helpers/helpers";
import { RefObject, handleError } from "../../../ErrorPopup/ErrorPopup";
import { TemplateAPP } from "../../../../api/TemplateAPI";

/**
 * Initializes the rows of the grid
 * @param setRows - Set function for rows state
 * @param status - Status of query
 * @param data - Data of query
 */
export function handleInit(
  setRows: React.Dispatch<React.SetStateAction<GridRowModel[]>>,
  status: "error" | "idle" | "loading" | "success",
  data: GridRowModel[] | undefined
) {
  if (status === "success") {
    if (data) {
      initRows(setRows, data);
    }
  }
}

/**
 * Preprocesses the order when a row is edited
 * @param rows - Current rows of the grid
 * @param params - Props for editing a cell
 * @param ref - Reference to error popup
 * @returns - Edit cell props and whether there is an error
 */
export function preProcessEditOrder(
  rows: GridRowModel[],
  params: GridPreProcessEditCellProps,
  ref: React.RefObject<RefObject>
) {
  const { value } = params.props;

  // If order is below 0, above row length, or null: reject
  const hasError = value < 1 || value > rows.length || value === null;

  if (hasError) {
    handleError(ref, "Error: Order out of bounds");
  }

  return { ...params.props, error: hasError };
}

/**
 * Handles processing of old and new row for when edited
 * @param setRows - Set function for rows state
 * @param patchMutation - Mutation for patch request
 * @param newRow - The row after update
 * @param oldRow - The row before update
 * @returns
 */
export async function processRowUpdate(
  setRows: React.Dispatch<React.SetStateAction<GridRowModel[]>>,
  patchMutation: UseMutationResult,
  newRow: GridRowModel,
  oldRow: GridRowModel
) {
  // If row has not changed
  if (JSON.stringify(newRow) === JSON.stringify(oldRow)) {
    // Keep internal state
    return oldRow;
  }

  // Mutate may throw error
  try {
    // Mutate new row to API
    await patchMutation.mutateAsync(newRow);

    // Update row state with new row
    updateRow(setRows, newRow, oldRow);

    // Update internal state
    return newRow;
  } catch (error) {
    // Keep internal state
    return oldRow;
  }
}

/**
 * Handles adding of row to grid
 * @param setRows - Set function for rows state
 * @param addMutation - Mutation for ADD request
 * @param templateResponse - Result of template query
 * @param ref - Reference to error popup
 */
export function handleAdd(
  setRows: React.Dispatch<React.SetStateAction<GridRowModel[]>>,
  addMutation: UseMutationResult,
  templateResponse?: UseQueryResult<TemplateAPP[], unknown>,
  ref?: React.RefObject<RefObject>
) {
  addMutation.mutate(undefined, {
    onSuccess: (addedRow: GridRowModel) => {
      addRow(setRows, addedRow);
      if (templateResponse) templateResponse.refetch();
    },
    onError: () => {
      if (ref) handleError(ref, "Error: Unable to add row");
    },
  });
}

/**
 * Handles deletion of row from grid
 * @param setRows - Set function for rows state
 * @param deleteMutation - Mutation for DELETE request
 * @param rowId - ID of the row that should be deleted
 * @param templateResponse - Result of template query
 * @param ref - Reference to error popup
 */
export function handleDelete(
  setRows: React.Dispatch<React.SetStateAction<GridRowModel[]>>,
  deleteMutation: UseMutationResult,
  rowId: number,
  templateResponse?: UseQueryResult<TemplateAPP[], unknown>,
  ref?: React.RefObject<RefObject>
) {
  deleteMutation.mutate(rowId, {
    onSuccess: (deletedRow: GridRowModel) => {
      deleteRow(setRows, deletedRow);
      if (templateResponse) templateResponse.refetch();
    },
    onError: () => {
      if (ref) handleError(ref, "Error: Unable to delete row");
    },
  });
}

/**
 * Handles duplication of row in grid
 * @param setRows - Set function for rows state
 * @param duplicateMutation - Mutation for DELETE request
 * @param row - The row that should be deleted
 * @param templateResponse - Result of template query
 * @param ref - Reference to error popup
 */
export function handleDuplicate(
  setRows: React.Dispatch<React.SetStateAction<GridRowModel[]>>,
  duplicateMutation: UseMutationResult,
  row: GridRowModel,
  templateResponse?: UseQueryResult<TemplateAPP[], unknown>,
  ref?: React.RefObject<RefObject>
) {
  duplicateMutation.mutate(row, {
    onSuccess: (duplicatedRow: GridRowModel) => {
      addRow(setRows, duplicatedRow);
      if (templateResponse) templateResponse.refetch();
    },
    onError: () => {
      if (ref) handleError(ref, "Error: Unable to duplicate row");
    },
  });
}

/**
 * Handles change of row in grid
 * @param setRows - Set function for rows state
 * @param patchMutation - Mutation for PATCH request
 * @param newRow - The row after change
 * @param oldRow - The row before change
 * @param ref - Reference to error popup
 */
export function handleChange(
  setRows: React.Dispatch<React.SetStateAction<GridRowModel[]>>,
  patchMutation: UseMutationResult,
  newRow: GridRowModel,
  oldRow: GridRowModel,
  ref?: React.RefObject<RefObject>
) {
  patchMutation.mutate(newRow, {
    onSuccess: (changedRow: GridRowModel) => {
      updateRow(setRows, changedRow, oldRow);
    },
    onError: () => {
      if (ref) handleError(ref, "Error: Unable to save the changes");
    },
  });
}

/**
 * Handles moving of row to new position
 * @param setRows - Set function for rows state
 * @param patchMutation - Mutation for PATCH request
 * @param row - The row that should be moved
 * @param ref - Reference to error popup
 */
export function handleMove(
  setRows: React.Dispatch<React.SetStateAction<GridRowModel[]>>,
  patchMutation: UseMutationResult,
  row: GridRowModel,
  ref?: React.RefObject<RefObject>
) {
  patchMutation.mutate(row, {
    onSuccess: (movedRow: GridRowModel) => {
      moveRow(setRows, movedRow, movedRow.order);
    },
    onError: () => {
      if (ref) handleError(ref, "Error: Unable to move row");
    },
  });
}
