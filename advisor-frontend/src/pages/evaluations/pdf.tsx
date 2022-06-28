/* eslint-disable max-lines */
import JsPDF from "jspdf";
import { AnswerAPP } from "../../api/AnswerAPI";
import { RecommendationAPP } from "../../api/RecommendationAPI";
import { CategoryAPP } from "../../api/CategoryAPI";
import { CheckpointAPP } from "../../api/CheckpointAPI";
import { TopicAPP } from "../../api/TopicAPI";
import {
  getAreas,
  getCheckpoints,
  getSubareas,
  getTopicRecommendations,
} from "./pdfHelpers";

type Table = {
  title: string;
  sections: { title: string; text: string[] }[];
  data: (string | number)[][];
  headers: string[];
};

type CheckpointAnswer = {
  id: number;
  description: string;
  order: number;
  topics: string;
  answer: string;
};

const transformCheckpoints = (
  checkpoints: CheckpointAPP[],
  answers: Record<number, number | undefined>,
  answerList: AnswerAPP[],
  topicList: TopicAPP[]
) =>
  checkpoints.map((c) => {
    const object: CheckpointAnswer = {
      id: Number(c.id),
      description: c.description,
      order: c.order,
      topics: topicList
        .filter((t) => c.topics.includes(Number(t.id)))
        .map((t) => t.name)
        .join(", "),
      answer: answerList
        .filter((a) => a.id === answers[Number(c.id)])
        .map((a) => a.label)
        .join(""),
    };
    return object;
  });

async function getAreaTables(
  allAreas: CategoryAPP[],
  checkpointHeaders: string[],
  checkpointAnswers: Record<number, number | undefined>,
  answerList: AnswerAPP[],
  topics: TopicAPP[]
) {
  const tables: Table[] = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const a of allAreas) {
    // eslint-disable-next-line no-await-in-loop
    const checkpoints = await getCheckpoints(Number(a.id));
    const tCheckpoints = transformCheckpoints(
      checkpoints,
      checkpointAnswers,
      answerList,
      topics
    );

    // eslint-disable-next-line no-await-in-loop
    const subareas = await getSubareas(Number(a.id));
    tables.push({
      title: `Checkpoints: ${a.name}`,
      sections: subareas.map((s) => ({
        title: s.name,
        text: [s.summary, s.description],
      })),
      data: tCheckpoints.map((c) => [
        c.order,
        c.description,
        c.topics,
        c.answer,
      ]),
      headers: checkpointHeaders,
    });
  }
  return tables;
}

function getRecTable(recs: RecommendationAPP[], recsHeaders: string[]) {
  return {
    title: `Recommendations`,
    sections: [],
    data: recs.map((c) => [c.order, c.description, c.additionalInfo]),
    headers: recsHeaders,
  };
}

