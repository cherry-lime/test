import { useQuery } from "react-query";
import { GridRowId } from "@mui/x-data-grid";

import API from "../../../../API";

export type UserRow = {
  id: GridRowId;
  name: string;
  role: string;
  createdAt: string;
  updatedAt: string;
};

type User = {
  user_id: number;
  username: string;
  role: string;
  created_at: string;
  updated_at: string;
};

function toRow(user: User) {
  return {
    id: user.user_id,
    name: user.username,
    role: user.role,
    createdAt: user.created_at,
    updatedAt: user.updated_at,
  } as UserRow;
}

/*
// Get user with id from database
export function useGetUser() {
  return useQuery(["GET", "/user", "/{id}"], async (userId) => {
    // Get data from database
    const { data } = await API.get(`/user/${userId}`);

    return data as User;
  });
}
*/

// Get is user in team with team id from database
export function useIsUserInTeam() {
  return useQuery(
    ["GET", "/teams", "/{team_id}", "/isUserInTeam"],
    async (teamId) => {
      // Get data from database
      const { data } = await API.get(`/teams/${teamId}/isUserInTeam`);

      return data as boolean;
    }
  );
}

// Get is user in team with team id from database
export function useGetMembersTeam() {
  return useQuery(
    ["GET", "/teams", "/{team_id}", "/members"],
    async (teamId) => {
      // Get data from database
      const { data } = await API.get(`/teams/${teamId}/members`);

      // Convert data to rows
      const rows = data.map((user: User) => toRow(user));

      return rows as UserRow[];
    }
  );
}
