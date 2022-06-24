import * as React from "react";
import { Link } from "react-router-dom";

import { GridColumns, GridRowId } from "@mui/x-data-grid";
import { Theme } from "@mui/material/styles";
import { Button } from "@mui/material";

import GenericGrid from "../Generic/GenericGrid";

import { UserRole } from "../../../types/UserRole";
import { AssessmentType } from "../../../types/AssessmentType";

// Define type for the rows in the grid
type Row = {
  id: number;
  createdDate: Date;
  completedDate: Date;
};

type MemberGridProps = {
  theme: Theme;
  userId: string | undefined;
  userRole: UserRole;
  // eslint-disable-next-line react/require-default-props
  teamId?: string | undefined;
  assessmentType: AssessmentType;
};

export default function AssessmentCompletedGrid({
  theme,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  userId,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  userRole,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  teamId,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  assessmentType,
}: MemberGridProps) {
  const [rows, setRows] = React.useState<Row[]>([]);

  // Fetch initial rows of the grid
  React.useEffect(() => {
    // TODO Replace this by API fetch
    setRows(() => [
      { id: 0, createdDate: new Date(), completedDate: new Date() },
    ]);
  }, []);

  const columns = React.useMemo<GridColumns<Row>>(
    () => [
      {
        field: "createdDate",
        headerName: "Created",
        type: "dateTime",
        flex: 1,
      },
      {
        field: "completedDate",
        headerName: "Completed",
        type: "dateTime",
        flex: 1,
      },
      {
        field: "actions",
        type: "actions",
        width: 125,
        getActions: (params: { id: GridRowId }) => [
          <Link
            to={
              assessmentType === "INDIVIDUAL"
                ? `/user/self_evaluations/feedback/${params.id}`
                : `/teams/${teamId}/feedback/${params.id}`
            }
          >
            <Button variant="outlined">
              <strong>Review</strong>
            </Button>
            ,
          </Link>,
        ],
      },
    ],
    []
  );

  return <GenericGrid theme={theme} rows={rows} columns={columns} hasToolbar />;
}
