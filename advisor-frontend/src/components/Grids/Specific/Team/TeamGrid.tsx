import * as React from "react";
import { UseMutationResult } from "react-query";
import { Link } from "react-router-dom";

import { GridActionsCellItem, GridColumns, GridRowId } from "@mui/x-data-grid";
import { Theme } from "@mui/material/styles";
import { Tooltip } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import RemoveIcon from "@mui/icons-material/HighlightOff";

import GenericGrid from "../../Generic/GenericGrid";

import { UserRole } from "../../../../types/UserRole";

import {
  handleAdd,
  handleDelete,
  handleInit,
  processRowUpdate,
} from "../handlers";

import {
  TeamAPP,
  useDeleteTeam,
  useGetMyTeams,
  usePatchTeam,
  usePostTeam,
} from "../../../../api/TeamAPI";

type TeamGridProps = {
  theme: Theme;
  userRole: UserRole;
};

export default function TeamGrid({ theme, userRole }: TeamGridProps) {
  const [rows, setRows] = React.useState<TeamAPP[]>([]);

  // Team query
  const { status, data, error } = useGetMyTeams();

  // Team mutations
  const patchTeam = usePatchTeam();
  const postTeam = usePostTeam();
  const deleteTeam = useDeleteTeam();

  // Called when "status" of teams query is changed
  React.useEffect(() => {
    handleInit(setRows, status, data, error);
  }, [status]);

  // Called when a row is edited
  const processRowUpdateDecorator = React.useCallback(
    async (newRow: TeamAPP, oldRow: TeamAPP) =>
      processRowUpdate(setRows, patchTeam as UseMutationResult, newRow, oldRow),
    []
  );

  // Called when the "Delete" action is pressed in the menu
  const handleDeleteDecorator = React.useCallback(
    (rowId: GridRowId) => () => {
      handleDelete(setRows, deleteTeam as UseMutationResult, rowId as number);
    },
    []
  );

  // Called when the "Add" button is pressed below the grid
  const handleAddDecorator = React.useCallback(() => {
    handleAdd(setRows, postTeam as UseMutationResult);
  }, []);

  const columns = React.useMemo<GridColumns<TeamAPP>>(
    () => [
      {
        field: "name",
        headerName: "Team Name",
        type: "string",
        flex: 1,
        editable: userRole === "ASSESSOR",
      },
      {
        field: "actions",
        type: "actions",
        width: 100,
        getActions: (params: { id: GridRowId }) => [
          <GridActionsCellItem
            icon={
              <Tooltip title="Visit">
                <Link to={`/teams/${params.id}`}>
                  <ArrowForwardIcon className="arrowIcon" />
                </Link>
              </Tooltip>
            }
            label="Visit"
          />,
          <GridActionsCellItem
            icon={
              <Tooltip title="Leave">
                <RemoveIcon />
              </Tooltip>
            }
            label="Remove"
            onClick={handleDeleteDecorator(params.id)}
          />,
        ],
      },
    ],
    [handleDeleteDecorator]
  );

  return (
    <GenericGrid
      theme={theme}
      rows={rows}
      columns={columns}
      processRowUpdate={processRowUpdateDecorator}
      hasToolbar
      add={
        userRole === "ASSESSOR"
          ? { text: "CREATE NEW TEAM", handler: handleAddDecorator }
          : undefined
      }
    />
  );
}
