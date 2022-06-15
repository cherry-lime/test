import * as React from "react";

import { GridColumns } from "@mui/x-data-grid";
import { Theme } from "@mui/material";
import GenericGrid from "../Generic/GenericGrid";

// Define type for the rows in the grid
type Row = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

export default function AssessmentCompletedGrid({ theme }: { theme: Theme }) {
  const [rows, setRows] = React.useState<Row[]>([]);

  // Fetch initial rows of the grid
  React.useEffect(() => {
    // TODO Replace this by API fetch
    setRows(() => []);
  }, []);

  const columns = React.useMemo<GridColumns<Row>>(
    () => [
      {
        field: "userId",
        headerName: "User ID",
        type: "number",
        width: 100,
      },
      {
        field: "title",
        headerName: "Title",
        type: "string",
        flex: 1,
      },
      {
        field: "body",
        headerName: "Body",
        type: "string",
        flex: 1,
      },
    ],
    []
  );

  return <GenericGrid theme={theme} rows={rows} columns={columns} hasToolbar />;
}
