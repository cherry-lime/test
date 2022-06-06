import { mockAssessment } from './mockAssessment';
import { mockCategory } from './mockCategory';
import { mockTeam } from './mockTeam';
import { mockTemplate } from './mockTemplate';
import { mockUser } from './mockUser';

export const mockPrisma = {
  template: mockTemplate,
  user: mockUser,
  assessment: mockAssessment,
  team: mockTeam,
  category: mockCategory,
};
