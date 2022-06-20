import * as React from "react";
import { UseMutationResult } from "react-query";

import { GridPreProcessEditCellProps, GridRowModel } from "@mui/x-data-grid";

import { initRows, addRow, deleteRow, updateRow } from "./helpers";

function handleError(error: unknown) {
  console.log(error);
}

export function handleInit(
  setRows: React.Dispatch<React.SetStateAction<GridRowModel[]>>,
  status: "error" | "idle" | "loading" | "success",
  data: GridRowModel[] | undefined,
  error: unknown
) {
  switch (status) {
    case "error":
      handleError(error);
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

export function handleAdd<Context>(
  setRows: React.Dispatch<React.SetStateAction<GridRowModel[]>>,
  addMutation: UseMutationResult,
  context?: Context
) {
  addMutation.mutate(context, {
    onSuccess: (row: GridRowModel) => {
      addRow(setRows, row);
    },
    onError: (error) => {
      handleError(error);
    },
  });
}

export function handleDelete<Context>(
  setRows: React.Dispatch<React.SetStateAction<GridRowModel[]>>,
  deleteMutation: UseMutationResult,
  context: Context
) {
  deleteMutation.mutate(context, {
    onSuccess: (row: GridRowModel) => {
      deleteRow(setRows, row);
    },
    onError: (error) => {
      handleError(error);
    },
  });
}

export function handleDuplicate<Context>(
  setRows: React.Dispatch<React.SetStateAction<GridRowModel[]>>,
  duplicateMutation: UseMutationResult,
  context: Context
) {
  duplicateMutation.mutate(context, {
    onSuccess: (row: GridRowModel) => {
      addRow(setRows, row);
    },
    onError: (error) => {
      handleError(error);
    },
  });
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
    handleError(error);

    // Keep internal state
    return oldRow;
  }
}
