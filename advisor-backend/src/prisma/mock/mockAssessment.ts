import { AssessmentType } from '@prisma/client';

export const aAssessment = {
  assessment_id: 1,
  assessment_type: AssessmentType.INDIVIDUAL,
  country_name: 'Netherlands',
  department_name: 'Test Department',
  enabled: false,
  template_id: 1,
};

export const aTeamAssessment = {
  assessment_id: 2,
  assessment_type: AssessmentType.TEAM,
  country_name: 'Netherlands',
  department_name: 'Test Department',
  enabled: false,
  template_id: 1,
  team_id: 1,
};

export const aAssessmentFull = {
  ...aAssessment,
  feedback_text: 'test_feedback_text',
  information: 'test_information',
  created_at: new Date(),
  updated_at: new Date(),
};

export const mockAssessment = {
  count: jest.fn().mockResolvedValue(1),
  create: jest.fn().mockResolvedValue(aAssessment),
  findUnique: jest.fn().mockResolvedValue(aAssessment),
  update: jest.fn().mockResolvedValue(aAssessment),
  findMany: jest.fn().mockResolvedValue([aAssessment]),
  delete: jest.fn().mockResolvedValue(aAssessment),
  getAssessments: jest.fn().mockResolvedValue([aAssessment]),
};
