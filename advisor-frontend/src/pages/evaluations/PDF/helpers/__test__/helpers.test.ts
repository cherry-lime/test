import * as helpers from "../pdfHelpers";

describe("Testing PDF helper function", () => {
  const checkpoint = {
    id: 1,
    description: "checkpoint one",
    additionalInfo: "additional info c1",
    weight: 3,
    order: 1,
    categoryId: 5,
    maturityId: 3,
    topics: [1],
    enabled: true,
  };
  const topic = {
    id: 1,
    name: "topic 1",
    templateId: 2,
    enabled: true,
  };

  const answers = {
    1: 3,
  };

  const answer = {
    id: 3,
    label: "yes",
    value: 3,
    templateId: 2,
    enabled: true,
  };

  const area = {
    id: 5,
    name: "An area",
    color: "#FFFFFF",
    order: 10,
    enabled: true,
    templateId: 2,
  };

  const subarea = {
    id: 7,
    name: "a",
    order: 1,
    description: "bla",
    summary: "b",
    categoryId: 5,
    enabled: true,
  };

  const checkpointAnswer = {
    id: checkpoint.id,
    description: checkpoint.description,
    order: checkpoint.order,
    topics: topic.name,
    answer: answer.label,
  };

  const checkpointHeaders = ["Order", "Description", "Topics", "Answer"];

  it("transform checkpoints", () => {
    expect(
      helpers.transformCheckpoints([checkpoint], answers, [answer], [topic])
    ).toStrictEqual([checkpointAnswer]);
  });

  it("transform area", () => {
    expect(
      helpers.transformArea(
        area,
        [subarea],
        [checkpointAnswer],
        checkpointHeaders
      )
    ).toStrictEqual({
      title: `Checkpoints: ${area.name}`,
      sections: [
        { title: subarea.name, text: [subarea.summary, subarea.description] },
      ],
      data: [
        [
          checkpointAnswer.order,
          checkpointAnswer.description,
          checkpointAnswer.topics,
          checkpointAnswer.answer,
        ],
      ],
      headers: checkpointHeaders,
    });
  });
});
