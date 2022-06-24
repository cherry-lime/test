import { useQuery, useMutation } from "react-query";
import { GridRowId } from "@mui/x-data-grid";

import API from "./_API";

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
  maturity_order: number;
  template_id: number;
  disabled: boolean;
};

function MaturityToAPP(maturityAPI: MaturityAPI) {
  return {
    id: maturityAPI.maturity_id,
    name: maturityAPI.maturity_name,
    order: maturityAPI.maturity_order,
    templateId: maturityAPI.template_id,
    enabled: !maturityAPI.disabled,
  } as MaturityAPP;
}

function MaturityToAPI(maturityAPP: MaturityAPP) {
  return {
    maturity_id: maturityAPP.id,
    maturity_name: maturityAPP.name,
    maturity_order: maturityAPP.order,
    template_id: maturityAPP.templateId,
    disabled: !maturityAPP.enabled,
  } as MaturityAPI;
}

// Get all maturities from database
export function useGetMaturities(templateId: number) {
  return useQuery(["GET", "/template", templateId, "/maturity"], async () => {
    // Get response data from database
    const { data } = await API.get(`/template/${templateId}/maturity`);

    // Convert data to maturitiesAPP
    const maturitiesAPP = data.map((maturityAPI: MaturityAPI) =>
      MaturityToAPP(maturityAPI)
    );

    return maturitiesAPP as MaturityAPP[];
  });
}

// Get maturity with id from database
export function useGetMaturity() {
  return useQuery(
    ["GET", "/maturity", "/{maturity_id}"],
    async (maturityId) => {
      // Get data from database
      const { data } = await API.get(`/maturity/${maturityId}`);

      // Convert data to maturityAPP
      return MaturityToAPP(data) as MaturityAPP;
    }
  );
}

// Post maturity to database
export function usePostMaturity(templateId: number) {
  return useMutation(
    ["POST", "/template", templateId, "/maturity"],
    async () => {
      // Get response data from database
      const { data } = await API.post(`/template/${templateId}/maturity`);

      // Convert data to maturityAPP
      return MaturityToAPP(data) as MaturityAPP;
    }
  );
}

// Patch maturity in database
export function usePatchMaturity() {
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
    }
  );
}

// Delete maturity from database
export function useDeleteMaturity() {
  return useMutation(
    ["DELETE", "/maturity", "/{maturity_id}"],
    async (maturityId: number) => {
      // Get response data from database
      const { data } = await API.delete(`/maturity/${maturityId}`);

      // Convert data to maturityAPP
      return MaturityToAPP(data) as MaturityAPP;
    }
  );
}
