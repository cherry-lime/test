import * as React from "react";
import { UseMutationResult } from "react-query";

import { GridPreProcessEditCellProps, GridRowModel } from "@mui/x-data-grid";

import { initRows, addRow, deleteRow, updateRow, moveRow } from "./helpers";
import { RefObject, handleError } from "../../ErrorPopup/ErrorPopup";

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

export function handleInit(
  setRows: React.Dispatch<React.SetStateAction<GridRowModel[]>>,
  status: "error" | "idle" | "loading" | "success",
  data: GridRowModel[] | undefined,
  error: unknown,
  ref: React.RefObject<RefObject>
) {
  switch (status) {
    case "error":
      handleError(ref, error);
      break;
    case "success":
      if (data) {
        initRows(setRows, data);
      }
      break;
    default:
      break;
  }
}

export async function processRowUpdate(
  setRows: React.Dispatch<React.SetStateAction<GridRowModel[]>>,
  patchMutation: UseMutationResult,
  newRow: GridRowModel,
  oldRow: GridRowModel,
  ref: React.RefObject<RefObject>
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
    handleError(ref, error);

    // Keep internal state
    return oldRow;
  }
}

export function handleMove(
  setRows: React.Dispatch<React.SetStateAction<GridRowModel[]>>,
  patchMutation: UseMutationResult,
  row: GridRowModel,
  ref: React.RefObject<RefObject>
) {
  patchMutation.mutate(row, {
    onSuccess: (movedRow: GridRowModel) => {
      moveRow(setRows, movedRow, movedRow.order);
    },
    onError: (error: unknown) => {
      handleError(ref, error);
    },
  });
}

export function handleAdd(
  setRows: React.Dispatch<React.SetStateAction<GridRowModel[]>>,
  addMutation: UseMutationResult,
  ref: React.RefObject<RefObject>
) {
  addMutation.mutate(undefined, {
    onSuccess: (addedRow: GridRowModel) => {
      addRow(setRows, addedRow);
    },
    onError: (error: unknown) => {
      handleError(ref, error);
    },
  });
}

export function handleDelete(
  setRows: React.Dispatch<React.SetStateAction<GridRowModel[]>>,
  deleteMutation: UseMutationResult,
  rowId: number,
  ref: React.RefObject<RefObject>
) {
  deleteMutation.mutate(rowId, {
    onSuccess: (deletedRow: GridRowModel) => {
      deleteRow(setRows, deletedRow);
    },
    onError: (error: unknown) => {
      handleError(ref, error);
    },
  });
}

export function handleDuplicate(
  setRows: React.Dispatch<React.SetStateAction<GridRowModel[]>>,
  duplicateMutation: UseMutationResult,
  row: GridRowModel,
  ref: React.RefObject<RefObject>
) {
  duplicateMutation.mutate(row, {
    onSuccess: (duplicatedRow: GridRowModel) => {
      addRow(setRows, duplicatedRow);
    },
    onError: (error: unknown) => {
      handleError(ref, error);
    },
  });
}

export function handleChange(
  setRows: React.Dispatch<React.SetStateAction<GridRowModel[]>>,
  patchMutation: UseMutationResult,
  newRow: GridRowModel,
  oldRow: GridRowModel,
  ref: React.RefObject<RefObject>
) {
  patchMutation.mutate(newRow, {
    onSuccess: (changedRow: GridRowModel) => {
      updateRow(setRows, changedRow, oldRow);
    },
    onError: (error: unknown) => {
      handleError(ref, error);
    },
  });
}
