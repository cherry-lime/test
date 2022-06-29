export const aCheckpoint = {
  checkpoint_id: 1,
  category_id: 1,
  maturity_id: 1,
  disabled: false,
  order: 1,
  weight: 1,
  checkpoint_additional_information: 'Checkpoint 1 additional information',
  checkpoint_description: 'Checkpoint 1 description',
  topics: [],
  Category: {
    template_id: 1,
  },
  CheckpointInTopic: [],
};

export const mockCheckpoint = {
  create: jest.fn().mockResolvedValue(aCheckpoint),
  findUnique: jest.fn().mockResolvedValue(aCheckpoint),
  findMany: jest.fn().mockResolvedValue([aCheckpoint]),
  update: jest.fn().mockResolvedValue(aCheckpoint),
  count: jest.fn().mockResolvedValue(1),
  delete: jest.fn().mockResolvedValue(aCheckpoint),
  updateMany: jest.fn().mockResolvedValue([aCheckpoint]),
};
