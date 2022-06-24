import { useQuery, useMutation } from "react-query";
import { GridRowId } from "@mui/x-data-grid";

import API from "./_API";

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
  disabled: boolean;
};

function checkpointToAPP(checkpointAPI: Checkpoint) {
  return {
    id: checkpointAPI.checkpoint_id,
    description: checkpointAPI.checkpoint_description,
    additionalInfo: checkpointAPI.checkpoint_additional_information,
    weight: checkpointAPI.checkpoint_description,
    order: checkpointAPI.order,
    categoryId: checkpointAPI.category_id,
    maturityId: checkpointAPI.maturity_id,
    enabled: !checkpointAPI.disabled,
  } as CheckpointRow;
}

function checkpointToAPI(checkpointAPP: CheckpointRow) {
  return {
    checkpoint_id: checkpointAPP.id,
    checkpoint_description: checkpointAPP.description,
    checkpoint_additional_information: checkpointAPP.additionalInfo,
    weight: checkpointAPP.weight,
    order: checkpointAPP.order,
    category_id: checkpointAPP.categoryId,
    maturity_id: checkpointAPP.maturityId,
    disabled: !checkpointAPP.enabled,
  } as Checkpoint;
}

// Get all checkpoints from database
export function useGetCheckpoints(categoryId: number) {
  return useQuery(["GET", "/category", categoryId, "/checkpoint"], async () => {
    // Get response data from database
    const { data } = await API.get(`/category/${categoryId}/checkpoint`);

    // Convert data to checkpointsAPP
    const checkpointsAPP = data.map((checkpointAPI: Checkpoint) =>
      checkpointToAPP(checkpointAPI)
    );

    return checkpointsAPP as CheckpointRow[];
  });
}

// Post checkpoint to database
export function usePostCheckpoint(categoryId: number) {
  return useMutation(
    ["POST", "/category", categoryId, "/checkpoint"],
    async () => {
      // Get response data from database
      const { data } = await API.post(`/category/${categoryId}/checkpoint`);

      // Convert data to checkpointAPP
      return checkpointToAPP(data) as CheckpointRow;
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

      return checkpointToAPP(data) as CheckpointRow;
    }
  );
}

// Patch checkpoint in database
export function usePatchCheckpoint() {
  return useMutation(
    ["PATCH", "/checkpoint", "/{checkpoint_id}"],
    async (checkpointAPP: CheckpointRow) => {
      // Convert checkpointAPP to checkpoint
      const checkpointAPI = checkpointToAPI(checkpointAPP);

      // Get response data from database
      const { data } = await API.patch(
        `/checkpoint/${checkpointAPI.checkpoint_id}`,
        checkpointAPI
      );

      // Convert data to checkpointAPP
      return checkpointToAPP(data) as CheckpointRow;
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

      // Convert data to checkpointAPP
      return checkpointToAPP(data) as CheckpointRow;
    }
  );
}