function addTable(
  doc: JsPDF,
  table: Table,
  pageMargin: number,
  liveArea: { width: number; height: number },
  padding: number,
  nextYValue: number,
  textFontSize: number,
  sectFontSize: number,
  titleFontSize: number
) {
  const xPositions: number[] = [];
  let nextY = nextYValue;

  if (table.title !== "") {
    if (nextY > liveArea.height) {
      doc.addPage();
      nextY = pageMargin;
    }
    doc.setFontSize(titleFontSize).setFont(doc.getFont().fontName, "bold");
    const title = doc.splitTextToSize(String(table.title), liveArea.width);
    const titleHeight = title.length * doc.getLineHeight();

    doc.text(table.title, pageMargin, nextY);

    nextY += padding + titleHeight;
  }

  table.sections.forEach((section) => {
    if (nextY > liveArea.height) {
      doc.addPage();
      nextY = pageMargin;
    }

    if (section.title !== "") {
      doc.setFontSize(sectFontSize).setFont(doc.getFont().fontName, "bold");

      const sectTitle = doc.splitTextToSize(
        String(section.title),
        liveArea.width
      );
      const sectTitleHeight = sectTitle.length * doc.getLineHeight();

      if (nextY + sectTitleHeight > liveArea.height) {
        doc.addPage();
        nextY = pageMargin;
      }

      doc.text(section.title, pageMargin, nextY);

      nextY += 3 + sectTitleHeight;
    }

    doc.setFontSize(textFontSize).setFont(doc.getFont().fontName, "normal");

    section.text.forEach((t) => {
      if (t === "") return;
      const sectText = doc.splitTextToSize(String(t), liveArea.width);
      const sectTextHeight = sectText.length * doc.getLineHeight();

      if (nextY + sectTextHeight > liveArea.height) {
        doc.addPage();
        nextY = pageMargin;
      }

      doc.text(sectText, pageMargin, nextY);

      nextY += sectTextHeight + 3;
    });

    nextY += 7 + padding;
  });

  const firstColWidth = 50;
  const colWidth =
    (liveArea.width - firstColWidth) / (table.headers.length - 1);
  doc.setFontSize(textFontSize).setFont(doc.getFont().fontName, "normal");

  table.headers.forEach((heading: string, index: number) => {
    // Here we are starting at pageMargin's xPosition plus whatever index we are on
    // multiplied by the number of columns needed
    // the first col has fixed width, the others have equal widths
    const xPositionForCurrentHeader =
      index === 0
        ? pageMargin
        : pageMargin + firstColWidth + (index - 1) * colWidth;

    const yPositionForHeaders = nextY;
    doc.text(
      heading,
      index === 0
        ? xPositionForCurrentHeader
        : xPositionForCurrentHeader + padding,
      yPositionForHeaders
    );

    xPositions.push(
      index === 0
        ? xPositionForCurrentHeader
        : xPositionForCurrentHeader + padding
    );
  });

  nextY += +5;

  doc.line(pageMargin, nextY, liveArea.width, nextY);

  nextY += padding;

  if (nextY > liveArea.height) {
    doc.addPage();
    nextY = pageMargin;
  }

  // ROWS
  table.data.forEach((row: (string | number)[]) => {
    const rowHeights: number[] = [];

    // COLUMNS
    table.headers.forEach((_column: string, cIndex) => {
      const longText = doc.splitTextToSize(
        String(row[cIndex]),
        cIndex !== 0 ? colWidth - padding * 2 : firstColWidth - padding * 2
      );
      const rowHeight = longText.length * doc.getLineHeight();
      rowHeights.push(rowHeight);

      doc.text(longText, xPositions[cIndex], nextY);
    });

    nextY = nextY + padding + Math.max(...rowHeights);

    if (nextY > liveArea.height) {
      doc.addPage();
      nextY = pageMargin;
    }
  });
  return nextY;
}

function pdf(tables: Table[], title: string, filename: string) {
  const doc = new JsPDF({
    orientation: "l",
    unit: "pt",
    format: "a4",
  });

  const titleFontSize = 14;
  const tableTitleFontSize = 12;
  const sectFontSize = 10;
  const textFontSize = 8;

  // Get the page total pt height and pt width based on
  // https://github.com/MrRio/jsPDF/blob/ddbfc0f0250ca908f8061a72fa057116b7613e78/jspdf.js#L59
  // And because we are in landscape mode (see orientation in jsPDF config options above)
  // I flipped the width x height values to reflect this
  const pageDimensions = {
    height: 595.28,
    width: 841.89,
  };

  // Set some general padding to the document
  const pageMargin = 50;

  // The live area of a document represents the
  // area of the page that will have content.
  // Here I am saying whatever the dimension parameters,
  // take off the margin on both sides.
  const liveArea = {
    width: pageDimensions.width - pageMargin,
    height: pageDimensions.height - pageMargin,
  };

  // Let's set up a standard padding that we can add to known coordinates
  const padding = 15;

  let nextY = pageMargin;

  doc.setFontSize(titleFontSize).setFont(doc.getFont().fontName, "bold");

  const titleText = doc.splitTextToSize(String(title), liveArea.width);
  const titleHeight = titleText.length * doc.getLineHeight();

  doc.text(titleText, pageMargin, nextY);

  nextY += padding + titleHeight;

  tables.forEach((table) => {
    nextY =
      addTable(
        doc,
        table,
        pageMargin,
        liveArea,
        padding,
        nextY,
        textFontSize,
        sectFontSize,
        tableTitleFontSize
      ) + 20;
  });

  doc.save(filename);
}

export default async function createPDF(
  assessmentId: number,
  areas: CategoryAPP[],
  checkpointAnswers: Record<number, number | undefined>,
  topics: TopicAPP[],
  answerList: AnswerAPP[]
) {
  const filename = `Feedback-${assessmentId}.pdf`;
  const recsHeaders = ["Priority", "Recommendation", "Additional Info"];
  const checkpointHeaders = ["Order", "Description", "Topics", "Answer"];

  const tables: Table[] = [];
  const recs = await getTopicRecommendations(assessmentId, undefined);

  tables.push(getRecTable(recs, recsHeaders));

  const allAreas = await getAreas(areas.map((a) => Number(a.id)));
  (
    await getAreaTables(
      allAreas,
      checkpointHeaders,
      checkpointAnswers,
      answerList,
      topics
    )
  ).forEach((s) => tables.push(s));

  pdf(tables, `Feedback for assessment ${assessmentId}`, filename);
}
