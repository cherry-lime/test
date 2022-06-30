import { useQuery, useMutation } from "react-query";
import { GridRowId } from "@mui/x-data-grid";

import API from "../_API";
import { handleError, RefObject } from "../../components/ErrorPopup/ErrorPopup";

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
  disabled: boolean;
  template_id: number;
};

export function categoryToAPP(categoryAPI: CategoryAPI) {
  return {
    id: categoryAPI.category_id,
    name: categoryAPI.category_name,
    color: categoryAPI.color,
    order: categoryAPI.order,
    enabled: !categoryAPI.disabled,
    templateId: categoryAPI.template_id,
  } as CategoryAPP;
}

export function categoryToAPI(categoryAPP: CategoryAPP) {
  return {
    category_id: categoryAPP.id,
    category_name: categoryAPP.name,
    color: categoryAPP.color,
    order: categoryAPP.order,
    template_id: categoryAPP.templateId,
    disabled: !categoryAPP.enabled,
  } as CategoryAPI;
}

// Get all categories from database
export function useGetCategories(
  templateId: number,
  enabledFilter?: boolean,
  ref?: React.RefObject<RefObject>
) {
  return useQuery(
    ["GET", "/template", templateId, "/category", enabledFilter],
    async () => {
      // Get response data from database
      const { data } = await API.get(`/template/${templateId}/category`);

      // Convert data to csategoriesAPP
      const categoriesAPP = data.map((categoryAPI: CategoryAPI) =>
        categoryToAPP(categoryAPI)
      );

      // If defined, filter on enabled/disabled
      if (enabledFilter !== undefined) {
        const categoriesFilteredAPP = categoriesAPP.filter(
          (categoryAPP: CategoryAPP) => categoryAPP.enabled === enabledFilter
        );

        return categoriesFilteredAPP as CategoryAPP[];
      }

      return categoriesAPP as CategoryAPP[];
    },
    {
      onError: (error) => {
        if (ref) {
          handleError(ref, error);
        }
      },
      enabled: !!templateId,
    }
  );
}

// Get category with id from database
export function useGetCategory(
  categoryId: number,
  ref?: React.RefObject<RefObject>
) {
  return useQuery(
    ["GET", "/category", "/{category_id}"],
    async () => {
      // Get data from database
      const { data } = await API.get(`/category/${categoryId}`);

      return categoryToAPP(data) as CategoryAPP;
    },
    {
      onError: (error) => {
        if (ref) {
          handleError(ref, error);
        }
      },
      enabled: !!categoryId,
    }
  );
}

// Post category to database
export function usePostCategory(
  templateId: number,
  ref?: React.RefObject<RefObject>
) {
  return useMutation(
    ["POST", "/template", templateId, "/category"],
    async () => {
      // Get response data from database
      const { data } = await API.post(`/template/${templateId}/category`);

      // Convert data to categoryAPP
      return categoryToAPP(data) as CategoryAPP;
    },
    {
      onError: (error) => {
        if (ref) {
          handleError(ref, error);
        }
      },
    }
  );
}

// Patch category in database
export function usePatchCategory(ref?: React.RefObject<RefObject>) {
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
    },
    {
      onError: (error) => {
        if (ref) {
          handleError(ref, error);
        }
      },
    }
  );
}

// Delete category from database
export function useDeleteCategory(ref?: React.RefObject<RefObject>) {
  return useMutation(
    ["DELETE", "/category", "/{category_id}"],
    async (categoryId: number) => {
      // Get response data from database
      const { data } = await API.delete(`/category/${categoryId}`);

      // Convert data to categoryAPP
      return categoryToAPP(data) as CategoryAPP;
    },
    {
      onError: (error) => {
        if (ref) {
          handleError(ref, error);
        }
      },
    }
  );
}
