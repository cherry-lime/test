import * as React from "react";
import { UseMutationResult } from "react-query";

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
import { handleAdd, handleInit } from "../../handlersNew";

import {
  AssessmentRow,
  useGetMyIndividualAssessments,
  useGetMyTeamAssessments,
  usePostAssessment,
} from "../AssessmentAPI";

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
  const [rows, setRows] = React.useState<AssessmentRow[]>([]);

  // Assessment query
  const { status, data, error } =
    assessmentType === "TEAM" && teamId !== undefined
      ? useGetMyTeamAssessments(false, teamId)
      : useGetMyIndividualAssessments(false);

  // Assessment mutation
  const postAssessment =
    assessmentType === "TEAM" && teamId !== undefined
      ? usePostAssessment(assessmentType, teamId)
      : usePostAssessment(assessmentType);

  // Called when "status" of assessments query is changed
  React.useEffect(() => {
    handleInit(setRows, status, data, error);
  }, [status]);

  // Called when the "Visit" action is pressed
  const handleVisit = React.useCallback(
    (rowId: GridRowId) => () => {
      // TODO Replace this by correct link
      window.location.href = `http://google.com/search?q=${rowId}`;
    },
    []
  );

  // Called when the "Add" button is pressed below the grid
  const handleAddDecorator = React.useCallback(() => {
    handleAdd(setRows, postAssessment as UseMutationResult);
  }, []);

  const columns = React.useMemo<GridColumns<AssessmentRow>>(
    () => [
      {
        field: "createdAt",
        headerName: "Created",
        type: "dateTime",
        flex: 1,
        valueFormatter: (params: GridValueFormatterParams<string>) =>
          `${new Date(params.value)}`,
      },
      {
        field: "updatedAt",
        headerName: "Updated",
        type: "dateTime",
        flex: 1,
        valueFormatter: (params: GridValueFormatterParams<string>) =>
          `${new Date(params.value)}`,
      },
      ...(userRole === "USER" && assessmentType === "TEAM"
        ? []
        : [
            {
              field: "actions",
              type: "actions",
              width: 150,
              getActions: (params: { id: GridRowId }) => [
                <Button variant="contained" onClick={handleVisit(params.id)}>
                  <strong>Continue</strong>
                </Button>,
              ],
            },
          ]),
    ],
    [handleVisit]
  );

  return (
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
  );
}
