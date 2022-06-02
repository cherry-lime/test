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

export const mockTemplate = {
  create: jest.fn().mockResolvedValue(aTemplate),
  findFirst: jest.fn().mockResolvedValue(aTemplate),
};
