import * as React from "react";

import { GridActionsCellItem, GridColumns, GridRowId } from "@mui/x-data-grid";
import { Theme } from "@mui/material";
import FileCopyIcon from "@mui/icons-material/FileCopy";

import GenericGrid from "../Generic/GenericGrid";

import { handleDuplicate } from "./handlers";
import { useGet, usePost } from "../../../api";

// Define type for the rows in the grid
type Row = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

export default function TestGrid({ theme }: { theme: Theme }) {
  const [rows, setRows] = React.useState<Row[]>([]);

  const { status, data, error } = useGet(
    ["parameter 1", "parameter 2"],
    "https://jsonplaceholder.typicode.com/posts"
  );

  // Fetch initial rows of the grid
  React.useEffect(() => {
    if (status === "success") {
      setRows(() => data);
    }
  }, [status]);

  const duplicateMutation = usePost<Row>(["testDuplicate", "testId"]);

  const handleDuplicateDecorator = React.useCallback(
    (row: Row) => () => {
      duplicateMutation.mutate(
        { url: "/post", body: row },
        {
          onSuccess: (dat, variables) => {
            console.log(`SUCCESS DATA: ${dat}`);
            console.log(`SUCCESS VARIABLES: ${JSON.stringify(variables)}`);

            handleDuplicate(setRows, row);
          },
          onError: (err, variables) => {
            console.log(`ERROR ERROR: ${err}`);
            console.log(`ERROR VARIABLES: ${JSON.stringify(variables)}`);

            handleDuplicate(setRows, row);
          },
        }
      );
    },
    []
  );

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
      {
        field: "actions",
        type: "actions",
        width: 75,
        getActions: (params: { id: GridRowId; row: Row }) => [
          <GridActionsCellItem
            icon={<FileCopyIcon />}
            label="Duplicate"
            onClick={handleDuplicateDecorator(params.row)}
          />,
        ],
      },
    ],
    [handleDuplicateDecorator]
  );

  return <GenericGrid theme={theme} rows={rows} columns={columns} hasToolbar />;
}
