/* eslint-disable max-lines */
import JsPDF from "jspdf";
import { AnswerAPP } from "../../../api/AnswerAPI/AnswerAPI";
import { CategoryAPP } from "../../../api/CategoryAPI/CategoryAPI";
import { TopicAPP } from "../../../api/TopicAPI/TopicAPI";
import {
  getAssessment,
  getTemplate,
  getTopicRecommendations,
} from "./pdfHelpersAPI";
import { Table, getRecTable, getAreaTables } from "./helpers/pdfHelpers";
import {
  nextYCheckEndOfPage,
  generateTableHeaders,
  generateTableRow,
  generateText,
} from "./tableHelpers/tableHelpers";

function addTable(
  doc: JsPDF,
  table: Table,
  docProps: {
    pageMargin: number;
    liveArea: { width: number; height: number };
    padding: number;
  },
  nextYValue: number,
  textFontSize: number,
  sectFontSize: number,
  titleFontSize: number
) {
  let nextY = nextYValue;
  const { padding, liveArea, pageMargin } = docProps;

  const getNextYWrapper = (y: number, addition = 0) =>
    nextYCheckEndOfPage(doc, y, liveArea.height, pageMargin, addition);

  nextY = generateText(
    doc,
    table.title,
    docProps,
    titleFontSize,
    nextY,
    "bold"
  );

  table.sections.forEach((section) => {
    nextY = getNextYWrapper(nextY);

    nextY = generateText(
      doc,
      section.title,
      docProps,
      sectFontSize,
      nextY,
      "bold"
    );

    section.text.forEach((t) => {
      nextY = generateText(doc, t, docProps, textFontSize, nextY);
    });

    nextY += 7 + padding;
  });

  const firstColWidth = 50;

  const colWidth =
    (liveArea.width - firstColWidth) / (table.headers.length - 1);

  doc.setFontSize(textFontSize).setFont(doc.getFont().fontName, "normal");

  const { xPositions, nextY: nextYGenerated } = generateTableHeaders(
    doc,
    table.headers,
    docProps,
    nextY,
    firstColWidth,
    colWidth
  );

  nextY = nextYGenerated;

  nextY = getNextYWrapper(nextY);

  // ROWS
  table.data.forEach((row: (string | number)[]) => {
    const rowHeights = generateTableRow(
      doc,
      table.headers,
      row,
      colWidth,
      padding,
      firstColWidth,
      xPositions,
      nextY
    );

    nextY = nextY + padding + Math.max(...rowHeights);

    nextY = getNextYWrapper(nextY);
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

  const docProps = {
    padding,
    liveArea,
    pageMargin,
  };

  let nextY = pageMargin;

  nextY = generateText(doc, title, docProps, titleFontSize, nextY, "bold") + 10;

  tables.forEach((table) => {
    nextY =
      addTable(
        doc,
        table,
        docProps,
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

  const assessmentInfo = await getAssessment(Number(assessmentId));

  const templateInfo = await getTemplate(Number(assessmentInfo.templateId));

  const feedback = templateInfo.information;
  const assessorFeedback = assessmentInfo.feedbackText;

  const recs = await getTopicRecommendations(assessmentId, undefined);

  tables.push(getRecTable(recs, recsHeaders, feedback, assessorFeedback));

  (
    await getAreaTables(
      areas,
      checkpointHeaders,
      checkpointAnswers,
      answerList,
      topics
    )
  ).forEach((s) => tables.push(s));

  pdf(tables, `Feedback for evaluation ${assessmentId}`, filename);
}
