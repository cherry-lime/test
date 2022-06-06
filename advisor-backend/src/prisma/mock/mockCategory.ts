export const aCategory = {
  category_id: 1,
  category_name: 'Category 1',
  color: 1,
  template_id: 1,
};

export const mockCategory = {
  create: jest.fn().mockResolvedValue(aCategory),
  update: jest.fn().mockResolvedValue(aCategory),
  delete: jest.fn().mockResolvedValue(aCategory),
  findUnique: jest.fn().mockResolvedValue(aCategory),
  findMany: jest.fn().mockResolvedValue([aCategory]),
};
