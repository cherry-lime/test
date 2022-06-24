import { useMutation, useQuery } from "react-query";
import { GridRowId } from "@mui/x-data-grid";

import API from "./_API";

export type UserAPP = {
  id: GridRowId;
  name: string;
  role: string;
  createdAt: string;
  updatedAt: string;
};

type UserAPI = {
  user_id: number;
  username: string;
  role: string;
  created_at: string;
  updated_at: string;
};

function userToAPP(userAPI: UserAPI) {
  return {
    id: userAPI.user_id,
    name: userAPI.username,
    role: userAPI.role,
    createdAt: userAPI.created_at,
    updatedAt: userAPI.updated_at,
  } as UserAPP;
}

// Get user with id from database
export function useGetUser() {
  return useQuery(["GET", "/user", "/{id}"], async (userId) => {
    // Get data from database
    const { data } = await API.get(`/user/${userId}`);

    return userToAPP(data) as UserAPP;
  });
}

// Get is user in team with team id from database
export function useIsUserInTeam(teamId: number) {
  return useQuery(["GET", "/teams", teamId, "/isUserInTeam"], async () => {
    // Get data from database
    const { data } = await API.get(`/teams/${teamId}/isUserInTeam`);

    return data as boolean;
  });
}

// Get meembers of team with team id from database
export function useGetMembersTeam(teamId: number) {
  return useQuery(["GET", "/teams", teamId, "/members"], async () => {
    // Get data from database
    const { data } = await API.get(`/teams/${teamId}/members`);

    // Convert data to usersAPP
    const usersAPP = data.map((userAPI: UserAPI) => userToAPP(userAPI));

    return usersAPP as UserAPP[];
  });
}

// Delete user from team with team id from database
export function useDeleteMemberTeam(teamId: number) {
  return useMutation(
    ["DELETE", "/teams", teamId, "/members", "/user_id"],
    async (userId: number) => {
      // Get response data from database
      const { data } = await API.delete(`/teams/${teamId}/members/${userId}`);

      // Convert data to userAPP
      return userToAPP(data) as UserAPP;
    }
  );
}
