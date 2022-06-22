export const aTemplate = {
  template_id: 1,
  template_name: 'test',
  template_type: 'INDIVIDUAL',
  disabled: false,
  weight_range_min: 1,
  weight_range_max: 3,
  score_formula: 'sum(x)',
  include_no_answer: false,
};

export const updateTemplate = {
  template_id: 1,
  template_name: 'new_name',
  template_type: 'INDIVIDUAL',
  disabled: false,
  weight_range_min: 1,
  weight_range_max: 5,
  score_formula: 'avg(x)',
  include_no_answer: true,
};

export const mockTemplate = {
  create: jest.fn().mockResolvedValue(aTemplate),
  findUnique: jest.fn().mockResolvedValue(aTemplate),
  findFirst: jest.fn().mockResolvedValue(aTemplate),
  count: jest.fn().mockResolvedValue(1),
  update: jest.fn().mockResolvedValue(updateTemplate),
  findMany: jest.fn().mockResolvedValue([aTemplate]),
  delete: jest.fn().mockResolvedValue(aTemplate),
};
