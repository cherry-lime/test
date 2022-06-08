import { mockAssessment } from './mockAssessment';
import { mockTeam } from './mockTeam';
import { mockTemplate } from './mockTemplate';
import { mockUser } from './mockUser';
import { mockTeamMembers } from './mockTeamMembers';

export const mockPrisma = {
  template: mockTemplate,
  user: mockUser,
  assessment: mockAssessment,
  team: mockTeam,
  mockTeamMembers: mockTeamMembers,
};
