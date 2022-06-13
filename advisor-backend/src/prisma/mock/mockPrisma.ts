import { mockAssessment } from './mockAssessment';
import { mockAssessmentParticipants } from './mockAssessmentParticipants';
import { mockTeam } from './mockTeam';
import { mockTemplate } from './mockTemplate';
import { mockUser } from './mockUser';

export const mockPrisma = {
  template: mockTemplate,
  user: mockUser,
  assessment: mockAssessment,
  team: mockTeam,
  assessmentParticipants: mockAssessmentParticipants,
};
