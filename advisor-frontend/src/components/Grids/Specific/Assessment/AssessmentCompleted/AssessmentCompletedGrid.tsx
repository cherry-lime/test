import * as React from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  GridColumns,
  GridRowId,
  GridValueFormatterParams,
} from "@mui/x-data-grid";
import { Theme } from "@mui/material/styles";
import { Button } from "@mui/material";

import GenericGrid from "../../../Generic/GenericGrid";

import { AssessmentType } from "../../../../../types/AssessmentType";

import { handleInit } from "../../handlers";

import {
  AssessmentAPP,
  useGetMyIndividualAssessments,
  useGetMyTeamAssessments,
} from "../../../../../api/AssessmentAPI";

import ErrorPopup, { RefObject } from "../../../../ErrorPopup/ErrorPopup";

type AssessmentCompletedGridProps = {
  theme: Theme;
  // eslint-disable-next-line react/require-default-props
  teamId?: number;
  assessmentType: AssessmentType;
};

export default function AssessmentCompletedGrid({
  theme,
  teamId,
  assessmentType,
}: AssessmentCompletedGridProps) {
  const [rows, setRows] = React.useState<AssessmentAPP[]>([]);

  // Ref for error popup
  const ref = React.useRef<RefObject>(null);
  const navigate = useNavigate();

  // Assessment query
  const { status, data } =
    assessmentType === "TEAM" && teamId !== undefined
      ? useGetMyTeamAssessments(true, teamId, ref)
      : useGetMyIndividualAssessments(true, ref);

  const handleReview = (id: number) => {
    navigate(
      assessmentType === "INDIVIDUAL"
        ? `/user/self_evaluations/feedback/${id}`
        : `/teams/${teamId}/feedback/${id}`
    );
  };

  // Called when "status" of assessments query is changed
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
        field: "actions",
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
      <ErrorPopup ref={ref} />
    </>
  );
}
