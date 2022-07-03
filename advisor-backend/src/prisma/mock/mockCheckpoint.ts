export const aCheckpoint = {
  checkpoint_id: 1,
};

export const aCheckpoint1 = {
  checkpoint_id: 1,
  maturity_id: 1,
  category_id: 1,
  disabled: false,
};

export const aCheckpointFull = {
  ...aCheckpoint1,
  checkpoint_description: 'test_checkpoint_description',
  checkpoint_additional_information: 'test_checkpoint_additional_information',
  order: 1,
  weight: 1,
  disabled: false,
  CheckpointInTopic: [
    {
      checkpoint_id: aCheckpoint1.checkpoint_id,
      topic_id: 1,
    },
  ],
  CheckpointAndAnswersInAssessments: [
    {
      checkpoint_id: aCheckpoint1.checkpoint_id,
      assessment_id: 1,
      answer_id: 1,
    },
  ],
};

export const mockCheckpoint = {
  updateMany: jest.fn().mockResolvedValue([aCheckpoint]),
  findMany: jest.fn().mockResolvedValue([aCheckpoint1]),
};
