import { useQuery, useMutation } from "react-query";
import { GridRowId } from "@mui/x-data-grid";

import API from "../../../../API";

export type MaturityRow = {
  id: GridRowId;
  name: string;
  order: number;
  templateId: number;
  enabled: boolean;
};

type Maturity = {
  maturity_id: number;
  maturity_name: string;
  maturity_order: number;
  template_id: number;
};

function toRow(maturity: Maturity) {
  return {
    id: maturity.maturity_id,
    name: maturity.maturity_name,
    order: maturity.maturity_order,
    templateId: maturity.template_id,
    enabled: true,
  } as MaturityRow;
}

function fromRow(row: MaturityRow) {
  return {
    maturity_id: row.id,
    maturity_name: row.name,
    maturity_order: row.order,
    template_id: row.templateId,
  } as Maturity;
}

// Get all maturities from database
export function useGetMaturities(templateId: number) {
  return useQuery(["GET", "/template", templateId, "/maturity"], async () => {
    // Get response data from database
    const { data } = await API.get(`/template/${templateId}/maturity`);

    // Convert data to rows
    const rows = data.map((maturity: Maturity) => toRow(maturity));

    return rows as MaturityRow[];
  });
}

// Post maturity to database
export function usePostMaturity(templateId: number) {
  return useMutation(
    ["POST", "/template", templateId, "/maturity"],
    async () => {
      // Get response data from database
      const { data } = await API.post(`/template/${templateId}/maturity`);

      // Convert data to row
      return toRow(data);
    }
  );
}

// Get maturity with id from database
export function useGetMaturity() {
  return useQuery(
    ["GET", "/maturity", "/{maturity_id}"],
    async (maturityId) => {
      // Get data from database
      const { data } = await API.get(`/maturity/${maturityId}`);

      return data as Maturity;
    }
  );
}

// Patch maturity in database
export function usePatchMaturity() {
  return useMutation(
    ["PATCH", "/maturity", "/{maturity_id}"],
    async (row: MaturityRow) => {
      // Convert row to template
      const maturity = fromRow(row);

      // Get response data from database
      const { data } = await API.patch(
        `/maturity/${maturity.maturity_id}`,
        maturity
      );

      // Convert data to row
      return toRow(data);
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

      // Convert data to row
      return toRow(data);
    }
  );
}
