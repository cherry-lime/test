import * as React from "react";

import { GridColumns } from "@mui/x-data-grid";
import { Theme } from "@mui/material/styles";

import GenericGrid from "../../Generic/GenericGrid";

import { handleInit } from "../handlers";

import {
  RecommendationAPP,
  useGetFeedbackAssessment,
} from "../../../../api/AssessmentAPI";

type RecommendationGridProps = {
  theme: Theme;
  assessmentId: number;
  topicId: number;
};

export default function RecommendationGrid({
  theme,
  assessmentId,
  topicId,
}: RecommendationGridProps) {
  const [rows, setRows] = React.useState<RecommendationAPP[]>([]);

  // Feedback query
  const { status, data, error } = useGetFeedbackAssessment(
    assessmentId,
    topicId
  );

  // Called when "status" of feedback query is changed
  React.useEffect(() => {
    handleInit(setRows, status, data, error);
  }, [status]);

  const columns = React.useMemo<GridColumns<RecommendationAPP>>(
    () => [
      {
        field: "order",
        headerName: "Priority",
        headerAlign: "center",
        align: "center",
        type: "number",
        width: 75,
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
      },
    ],
    []
  );

  return <GenericGrid theme={theme} rows={rows} columns={columns} hasToolbar />;
}
