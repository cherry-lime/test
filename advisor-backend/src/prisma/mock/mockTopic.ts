export const aTopic = {
  topic_id: 1,
  topic_name: 'test_topic_name',
  template_id: 1,
  disabled: false,
};

export const mockTopic = {
  findFirst: jest.fn().mockResolvedValue(aTopic),
};
