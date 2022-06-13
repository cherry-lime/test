import { AssessmentType } from '@prisma/client';

export const aAssessment = {
  assessment_id: 1,
  assessment_name: 'test',
  assessment_type: AssessmentType.INDIVIDUAL,
  country_name: 'Netherlands',
  department_name: 'Test Department',
  template_id: 1,
};

export const aTeamAssessment = {
  assessment_id: 2,
  assessment_name: 'test',
  assessment_type: AssessmentType.TEAM,
  country_name: 'Netherlands',
  department_name: 'Test Department',
  template_id: 1,
  team_id: 1,
};

export const mockAssessment = {
  create: jest.fn().mockResolvedValue(aAssessment),
  findUnique: jest.fn().mockResolvedValue(aAssessment),
  update: jest.fn().mockResolvedValue(aAssessment),
  findMany: jest.fn().mockResolvedValue([aAssessment]),
  delete: jest.fn().mockResolvedValue(aAssessment),
};
