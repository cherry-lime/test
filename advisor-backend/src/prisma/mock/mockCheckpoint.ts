export const aCheckpoint = {
  checkpoint_id: 1,
};

export const mockCheckpoint = {
  updateMany: jest.fn().mockResolvedValue([aCheckpoint]),
};
