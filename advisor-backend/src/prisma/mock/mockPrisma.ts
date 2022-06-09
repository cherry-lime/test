import { mockAssessment } from './mockAssessment';
import { mockTeam } from './mockTeam';
import { mockTemplate } from './mockTemplate';
import { mockUser } from './mockUser';
import { mockTeamMembers } from './mockTeamMembers';
import { mockUser1 } from './mockUser1';
import { mockUserInTeam } from './mockUserInTeam';

export const mockPrisma = {
  template: mockTemplate,
  user: mockUser,
  user1: mockUser1,
  userInTeam: mockUserInTeam,
  assessment: mockAssessment,
  team: mockTeam,
  mockTeamMembers: mockTeamMembers,
};
