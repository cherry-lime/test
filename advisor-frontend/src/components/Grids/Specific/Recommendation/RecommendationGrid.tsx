import * as React from "react";
import { UseMutationResult } from "react-query";

import { GridColumns, GridPreProcessEditCellProps } from "@mui/x-data-grid";
import { Theme } from "@mui/material/styles";
import { IconButton } from "@mui/material";
import UpwardIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import DownwardIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

import GenericGrid from "../../Generic/GenericGrid";

import {
  handleInit,
  handleMove,
  preProcessEditOrder,
  processRowUpdate,
} from "../handlers";

import ErrorPopup, { RefObject } from "../../../ErrorPopup/ErrorPopup";
import {
  RecommendationAPP,
  useGetRecommendations,
  usePatchRecommendation,
} from "../../../../api/RecommendationAPI";

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
  const ref = React.useRef<RefObject>(null);

  // Recommendation query
  const { status, data } = useGetRecommendations(assessmentId, topicId, ref);

  // Recommendation mutation
  const patchRecommendation = usePatchRecommendation(ref);

  // Called when "status" of recommendation query is changed
  React.useEffect(() => {
    handleInit(setRows, status, data);
  }, [status, data]);

  // Called when the 'Order' column is edited
  const preProcessEditOrderDecorator = React.useCallback(
    (params: GridPreProcessEditCellProps) =>
      preProcessEditOrder(rows, params, ref),
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
      handleMove(
        setRows,
        patchRecommendation as UseMutationResult,
        {
          ...row,
          order: row.order - 1,
        },
        ref
      );
    },
    []
  );

  // Called when the "Downward" action is pressed
  const handleDownwardDecorator = React.useCallback(
    (row: RecommendationAPP) => () => {
      handleMove(
        setRows,
        patchRecommendation as UseMutationResult,
        {
          ...row,
          order: row.order + 1,
        },
        ref
      );
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
                <div className="parent">
                  <div className="child">
                    <IconButton onClick={handleUpwardDecorator(params.row)}>
                      <UpwardIcon />
                    </IconButton>
                  </div>
                  <div className="child">
                    <IconButton onClick={handleDownwardDecorator(params.row)}>
                      <DownwardIcon />
                    </IconButton>
                  </div>
                </div>
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
      <ErrorPopup />
    </>
  );
}
