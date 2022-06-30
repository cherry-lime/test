import { useQuery, useMutation } from "react-query";
import { GridRowId } from "@mui/x-data-grid";

import API from "../_API";
import { handleError, RefObject } from "../../components/ErrorPopup/ErrorPopup";

export type MaturityAPP = {
  id: GridRowId;
  name: string;
  order: number;
  templateId: number;
  enabled: boolean;
};

type MaturityAPI = {
  maturity_id: number;
  maturity_name: string;
  order: number;
  template_id: number;
  disabled: boolean;
};

function MaturityToAPP(maturityAPI: MaturityAPI) {
  return {
    id: maturityAPI.maturity_id,
    name: maturityAPI.maturity_name,
    order: maturityAPI.order,
    templateId: maturityAPI.template_id,
    enabled: !maturityAPI.disabled,
  } as MaturityAPP;
}

function MaturityToAPI(maturityAPP: MaturityAPP) {
  return {
    maturity_id: maturityAPP.id,
    maturity_name: maturityAPP.name,
    order: maturityAPP.order,
    template_id: maturityAPP.templateId,
    disabled: !maturityAPP.enabled,
  } as MaturityAPI;
}

// Get all maturities from database
export function useGetMaturities(
  templateId: number,
  enabledFilter?: boolean,
  ref?: React.RefObject<RefObject>
) {
  return useQuery(
    ["GET", "/template", templateId, "/maturity", enabledFilter],
    async () => {
      // Get response data from database
      const { data } = await API.get(`/template/${templateId}/maturity`);

      // Convert data to maturitiesAPP
      const maturitiesAPP = data.map((maturityAPI: MaturityAPI) =>
        MaturityToAPP(maturityAPI)
      );

      // If defined, filter on enabled/disabled
      if (enabledFilter !== undefined) {
        const maturitiesFilteredAPP = maturitiesAPP.filter(
          (maturityAPP: MaturityAPP) => maturityAPP.enabled === enabledFilter
        );

        return maturitiesFilteredAPP as MaturityAPP[];
      }

      return maturitiesAPP as MaturityAPP[];
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

// Get maturity with id from database
export function useGetMaturity(ref?: React.RefObject<RefObject>) {
  return useQuery(
    ["GET", "/maturity", "/{maturity_id}"],
    async (maturityId) => {
      // Get data from database
      const { data } = await API.get(`/maturity/${maturityId}`);

      // Convert data to maturityAPP
      return MaturityToAPP(data) as MaturityAPP;
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

// Post maturity to database
export function usePostMaturity(
  templateId: number,
  ref?: React.RefObject<RefObject>
) {
  return useMutation(
    ["POST", "/template", templateId, "/maturity"],
    async () => {
      // Get response data from database
      const { data } = await API.post(`/template/${templateId}/maturity`);

      // Convert data to maturityAPP
      return MaturityToAPP(data) as MaturityAPP;
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

// Patch maturity in database
export function usePatchMaturity(ref?: React.RefObject<RefObject>) {
  return useMutation(
    ["PATCH", "/maturity", "/{maturity_id}"],
    async (maturityAPP: MaturityAPP) => {
      // Convert maturityAPP to template
      const maturityAPI = MaturityToAPI(maturityAPP);

      // Get response data from database
      const { data } = await API.patch(
        `/maturity/${maturityAPI.maturity_id}`,
        maturityAPI
      );

      // Convert data to maturityAPP
      return MaturityToAPP(data) as MaturityAPP;
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

// Delete maturity from database
export function useDeleteMaturity(ref?: React.RefObject<RefObject>) {
  return useMutation(
    ["DELETE", "/maturity", "/{maturity_id}"],
    async (maturityId: number) => {
      // Get response data from database
      const { data } = await API.delete(`/maturity/${maturityId}`);

      // Convert data to maturityAPP
      return MaturityToAPP(data) as MaturityAPP;
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
