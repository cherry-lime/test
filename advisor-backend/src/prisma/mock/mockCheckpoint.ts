import { Checkpoint } from '@prisma/client';

export const aCheckpoint: Checkpoint = {
  checkpoint_id: 1,
  category_id: 1,
  maturity_id: 1,
  disabled: false,
  order: 1,
  weight: 1,
  checkpoint_additional_information: 'Checkpoint 1 additional information',
  checkpoint_description: 'Checkpoint 1 description',
};

export const mockCheckpoint = {
  updateMany: jest.fn().mockResolvedValue([aCheckpoint]),
};
