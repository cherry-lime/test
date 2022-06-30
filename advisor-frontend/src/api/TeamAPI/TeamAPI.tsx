import { useQuery, useMutation } from "react-query";
import { GridRowId } from "@mui/x-data-grid";

import API from "../_API";
import { handleError, RefObject } from "../../components/ErrorPopup/ErrorPopup";

export type TeamAPP = {
  id: GridRowId;
  name: string;
  inviteToken: number;
  country: string;
  department: string;
};

type TeamAPI = {
  team_id: number;
  team_name: string;
  invite_token: number;
  team_country: string;
  team_department: string;
};

export function teamToAPP(teamAPI: TeamAPI) {
  return {
    id: teamAPI.team_id,
    name: teamAPI.team_name,
    inviteToken: teamAPI.invite_token,
    country: teamAPI.team_country,
    department: teamAPI.team_department,
  } as TeamAPP;
}

export function teamToAPI(teamAPP: TeamAPP) {
  return {
    team_id: teamAPP.id,
    team_name: teamAPP.name,
    invite_token: teamAPP.inviteToken,
    team_country: teamAPP.country,
    team_department: teamAPP.department,
  } as TeamAPI;
}

// Get all teams from database
export function useGetMyTeams(ref?: React.RefObject<RefObject>) {
  return useQuery(
    ["GET", "/teams", "/my-teams"],
    async () => {
      // Get response data from database
      const { data } = await API.get(`/teams/my-teams`);

      // Convert data to teamsAPP
      const teamsAPP = data.map((teamAPI: TeamAPI) => teamToAPP(teamAPI));

      return teamsAPP as TeamAPP[];
    },
    {
      onError: (error) => {
        if (ref) {
          handleError(ref, error);
        }
      },
    }
  );
}

// Get team with id from database
export function useGetTeam(teamId: number, ref?: React.RefObject<RefObject>) {
  return useQuery(
    ["GET", "/teams", teamId],
    async () => {
      // Get data from database
      const { data } = await API.get(`/teams/${teamId}`);

      return teamToAPP(data) as TeamAPP;
    },
    {
      onError: (error) => {
        if (ref) {
          handleError(ref, error);
        }
      },
      enabled: !!teamId,
    }
  );
}

// Post team to database
export function usePostTeam(ref?: React.RefObject<RefObject>) {
  return useMutation(
    ["POST", "/teams", "/create"],
    async () => {
      // Get response data from database
      const { data } = await API.post(`/teams/create`);

      // Convert data to teamAPP
      return teamToAPP(data) as TeamAPP;
    },
    {
      onError: (error) => {
        if (ref) {
          handleError(ref, error);
        }
      },
    }
  );
}

// Patch team in database
export function usePatchTeam(ref?: React.RefObject<RefObject>) {
  return useMutation(
    ["PATCH", "/teams", "/{team_id}"],
    async (teamAPP: TeamAPP) => {
      // Convert teamAPP to team
      const teamAPI = teamToAPI(teamAPP);

      // Get response data from database
      const { data } = await API.patch(`/teams/${teamAPI.team_id}`, teamAPI);

      // Convert data to teamAPP
      return teamToAPP(data);
    },
    {
      onError: (error) => {
        if (ref) {
          handleError(ref, error);
        }
      },
    }
  );
}

// Delete team from database
export function useDeleteTeam(ref?: React.RefObject<RefObject>) {
  return useMutation(
    ["DELETE", "/teams", "/{team_id}"],
    async (teamId: number) => {
      // Get response data from database
      const { data } = await API.delete(`/teams/${teamId}`);

      // Convert data to teamAPP
      return teamToAPP(data);
    },
    {
      onError: (error) => {
        if (ref) {
          handleError(ref, error);
        }
      },
    }
  );
}

// Get team with id from database
export function useGetInviteTokenTeam(
  teamId: number,
  ref?: React.RefObject<RefObject>
) {
  return useQuery(
    ["GET", "/teams", teamId, "invite_token"],
    async () => {
      // Get data from database
      const { data } = await API.get(`/teams/${teamId}/invite_token`);

      return data as string;
    },
    {
      onError: (error) => {
        if (ref) {
          handleError(ref, error);
        }
      },
    }
  );
}

// Patch team in database
export function useJoinInviteTokenTeam(
  inviteToken: string,
  ref?: React.RefObject<RefObject>
) {
  return useMutation(
    ["PATCH", "/teams", "/join", inviteToken],
    async () => {
      // Get response data from database
      const { data } = await API.patch(`/teams/join/${inviteToken}`);

      return data;
    },
    {
      onError: (error) => {
        if (ref) {
          handleError(ref, error);
        }
      },
    }
  );
}
