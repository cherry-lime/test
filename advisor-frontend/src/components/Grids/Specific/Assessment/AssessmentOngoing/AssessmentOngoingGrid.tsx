import * as React from "react";

import { GridColumns, GridRowId } from "@mui/x-data-grid";
import { Theme } from "@mui/material/styles";
import { Button } from "@mui/material";

import GenericGrid from "../../../Generic/GenericGrid";

import { UserRole } from "../../../../../types/UserRole";
import { AssessmentType } from "../../../../../types/AssessmentType";
import { handleAdd } from "../../handlers";

// Define type for the rows in the grid
type Row = {
  id: number;
  createdDate: Date;
  updatedDate: Date;
};

// Get row object with default values
const getDefaultRow = () => {
  const defaultRow = {
    id: Date.now(),
    createdDate: new Date(),
    updatedDate: new Date(),
  };
  return defaultRow;
};

type MemberGridProps = {
  theme: Theme;
  userId: number;
  userRole: UserRole;
  // eslint-disable-next-line react/require-default-props
  teamId?: number;
  assessmentType: AssessmentType;
};

export default function AssessmentOngoingGrid({
  theme,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  userId,
  userRole,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  teamId,
  assessmentType,
}: MemberGridProps) {
  const [rows, setRows] = React.useState<Row[]>([getDefaultRow()]);

  // Fetch initial rows of the grid
  React.useEffect(() => {
    // TODO Replace this by API fetch
  }, []);

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
    handleAdd(setRows, getDefaultRow());
  }, [rows]);

  const columns = React.useMemo<GridColumns<Row>>(
    () => [
      {
        field: "createdDate",
        headerName: "Created",
        type: "dateTime",
        flex: 1,
      },
      {
        field: "updatedDate",
        headerName: "Updated",
        type: "dateTime",
        flex: 1,
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
      sortModel={[{ field: "updatedDate", sort: "desc" }]}
    />
  );
}
