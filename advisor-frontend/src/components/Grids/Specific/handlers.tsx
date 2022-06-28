import * as React from "react";
import { UseMutationResult, UseQueryResult } from "react-query";

import { GridPreProcessEditCellProps, GridRowModel } from "@mui/x-data-grid";

import { initRows, addRow, deleteRow, updateRow, moveRow } from "./helpers";
import { RefObject, handleError } from "../../ErrorPopup/ErrorPopup";
import { TemplateAPP } from "../../../api/TemplateAPI";

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
  data: GridRowModel[] | undefined
) {
  if (status === "success") {
    if (data) {
      initRows(setRows, data);
    }
  }
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
    // Keep internal state
    return oldRow;
  }
}

export function handleMove(
  setRows: React.Dispatch<React.SetStateAction<GridRowModel[]>>,
  patchMutation: UseMutationResult,
  row: GridRowModel
) {
  patchMutation.mutate(row, {
    onSuccess: (movedRow: GridRowModel) => {
      moveRow(setRows, movedRow, movedRow.order);
    },
  });
}

export function handleAdd(
  setRows: React.Dispatch<React.SetStateAction<GridRowModel[]>>,
  addMutation: UseMutationResult,
  templateResponse: UseQueryResult<TemplateAPP[], unknown>
) {
  addMutation.mutate(undefined, {
    onSuccess: (addedRow: GridRowModel) => {
      addRow(setRows, addedRow);
      templateResponse.refetch();
    },
  });
}

export function handleDelete(
  setRows: React.Dispatch<React.SetStateAction<GridRowModel[]>>,
  deleteMutation: UseMutationResult,
  rowId: number,
  templateResponse: UseQueryResult<TemplateAPP[], unknown>
) {
  deleteMutation.mutate(rowId, {
    onSuccess: (deletedRow: GridRowModel) => {
      deleteRow(setRows, deletedRow);
      templateResponse.refetch();
    },
  });
}

export function handleDuplicate(
  setRows: React.Dispatch<React.SetStateAction<GridRowModel[]>>,
  duplicateMutation: UseMutationResult,
  row: GridRowModel
) {
  duplicateMutation.mutate(row, {
    onSuccess: (duplicatedRow: GridRowModel) => {
      addRow(setRows, duplicatedRow);
    },
  });
}

export function handleChange(
  setRows: React.Dispatch<React.SetStateAction<GridRowModel[]>>,
  patchMutation: UseMutationResult,
  newRow: GridRowModel,
  oldRow: GridRowModel
) {
  patchMutation.mutate(newRow, {
    onSuccess: (changedRow: GridRowModel) => {
      updateRow(setRows, changedRow, oldRow);
    },
  });
}
