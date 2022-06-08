export const aTeam = {
  team_id: 1,
  team_name: 'test',
  invite_token: 'test',
  UserInTeam: [
    {
      user_id: 1,
    },
  ],
};

export const mockTeam = {
  create: jest.fn().mockResolvedValue(aTeam),
  findUnique: jest.fn().mockResolvedValue(aTeam),
  findOne: jest.fn().mockResolvedValue(aTeam),
};
