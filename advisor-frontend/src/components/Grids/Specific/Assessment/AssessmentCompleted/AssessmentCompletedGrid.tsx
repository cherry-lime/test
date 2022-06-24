import * as React from "react";

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

  // Assessment query
  const { status, data, error } =
    assessmentType === "TEAM" && teamId !== undefined
      ? useGetMyTeamAssessments(true, teamId)
      : useGetMyIndividualAssessments(true);

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
          <Button variant="outlined" onClick={handleVisit(params.id)}>
            <strong>Review</strong>
          </Button>,
        ],
      },
    ],
    [handleVisit]
  );

  return (
    <GenericGrid
      theme={theme}
      rows={rows}
      columns={columns}
      hasToolbar
      sortModel={[{ field: "completedAt", sort: "desc" }]}
    />
  );
}
