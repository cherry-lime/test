export const aTeamMembers = {
  team_id: 1,
  team_name: 'test_team_name',
  team_member_ids: [1],
  team_members: ['test_user_name'],
};

export const mockTeamMembers = {
  findTeamMembers: jest.fn().mockResolvedValue(aTeamMembers),
  addTeamMember: jest.fn().mockResolvedValue(aTeamMembers),
};
