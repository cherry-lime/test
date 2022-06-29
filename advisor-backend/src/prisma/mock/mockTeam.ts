import { aAssessment } from './mockAssessment';

export const aTeam = {
  team_id: 1,
  team_name: 'test_team_name',
  invite_token: 'test_invite_token',
  team_country: 'test_team_country',
  team_department: 'test_team_department',
  UserInTeam: [
    {
      user_id: 1,
      team_id: 1,
    },
  ],
};

export const aTeamNoMembers = {
  team_id: 1,
  team_name: 'test_team_name',
  invite_token: 'test_invite_token',
  team_country: 'test_team_country',
  team_department: 'test_team_department',
  UserInTeam: [],
};

export const mockCreateTeamBody = {
  team_name: 'test_team_name',
  team_country: 'test_team_country',
  team_department: 'test_team_department',
};

export const mockCreateTeamResponse = {
  team_id: 1,
  team_name: 'test_team_name',
  invite_token: 'test_invite_token',
  team_country: 'test_team_country',
  team_department: 'test_team_department',
};

export const aTeamWithAssessment = {
  ...aTeam,
  Assessment: [aAssessment],
};

export const aUpdateTeam = {
  team_name: 'test_team_name',
  team_country: 'test_team_country',
  team_department: 'test_team_department',
};

export const aCreateTeam = {
  team_name: 'New Team',
  team_country: '',
  team_department: '',
};

export const mockTeam = {
  create: jest.fn().mockResolvedValue(aCreateTeam),
  findUnique: jest.fn().mockResolvedValue(aTeam),
  findOne: jest.fn().mockResolvedValue(aTeam),
  getAssessments: jest.fn().mockResolvedValue([aAssessment]),
  update: jest.fn().mockResolvedValue(aTeam),
};
