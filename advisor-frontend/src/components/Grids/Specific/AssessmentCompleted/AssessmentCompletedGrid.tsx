import * as React from "react";

import { GridColumns, GridRowId } from "@mui/x-data-grid";
import { Theme } from "@mui/material/styles";
import { Button } from "@mui/material";

import GenericGrid from "../../Generic/GenericGrid";

import { UserRole } from "../../../../types/UserRole";
import { AssessmentType } from "../../../../types/AssessmentType";

// Define type for the rows in the grid
type Row = {
  id: number;
  createdDate: Date;
  completedDate: Date;
};

type MemberGridProps = {
  theme: Theme;
  userId: number;
  userRole: UserRole;
  // eslint-disable-next-line react/require-default-props
  teamId?: number;
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

  // Called when the "Visit" action is pressed
  const handleVisit = React.useCallback(
    (rowId: GridRowId) => () => {
      // TODO Replace this by correct link
      window.location.href = `http://google.com/search?q=${rowId}`;
    },
    []
  );

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
          <Button variant="outlined" onClick={handleVisit(params.id)}>
            <strong>Review</strong>
          </Button>,
        ],
      },
    ],
    [handleVisit]
  );

  return <GenericGrid theme={theme} rows={rows} columns={columns} hasToolbar />;
}
