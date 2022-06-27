import * as React from "react";
import { UseMutationResult } from "react-query";
import { Link } from "react-router-dom";

import { GridActionsCellItem, GridColumns, GridRowId } from "@mui/x-data-grid";
import { Theme } from "@mui/material/styles";
import { Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import RemoveIcon from "@mui/icons-material/HighlightOff";

import GenericGrid from "../../Generic/GenericGrid";

import { UserRole } from "../../../../types/UserRole";

import ErrorPopup, {
  handleError,
  RefObject,
} from "../../../ErrorPopup/ErrorPopup";

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
import { useDeleteMemberTeamTwo } from "../../../../api/UserAPI";

type TeamGridProps = {
  theme: Theme;
  userRole: UserRole;
  userId: number;
};

export default function TeamGrid({ theme, userRole, userId }: TeamGridProps) {
  const [rows, setRows] = React.useState<TeamAPP[]>([]);

  // Ref for error popup
  const ref = React.useRef<RefObject>(null);

  // Team query
  const { status, data } = useGetMyTeams(ref);

  // Team mutations
  const patchTeam = usePatchTeam(ref);
  const postTeam = usePostTeam(ref);
  const deleteTeam = useDeleteTeam(ref);
  const deleteMemberTeam = useDeleteMemberTeamTwo(ref);

  // Called when "status" of teams query is changed
  React.useEffect(() => {
    handleInit(setRows, status, data);
  }, [status, data]);

  // Called when a row is edited
  const processRowUpdateDecorator = React.useCallback(
    async (newRow: TeamAPP, oldRow: TeamAPP) =>
      processRowUpdate(setRows, patchTeam as UseMutationResult, newRow, oldRow),
    []
  );

  // Called when the "Delete" action is pressed in the menu
  const handleDeleteMemberDecorator = React.useCallback(
    (rowId: GridRowId) => () => {
      deleteMemberTeam.mutate(
        { teamId: rowId as number, userId },
        {
          onSuccess: () => {
            setRows((prevRows) => prevRows.filter((row) => row.id !== rowId));
          },
          onError: (error: unknown) => {
            handleError(ref, error);
          },
        }
      );
    },
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
            label="Leave"
            onClick={handleDeleteMemberDecorator(params.id)}
            showInMenu={userRole === "ASSESSOR"}
          />,
          ...(userRole === "ASSESSOR"
            ? [
                <GridActionsCellItem
                  icon={<DeleteIcon />}
                  label="Delete"
                  onClick={handleDeleteDecorator(params.id)}
                  showInMenu
                />,
              ]
            : []),
        ],
      },
    ],
    [handleDeleteDecorator]
  );

  return (
    <>
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
      <ErrorPopup ref={ref} />
    </>
  );
}
