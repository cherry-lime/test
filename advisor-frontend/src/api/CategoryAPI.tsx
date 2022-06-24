import { useQuery, useMutation } from "react-query";
import { GridRowId } from "@mui/x-data-grid";

import API from "./_API";

export type CategoryAPP = {
  id: GridRowId;
  name: string;
  color: string;
  order: number;
  enabled: boolean;
  templateId: number;
};

type CategoryAPI = {
  category_id: number;
  category_name: string;
  color: string;
  order: number;
  enabled: boolean;
  template_id: number;
};

function categoryToAPP(categoryAPI: CategoryAPI) {
  return {
    id: categoryAPI.category_id,
    name: categoryAPI.category_name,
    color: categoryAPI.color,
    order: categoryAPI.order,
    enabled: true,
    templateId: categoryAPI.template_id,
  } as CategoryAPP;
}

function categoryToAPI(categoryAPP: CategoryAPP) {
  return {
    category_id: categoryAPP.id,
    category_name: categoryAPP.name,
    color: categoryAPP.color,
    order: categoryAPP.order,
    template_id: categoryAPP.templateId,
  } as CategoryAPI;
}

// Get all categories from database
export function useGetCategories(templateId: number) {
  return useQuery(["GET", "/template", templateId, "/category"], async () => {
    // Get response data from database
    const { data } = await API.get(`/template/${templateId}/category`);

    // Convert data to categoriesAPP
    const categoriesAPP = data.map((categoryAPI: CategoryAPI) =>
      categoryToAPP(categoryAPI)
    );

    return categoriesAPP as CategoryAPP[];
  });
}

// Post category to database
export function usePostCategory(templateId: number) {
  return useMutation(
    ["POST", "/template", templateId, "/category"],
    async () => {
      // Get response data from database
      const { data } = await API.post(`/template/${templateId}/category`);

      // Convert data to categoryAPP
      return categoryToAPP(data) as CategoryAPP;
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

      return categoryToAPP(data) as CategoryAPP;
    }
  );
}

// Patch category in database
export function usePatchCategory() {
  return useMutation(
    ["PATCH", "/category", "/{category_id}"],
    async (categoryAPP: CategoryAPP) => {
      // Convert categoryAPP to template
      const categoryAPI = categoryToAPI(categoryAPP);

      // Get response data from database
      const { data } = await API.patch(
        `/category/${categoryAPI.category_id}`,
        categoryAPI
      );

      // Convert data to categoryAPP
      return categoryToAPP(data) as CategoryAPP;
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

      // Convert data to categoryAPP
      return categoryToAPP(data) as CategoryAPP;
    }
  );
}
