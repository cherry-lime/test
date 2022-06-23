import { useQuery, useMutation } from "react-query";
import { GridRowId } from "@mui/x-data-grid";

import API from "../../../../API";

export type CheckpointRow = {
  id: GridRowId;
  description: string;
  additionalInfo: number;
  weight: string;
  order: string;
  categoryId: number;
  maturityId: number;
  enabled: boolean;
};

type Checkpoint = {
  checkpoint_id: number;
  checkpoint_description: string;
  checkpoint_additional_information: number;
  weight: string;
  order: string;
  maturity_id: number;
  category_id: number;
};

function toRow(checkpoint: Checkpoint) {
  return {
    id: checkpoint.checkpoint_id,
    description: checkpoint.checkpoint_description,
    additionalInfo: checkpoint.checkpoint_additional_information,
    weight: checkpoint.checkpoint_description,
    order: checkpoint.order,
    categoryId: checkpoint.category_id,
    maturityId: checkpoint.maturity_id,
    enabled: true,
  } as CheckpointRow;
}

function fromRow(row: CheckpointRow) {
  return {
    checkpoint_id: row.id,
    checkpoint_description: row.description,
    checkpoint_additional_information: row.additionalInfo,
    weight: row.weight,
    order: row.order,
    category_id: row.categoryId,
    maturity_id: row.maturityId,
  } as Checkpoint;
}

// Get all checkpoints from database
export function useGetCheckpoints(categoryId: number) {
  return useQuery(["GET", "/category", categoryId, "/checkpoint"], async () => {
    // Get response data from database
    const { data } = await API.get(`/category/${categoryId}/checkpoint`);

    // Convert data to rows
    const rows = data.map((checkpoint: Checkpoint) => toRow(checkpoint));

    return rows as CheckpointRow[];
  });
}

// Post checkpoint to database
export function usePostCheckpoint(categoryId: number) {
  return useMutation(
    ["POST", "/category", categoryId, "/checkpoint"],
    async () => {
      // Get response data from database
      const { data } = await API.post(`/category/${categoryId}/checkpoint`);

      // Convert data to row
      return toRow(data);
    }
  );
}

// Get checkpoint with id from database
export function useGetCheckpoint() {
  return useQuery(
    ["GET", "/checkpoint", "/{checkpoint_id}"],
    async (checkpointId) => {
      // Get data from database
      const { data } = await API.get(`/checkpoint/${checkpointId}`);

      return toRow(data) as CheckpointRow;
    }
  );
}

// Patch checkpoint in database
export function usePatchCheckpoint() {
  return useMutation(
    ["PATCH", "/checkpoint", "/{checkpoint_id}"],
    async (row: CheckpointRow) => {
      // Convert row to checkpoint
      const checkpoint = fromRow(row);

      // Get response data from database
      const { data } = await API.patch(
        `/checkpoint/${checkpoint.checkpoint_id}`,
        checkpoint
      );

      // Convert data to row
      return toRow(data);
    }
  );
}

// Delete checkpoint from database
export function useDeleteCheckpoint() {
  return useMutation(
    ["DELETE", "/checkpoint", "/{checkpoint_id}"],
    async (checkpointId: number) => {
      // Get response data from database
      const { data } = await API.delete(`/checkpoint/${checkpointId}`);

      // Convert data to row
      return toRow(data);
    }
  );
}
