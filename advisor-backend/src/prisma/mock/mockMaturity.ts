export const aMaturity = {
  maturity_id: 1,
  maturity_name: 'Maturity 1',
  maturity_order: 0,
  template_id: 1,
};

export const mockMaturity = {
  create: jest.fn().mockResolvedValue(aMaturity),
  findMany: jest.fn().mockResolvedValue([aMaturity]),
  findUnique: jest.fn().mockResolvedValue(aMaturity),
  update: jest.fn().mockResolvedValue(aMaturity),
  delete: jest.fn().mockResolvedValue(aMaturity),
};
