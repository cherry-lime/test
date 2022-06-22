import JsPDF from "jspdf";

type Heading = {
  key: string;
  display: string;
};

type Recommendation = {
  order: number;
  description: string;
  additionalInfo: string;
};

export default function pdf({
  data,
  headers,
  filename,
}: {
  data: Recommendation[];
  headers: Heading[];
  filename: string;
}) {
  const doc = new JsPDF({
    orientation: "l",
    unit: "pt",
    format: "a4",
  });

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

  doc.setFontSize(8);

  const xPositions: number[] = [];

  headers.forEach((heading: { display: string }, index: number) => {
    // Here we are starting at pageMargin's xPosition plus whatever index we are on
    // multiplied by the number of columns needed
    // column 1 starts at: pageMargin(50pt) + index(0) * (liveArea(791)/amountOfColumns(4))(791/4 = 197.75pt per column) = 50
    // column 2 starts at: 50 + 1 * 197.75 =  247.75
    // column 3 starts at: 50 + 2 * 197.75 =  445.5
    // column 4 starts at: 50 + 3 * 197.75 =  643.25
    const xPositionForCurrentHeader =
      pageMargin + index * (liveArea.width / headers.length);
    const yPositionForHeaders = pageMargin;
    doc.text(
      heading.display,
      index === 0
        ? xPositionForCurrentHeader
        : xPositionForCurrentHeader + padding,
      yPositionForHeaders
    );

    // We will also need some way to track these xPositions and the column width,
    // So let's push them to an array that will key off of their index
    xPositions.push(
      index === 0
        ? xPositionForCurrentHeader
        : xPositionForCurrentHeader + padding
    );
  });
  doc.line(pageMargin, pageMargin + 3.5, liveArea.width, pageMargin + 3.5);

  const baseYPosForRows = pageMargin + padding;
  let nextYPos = baseYPosForRows;

  // ROWS
  data.forEach((row: { [x: string]: unknown }) => {
    // Here we are going to collect all columns potential max heights
    // Before we determine the nextYPosition we have to grab the tallest value
    // and add that to the previous height.
    const rowHeights: number[] = [];

    /*
     *
     * Row styles go here
     *
     * */

    // COLUMNS
    headers.forEach((column, cIndex) => {
      const longText = doc.splitTextToSize(
        String(row[column.key]),
        cIndex !== 0
          ? xPositions[cIndex] - xPositions[cIndex - 1]
          : xPositions[cIndex]
      );
      const rowHeight = longText.length * doc.getLineHeight();
      rowHeights.push(rowHeight);

      /*
       *
       *  Column styles go here
       *
       * */

      doc.text(longText, xPositions[cIndex], nextYPos);
      // if (_row[column.subKey]) {
      //   const longMeta = doc.splitTextToSize(_row[column.subKey], column.width)
      //   doc.text(longMeta, 50, nextYPos + 25)
      // }
    });

    nextYPos = nextYPos + padding + Math.max(...rowHeights, 30);

    // When generating looped data, you may need to add pages manually.
    // The good thing is that we've defined our live area boundaries,
    // and can add a new page when our yPosition exceeds them. We need
    // to take some care to reset the yPosition because if you don't:
    // the yPosition will persist to the next page, and more than likely
    // disappear from view as your yPosition grows.
    if (nextYPos > liveArea.height) {
      doc.addPage();
      nextYPos = baseYPosForRows;
    }
  });

  doc.save(filename);
}
