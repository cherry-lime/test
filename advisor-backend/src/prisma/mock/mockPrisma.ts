import { mockAssessment } from './mockAssessment';
import { mockCategory } from './mockCategory';
import { mockAssessmentParticipants } from './mockAssessmentParticipants';
import { mockTeam } from './mockTeam';
import { mockTemplate } from './mockTemplate';
import { mockUser } from './mockUser';
import { mockUserInTeam } from './mockUserInTeam';

export const mockPrisma = {
  template: mockTemplate,
  user: mockUser,
  userInTeam: mockUserInTeam,
  assessment: mockAssessment,
  team: mockTeam,
  category: mockCategory,
  assessmentParticipants: mockAssessmentParticipants,
};
