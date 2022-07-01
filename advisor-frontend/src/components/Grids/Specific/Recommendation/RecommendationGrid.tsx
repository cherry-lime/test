import * as React from "react";
import { UseMutationResult } from "react-query";

import { GridColumns, GridPreProcessEditCellProps } from "@mui/x-data-grid";
import { Theme } from "@mui/material/styles";

import ErrorPopup, {
  getOnError,
  RefObject,
} from "../../../ErrorPopup/ErrorPopup";

import GenericGrid from "../../Generic/GenericGrid";

import {
  handleInit,
  handleMove,
  preProcessEditOrder,
  processRowUpdate,
} from "../../functions/handlers/handlers";

import {
  RecommendationAPP,
  useGetRecommendations,
  usePatchRecommendation,
} from "../../../../api/RecommendationAPI/RecommendationAPI";
import { RenderEditCell } from "../columns";

type RecommendationGridProps = {
  theme: Theme;
  assessmentId: number;
  topicId: number | undefined;
  isEditable: boolean;
};

export default function RecommendationGrid({
  theme,
  assessmentId,
  topicId,
  isEditable,
}: RecommendationGridProps) {
  const [rows, setRows] = React.useState<RecommendationAPP[]>([]);

  // Ref for error popup
  const refErrorRecommendation = React.useRef<RefObject>(null);
  const onErrorRecommendation = getOnError(refErrorRecommendation);

  // Recommendation query
  const { status, data } = useGetRecommendations(
    assessmentId,
    topicId,
    onErrorRecommendation
  );

  // Recommendation mutation
  const patchRecommendation = usePatchRecommendation(onErrorRecommendation);

  // Called when "status" of recommendation query is changed
  React.useEffect(() => {
    handleInit(setRows, status, data);
  }, [status, data]);

  // Called when the 'Order' column is edited
  const preProcessEditOrderDecorator = React.useCallback(
    (params: GridPreProcessEditCellProps) =>
      preProcessEditOrder(rows, params, onErrorRecommendation),
    [rows]
  );

  // Called when a row is edited
  const processRowUpdateDecorator = React.useCallback(
    async (newRow: RecommendationAPP, oldRow: RecommendationAPP) =>
      processRowUpdate(
        setRows,
        patchRecommendation as UseMutationResult,
        newRow,
        oldRow
      ),
    []
  );

  // Called when the "Upward" action is pressed
  const handleUpwardDecorator = React.useCallback(
    (row: RecommendationAPP) => () => {
      handleMove(setRows, patchRecommendation as UseMutationResult, {
        ...row,
        order: row.order - 1,
      });
    },
    []
  );

  // Called when the "Downward" action is pressed
  const handleDownwardDecorator = React.useCallback(
    (row: RecommendationAPP) => () => {
      handleMove(setRows, patchRecommendation as UseMutationResult, {
        ...row,
        order: row.order + 1,
      });
    },
    []
  );

  const columns = React.useMemo<GridColumns<RecommendationAPP>>(
    () => [
      ...(isEditable
        ? [
            {
              field: "",
              width: 50,
              renderCell: (params: { row: RecommendationAPP }) => (
                <RenderEditCell
                  handleUpward={handleUpwardDecorator(params.row)}
                  handleDownward={handleDownwardDecorator(params.row)}
                />
              ),
            },
          ]
        : []),
      {
        field: "order",
        headerName: "Priority",
        headerAlign: "center",
        align: "center",
        type: "number",
        width: 75,
        editable: isEditable,
        preProcessEditCellProps: preProcessEditOrderDecorator,
      },
      {
        field: "description",
        headerName: "Description",
        type: "string",
        flex: 1,
      },
      {
        field: "additionalInfo",
        headerName: "Additional Information",
        type: "string",
        flex: 1,
        editable: isEditable,
      },
    ],
    [
      handleUpwardDecorator,
      handleDownwardDecorator,
      preProcessEditOrderDecorator,
    ]
  );

  return (
    <>
      <GenericGrid
        theme={theme}
        rows={rows}
        columns={columns}
        processRowUpdate={processRowUpdateDecorator}
        hasToolbar
      />
      <ErrorPopup ref={refErrorRecommendation} />
    </>
  );
}
