import { useQuery, useMutation } from "react-query";
import { GridRowId } from "@mui/x-data-grid";

import API from "../API";

export type TeamRow = {
  id: GridRowId;
  name: string;
  inviteToken: number;
  country: string;
  department: string;
};

type Team = {
  team_id: number;
  team_name: string;
  invite_token: number;
  team_country: string;
  team_department: string;
};

function toRow(team: Team) {
  return {
    id: team.team_id,
    name: team.team_name,
    inviteToken: team.invite_token,
    country: team.team_country,
    department: team.team_department,
  } as TeamRow;
}

function fromRow(row: TeamRow) {
  return {
    team_id: row.id,
    team_name: row.name,
    invite_token: row.inviteToken,
    team_country: row.country,
    team_department: row.department,
  } as Team;
}

// Get all teams from database
export function useGetMyTeams() {
  return useQuery(["GET", "/teams", "/my-team"], async () => {
    // Get response data from database
    const { data } = await API.get(`/teams/my-team`);

    // Convert data to rows
    const rows = data.map((team: Team) => toRow(team));

    return rows as TeamRow[];
  });
}

// Get team with id from database
export function useGetTeam() {
  return useQuery(["GET", "/teams", "/{team_id}"], async (teamId) => {
    // Get data from database
    const { data } = await API.get(`/teams/${teamId}`);

    return data as Team;
  });
}

// Patch team in database
export function usePatchTeam() {
  return useMutation(
    ["PATCH", "/teams", "/{team_id}"],
    async (row: TeamRow) => {
      // Convert row to team
      const team = fromRow(row);

      // Get response data from database
      const { data } = await API.patch(`/teams/${team.team_id}`, team);

      // Convert data to row
      return toRow(data);
    }
  );
}

// Delete team from database
export function useDeleteTeam() {
  return useMutation(
    ["DELETE", "/teams", "/{team_id}"],
    async (teamId: number) => {
      // Get response data from database
      const { data } = await API.delete(`/teams/${teamId}`);

      // Convert data to row
      return toRow(data);
    }
  );
}

// Get team with id from database
export function useGetInviteTokenTeam() {
  return useQuery(
    ["GET", "/teams", "/{team_id}", "invite_token"],
    async (teamId) => {
      // Get data from database
      const { data } = await API.get(`/teams/${teamId}/invite_token`);

      return data as string;
    }
  );
}

// Patch team in database
export function useJoinInviteTokenTeam() {
  return useMutation(
    ["PATCH", "/teams", "/join", "invite_token"],
    async (inviteToken) => {
      // Get response data from database
      const { data } = await API.patch(`/teams/join/${inviteToken}`);

      return data;
    }
  );
}
