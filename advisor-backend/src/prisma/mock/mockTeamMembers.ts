export const aTeamMembers = {
  team_name: 'test_team_name',
  team_members: [{ username: 'test_username', role: 'USER' }],
};

export const mockTeamMembers = {
  findTeamMembers: jest.fn().mockResolvedValue(aTeamMembers),
  addTeamMember: jest.fn().mockResolvedValue(aTeamMembers),
};
