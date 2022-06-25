import { useQuery, useMutation } from "react-query";
import { GridRowId } from "@mui/x-data-grid";

import API from "./_API";

export type SubareaAPP = {
  id: GridRowId;
  name: string;
  order: number;
  description: string;
  summary: string;
  categoryId: number;
  enabled: boolean;
};

type SubareaAPI = {
  subarea_id: number;
  subarea_name: string;
  subarea_order: number;
  subarea_description: string;
  subarea_summary: string;
  category_id: number;
  disabled: boolean;
};

function subareaToAPP(subareaAPI: SubareaAPI) {
  return {
    id: subareaAPI.subarea_id,
    name: subareaAPI.subarea_name,
    order: subareaAPI.subarea_order,
    description: subareaAPI.subarea_description,
    summary: subareaAPI.subarea_summary,
    categoryId: subareaAPI.category_id,
    enabled: !subareaAPI.disabled,
  } as SubareaAPP;
}

function subareaToAPI(subareaAPP: SubareaAPP) {
  return {
    subarea_id: subareaAPP.id,
    subarea_name: subareaAPP.name,
    subarea_order: subareaAPP.order,
    subarea_description: subareaAPP.description,
    subarea_summary: subareaAPP.summary,
    category_id: subareaAPP.categoryId,
    disabled: !subareaAPP.enabled,
  } as SubareaAPI;
}

// Get all subareas from database
export function useGetSubareas(categoryId: number, enabledFilter?: boolean) {
  return useQuery(
    ["GET", "/category", categoryId, "/subarea", enabledFilter],
    async () => {
      // Get response data from database
      const { data } = await API.get(`/category/${categoryId}/subarea`);

      // Convert data to subareasAPP
      const subareasAPP = data.map((subareaAPI: SubareaAPI) =>
        subareaToAPP(subareaAPI)
      );

      // If defined, filter on enabled/disabled
      if (enabledFilter !== undefined) {
        const subareasFilteredAPP = subareasAPP.filter(
          (subareaAPP: SubareaAPP) => subareaAPP.enabled === enabledFilter
        );

        return subareasFilteredAPP as SubareaAPP[];
      }

      return subareasAPP as SubareaAPP[];
    }
  );
}

// Get subarea with id from database
export function useGetSubarea() {
  return useQuery(["GET", "/subarea", "/{subarea_id}"], async (subareaId) => {
    // Get data from database
    const { data } = await API.get(`/subarea/${subareaId}`);

    // Covert data to subareaAPP
    return subareaToAPP(data) as SubareaAPP;
  });
}

// Post subarea to database
export function usePostSubarea(categoryId: number) {
  return useMutation(
    ["POST", "/category", categoryId, "/subarea"],
    async () => {
      // Get response data from database
      const { data } = await API.post(`/category/${categoryId}/subarea`);

      // Convert data to subareaAPP
      return subareaToAPP(data) as SubareaAPP;
    }
  );
}

// Patch subarea in database
export function usePatchSubarea() {
  return useMutation(
    ["PATCH", "/subarea", "/{subarea_id}"],
    async (subareaAPP: SubareaAPP) => {
      // Convert subareaAPP to subarea
      const subareaAPI = subareaToAPI(subareaAPP);

      // Get response data from database
      const { data } = await API.patch(
        `/subarea/${subareaAPI.subarea_id}`,
        subareaAPI
      );

      // Convert data to subareaAPP
      return subareaToAPP(data) as SubareaAPP;
    }
  );
}

// Delete subarea from database
export function useDeleteSubarea() {
  return useMutation(
    ["DELETE", "/subarea", "/{subarea_id}"],
    async (subareaId: number) => {
      // Get response data from database
      const { data } = await API.delete(`/subarea/${subareaId}`);

      // Convert data to subareaAPP
      return subareaToAPP(data) as SubareaAPP;
    }
  );
}
