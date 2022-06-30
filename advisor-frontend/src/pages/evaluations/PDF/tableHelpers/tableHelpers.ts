import JsPDF from "jspdf";

export function nextYCheckEndOfPage(
  doc: JsPDF,
  nextY: number,
  endOfPage: number,
  pageMargin: number,
  addition = 0
) {
  if (nextY + addition >= endOfPage) {
    doc.addPage();
    return pageMargin;
  }
  return nextY;
}

export function generateTableHeaders(
  doc: JsPDF,
  headers: string[],
  docProps: {
    pageMargin: number;
    liveArea: { width: number; height: number };
    padding: number;
  },
  nextYValue: number,
  firstColWidth: number,
  colWidth: number
) {
  let nextY = nextYValue;
  const { liveArea, pageMargin, padding } = docProps;
  const xPositions: number[] = [];
  headers.forEach((heading: string, index: number) => {
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

  return { xPositions, nextY };
}

export function generateTableRow(
  doc: JsPDF,
  headers: string[],
  row: (string | number)[],
  colWidth: number,
  padding: number,
  firstColWidth: number,
  xPositions: number[],
  nextY: number
) {
  const rowHeights: number[] = [];
  // iterate columns
  headers.forEach((_column: string, cIndex) => {
    const longText = doc.splitTextToSize(
      String(row[cIndex]),
      cIndex !== 0 ? colWidth - padding * 2 : firstColWidth - padding * 2
    );
    const rowHeight = longText.length * doc.getLineHeight();
    rowHeights.push(rowHeight);

    doc.text(longText, xPositions[cIndex], nextY);
  });

  return rowHeights;
}

export function generateText(
  doc: JsPDF,
  text: string,
  docProps: {
    pageMargin: number;
    liveArea: { width: number; height: number };
    padding: number;
  },
  fontSize: number,
  nextYValue: number,
  fontWeight = "normal"
) {
  let nextY = nextYValue;
  if (text !== "") {
    doc.setFontSize(fontSize).setFont(doc.getFont().fontName, fontWeight);
    const { liveArea, pageMargin } = docProps;

    const textfield = doc.splitTextToSize(String(text), liveArea.width);
    const textfieldHeight = textfield.length * doc.getLineHeight();

    nextY = nextYCheckEndOfPage(doc, nextY, liveArea.height, textfieldHeight);

    doc.text(textfield, pageMargin, nextY);

    nextY += 3 + textfieldHeight;
  }
  return nextY;
}
