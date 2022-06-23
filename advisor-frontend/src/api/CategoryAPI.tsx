import { useQuery, useMutation } from "react-query";
import { GridRowId } from "@mui/x-data-grid";

import API from "../API";

export type CategoryRow = {
  id: GridRowId;
  name: string;
  color: string;
  order: number;
  enabled: boolean;
  templateId: number;
};

type Category = {
  category_id: number;
  category_name: string;
  color: string;
  order: number;
  enabled: boolean;
  template_id: number;
};

function toRow(category: Category) {
  return {
    id: category.category_id,
    name: category.category_name,
    color: category.color,
    order: category.order,
    enabled: true,
    templateId: category.template_id,
  } as CategoryRow;
}

function fromRow(row: CategoryRow) {
  return {
    category_id: row.id,
    category_name: row.name,
    color: row.color,
    order: row.order,
    template_id: row.templateId,
  } as Category;
}

// Get all categories from database
export function useGetCategories(templateId: number) {
  return useQuery(["GET", "/template", templateId, "/category"], async () => {
    // Get response data from database
    const { data } = await API.get(`/template/${templateId}/category`);

    // Convert data to rows
    const rows = data.map((category: Category) => toRow(category));

    return rows as CategoryRow[];
  });
}

// Post category to database
export function usePostCategory(templateId: number) {
  return useMutation(
    ["POST", "/template", templateId, "/category"],
    async () => {
      // Get response data from database
      const { data } = await API.post(`/template/${templateId}/category`);

      // Convert data to row
      return toRow(data);
    }
  );
}

// Get category with id from database
export function useGetCategory() {
  return useQuery(
    ["GET", "/category", "/{category_id}"],
    async (categoryId) => {
      // Get data from database
      const { data } = await API.get(`/category/${categoryId}`);

      return toRow(data) as CategoryRow;
    }
  );
}

// Patch category in database
export function usePatchCategory() {
  return useMutation(
    ["PATCH", "/category", "/{category_id}"],
    async (row: CategoryRow) => {
      // Convert row to template
      const category = fromRow(row);

      // Get response data from database
      const { data } = await API.patch(
        `/category/${category.category_id}`,
        category
      );

      // Convert data to row
      return toRow(data);
    }
  );
}

// Delete category from database
export function useDeleteCategory() {
  return useMutation(
    ["DELETE", "/category", "/{category_id}"],
    async (categoryId: number) => {
      // Get response data from database
      const { data } = await API.delete(`/category/${categoryId}`);

      // Convert data to row
      return toRow(data);
    }
  );
}
