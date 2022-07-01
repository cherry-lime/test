import * as React from "react";
import { UseMutationResult } from "react-query";
import { useNavigate } from "react-router-dom";

import {
  GridColumns,
  GridRowId,
  GridValueFormatterParams,
} from "@mui/x-data-grid";
import { Theme } from "@mui/material/styles";
import { Button } from "@mui/material";

import GenericGrid from "../../../Generic/GenericGrid";

import { UserRole } from "../../../../../types/UserRole";
import { AssessmentType } from "../../../../../types/AssessmentType";

import { handleAdd, handleInit } from "../../../functions/handlers/handlers";

import {
  AssessmentAPP,
  useGetMyIndividualAssessments,
  useGetMyTeamAssessments,
  usePostAssessment,
} from "../../../../../api/AssessmentAPI/AssessmentAPI";

import ErrorPopup, {
  getOnError,
  RefObject,
} from "../../../../ErrorPopup/ErrorPopup";

type AssessmentOngoingGridProps = {
  theme: Theme;
  userRole: UserRole;
  // eslint-disable-next-line react/require-default-props
  teamId?: number;
  assessmentType: AssessmentType;
};

export default function AssessmentOngoingGrid({
  theme,
  userRole,
  teamId,
  assessmentType,
}: AssessmentOngoingGridProps) {
  const [rows, setRows] = React.useState<AssessmentAPP[]>([]);
  const navigate = useNavigate();

  // Ref for error popup
  const refErrorAssessmentOngoing = React.useRef<RefObject>(null);
  const onErrorAssessmentOngoing = getOnError(refErrorAssessmentOngoing);

  // Assessment query
  const { status, data } =
    assessmentType === "TEAM" && teamId !== undefined
      ? useGetMyTeamAssessments(false, teamId, onErrorAssessmentOngoing)
      : useGetMyIndividualAssessments(false, onErrorAssessmentOngoing);

  // Assessment mutation
  const postAssessment =
    assessmentType === "TEAM" && teamId !== undefined
      ? usePostAssessment(assessmentType, teamId, onErrorAssessmentOngoing)
      : usePostAssessment(assessmentType, undefined, onErrorAssessmentOngoing);

  const handleContinue = (id: number) => {
    navigate(
      assessmentType === "INDIVIDUAL"
        ? `/user/self_evaluations/${id}`
        : `/teams/${teamId}/${id}`
    );
  };

  // Called when "status" of assessments query is changed
  React.useEffect(() => {
    handleInit(setRows, status, data);
  }, [status, data]);

  // Called when the "Add" button is pressed below the grid
  const handleAddDecorator = React.useCallback(() => {
    handleAdd(setRows, postAssessment as UseMutationResult);
  }, []);

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
        field: "updatedAt",
        headerName: "Updated",
        type: "dateTime",
        flex: 1,
        valueFormatter: (params: GridValueFormatterParams<string>) =>
          `${new Date(params.value).toLocaleString()}`,
      },
      ...(userRole === "USER" && assessmentType === "TEAM"
        ? []
        : [
            {
              field: "actions",
              type: "actions",
              width: 150,
              getActions: (params: { id: GridRowId }) => [
                <Button
                  variant="contained"
                  onClick={() => handleContinue(Number(params.id))}
                >
                  <strong>Continue</strong>
                </Button>,
              ],
            },
          ]),
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
        add={
          userRole === "USER" && assessmentType === "TEAM"
            ? undefined
            : {
                text: "START NEW EVALUATION",
                handler: handleAddDecorator,
              }
        }
        sortModel={[{ field: "updatedAt", sort: "desc" }]}
      />
      <ErrorPopup ref={refErrorAssessmentOngoing} />
    </>
  );
}
