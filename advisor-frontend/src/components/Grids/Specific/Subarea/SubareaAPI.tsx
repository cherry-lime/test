import { useQuery, useMutation } from "react-query";
import { GridRowId } from "@mui/x-data-grid";

import API from "../../../../API";

export type SubareaRow = {
  id: GridRowId;
  name: string;
  order: number;
  description: string;
  summary: string;
  categoryId: number;
  enabled: boolean;
};

type Subarea = {
  subarea_id: number;
  subarea_name: string;
  subarea_order: number;
  subarea_description: string;
  subarea_summary: string;
  category_id: number;
};

function toRow(subarea: Subarea) {
  return {
    id: subarea.subarea_id,
    name: subarea.subarea_name,
    order: subarea.subarea_order,
    description: subarea.subarea_description,
    summary: subarea.subarea_summary,
    categoryId: subarea.category_id,
    enabled: true,
  } as SubareaRow;
}

function fromRow(row: SubareaRow) {
  return {
    subarea_id: row.id,
    subarea_name: row.name,
    subarea_order: row.order,
    subarea_description: row.description,
    subarea_summary: row.summary,
    category_id: row.categoryId,
  } as Subarea;
}

// Get all subareas from database
export function useGetSubareas(categoryId: number) {
  return useQuery(["GET", "/category", categoryId, "/subarea"], async () => {
    // Get response data from database
    const { data } = await API.get(`/category/${categoryId}/subarea`);

    // Convert data to rows
    const rows = data.map((subarea: Subarea) => toRow(subarea));

    return rows as SubareaRow[];
  });
}

// Post subarea to database
export function usePostSubarea(categoryId: number) {
  return useMutation(
    ["POST", "/category", categoryId, "/subarea"],
    async () => {
      // Get response data from database
      const { data } = await API.post(`/category/${categoryId}/subarea`);

      // Convert data to row
      return toRow(data);
    }
  );
}

// Get subarea with id from database
export function useGetSubarea() {
  return useQuery(["GET", "/subarea", "/{subarea_id}"], async (subareaId) => {
    // Get data from database
    const { data } = await API.get(`/subarea/${subareaId}`);

    return data as Subarea;
  });
}

// Patch subarea in database
export function usePatchSubarea() {
  return useMutation(
    ["PATCH", "/subarea", "/{subarea_id}"],
    async (row: SubareaRow) => {
      // Convert row to category
      const subarea = fromRow(row);

      // Get response data from database
      const { data } = await API.patch(
        `/subarea/${subarea.subarea_id}`,
        subarea
      );

      // Convert data to row
      return toRow(data);
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

      // Convert data to row
      return toRow(data);
    }
  );
}
