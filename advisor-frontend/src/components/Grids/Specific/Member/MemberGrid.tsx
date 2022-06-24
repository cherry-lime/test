import * as React from "react";
import { UseMutationResult } from "react-query";

import { GridActionsCellItem, GridColumns, GridRowId } from "@mui/x-data-grid";
import { Theme } from "@mui/material/styles";
import { Tooltip } from "@mui/material";
import RemoveIcon from "@mui/icons-material/HighlightOff";

import GenericGrid from "../../Generic/GenericGrid";
import { UserRole } from "../../../../types/UserRole";

import { handleDelete, handleInit } from "../handlersNew";

import {
  useDeleteMemberTeam,
  useGetMembersTeam,
  UserAPP,
} from "../../../../api/UserAPI";

type MemberGridProps = {
  theme: Theme;
  userRole: UserRole;
  teamId: number;
  forAssessors: boolean; // Is the grid for assessors (true) or users (false)
};

export default function MemberGrid({
  theme,
  userRole,
  teamId,
  forAssessors,
}: MemberGridProps) {
  const [rows, setRows] = React.useState<UserAPP[]>([]);

  // Member query
  const { status, data, error } = useGetMembersTeam(teamId);

  // Member mutation
  const deleteMember = useDeleteMemberTeam(teamId);

  // Called when "status" of member query is changed
  React.useEffect(() => {
    handleInit(setRows, status, data, error);
  }, [status]);

  // Called when the "Delete" action is pressed in the menu
  const handleDeleteDecorator = React.useCallback(
    (rowId: GridRowId) => () => {
      handleDelete(setRows, deleteMember as UseMutationResult, rowId as number);
    },
    []
  );

  const columns = React.useMemo<GridColumns<UserAPP>>(
    () => [
      {
        field: "name",
        headerName: forAssessors ? "Assessor Name" : "Member Name",
        type: "string",
        flex: 1,
        editable: userRole === "ASSESSOR",
      },
      ...(userRole === "ASSESSOR"
        ? [
            {
              field: "actions",
              type: "actions",
              width: 100,
              getActions: (params: { id: GridRowId }) => [
                <GridActionsCellItem
                  icon={
                    <Tooltip title="Remove">
                      <RemoveIcon />
                    </Tooltip>
                  }
                  label="Remove"
                  onClick={handleDeleteDecorator(params.id)}
                />,
              ],
            },
          ]
        : []),
    ],
    [handleDeleteDecorator]
  );

  return <GenericGrid theme={theme} rows={rows} columns={columns} hasToolbar />;
}
