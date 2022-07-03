export const aAnswer = {
  answer_id: 1,
  answer_text: 'test_answer_text',
  answer_weight: 1,
  template_id: 1,
  disabled: false,
};

export const mockAnswser = {
  findMany: jest.fn().mockResolvedValue([aAnswer]),
};
