import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Theme } from "@mui/material/styles";
import {
  GridColumns,
  GridRowId,
  GridValueFormatterParams,
} from "@mui/x-data-grid";
import { Button } from "@mui/material";
import GenericGrid from "../../../Generic/GenericGrid";
import { AssessmentType } from "../../../../../types/AssessmentType";
import { handleInit } from "../../../functions/handlers/handlers";
import {
  AssessmentAPP,
  useGetMyIndividualAssessments,
  useGetMyTeamAssessments,
} from "../../../../../api/AssessmentAPI/AssessmentAPI";
import ErrorPopup, {
  getOnError,
  RefObject,
} from "../../../../ErrorPopup/ErrorPopup";

type AssessmentCompletedGridProps = {
  theme: Theme;
  // eslint-disable-next-line react/require-default-props
  teamId?: number;
  assessmentType: AssessmentType;
};

/**
 * Grid for completed assessments
 * Uses theme, teamId, and assessmentType
 */
export default function AssessmentCompletedGrid({
  theme,
  teamId,
  assessmentType,
}: AssessmentCompletedGridProps) {
  /**
   * State of the rows
   * State setter of the rows
   */
  const [rows, setRows] = React.useState<AssessmentAPP[]>([]);

  /**
   * Ref for error popup
   * onError function
   */
  const refErrorAssessmentCompleted = React.useRef<RefObject>(null);
  const onErrorAssessmentCompleted = getOnError(refErrorAssessmentCompleted);
  const navigate = useNavigate();

  /**
   * Assessment queries
   * Gets all individual or team assessments
   */
  const { status, data } =
    assessmentType === "TEAM" && teamId !== undefined
      ? useGetMyTeamAssessments(true, teamId, onErrorAssessmentCompleted)
      : useGetMyIndividualAssessments(true, onErrorAssessmentCompleted);

  const handleReview = (id: number) => {
    navigate(
      assessmentType === "INDIVIDUAL"
        ? `/user/self_evaluations/feedback/${id}`
        : `/teams/${teamId}/feedback/${id}`
    );
  };

  /**
   * useEffect for initialization of rows
   * Called when "status" of assessments query is changed
   */
  React.useEffect(() => {
    handleInit(setRows, status, data);
  }, [status, data]);

  const columns = React.useMemo<GridColumns<AssessmentAPP>>(
    () => [
      {
        field: "createdAt",
        headerName: "Created",
        type: "dateTime",
        flex: 1,
        valueFormatter: (params: GridValueFormatterParams<string>) =>
          `${new Date(params.value).toLocaleString()}`,
      },
      {
        field: "completedAt",
        headerName: "Completed",
        type: "dateTime",
        flex: 1,
        valueFormatter: (params: GridValueFormatterParams<string>) =>
          `${new Date(params.value).toLocaleString()}`,
      },
      {
        field: "Actions",
        type: "actions",
        width: 125,
        getActions: (params: { id: GridRowId }) => [
          <Button
            variant="outlined"
            onClick={() => handleReview(Number(params.id))}
          >
            <strong>Review</strong>
          </Button>,
        ],
      },
    ],
    []
  );

  return (
    <>
      <GenericGrid
        theme={theme}
        rows={rows}
        columns={columns}
        hasToolbar
        sortModel={[{ field: "completedAt", sort: "desc" }]}
      />
      <ErrorPopup ref={refErrorAssessmentCompleted} />
    </>
  );
}
