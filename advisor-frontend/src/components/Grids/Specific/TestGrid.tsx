import * as React from "react";
import { QueryKey, useQuery, useMutation } from "react-query";
import axios from "axios";

import { GridActionsCellItem, GridColumns, GridRowId } from "@mui/x-data-grid";
import { Theme } from "@mui/material";
import FileCopyIcon from "@mui/icons-material/FileCopy";

import GenericGrid from "../Generic/GenericGrid";

import { handleDuplicateDecorator } from "../decorators";

// Define type for the rows in the grid
type Row = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

function useData(key: QueryKey, url: string) {
  return useQuery(key, async () => {
    const { data } = await axios.get(url);
    return data;
  });
}

export default function TestGrid({ theme }: { theme: Theme }) {
  const [rows, setRows] = React.useState<Row[]>([]);

  const { status, data, error, isFetching } = useData(
    ["parameter 1", "parameter 2"],
    "https://jsonplaceholder.typicode.com/posts"
  );

  // Fetch initial rows of the grid
  React.useEffect(() => {
    if (status === "success") {
      setRows(() => data);
    }
  }, [status, data, error, isFetching]);

  const mutation = useMutation((row: Row) => axios.post("/todos", row));

  const handleDuplicate = React.useCallback(
    (row: Row) => () => {
      mutation.mutate(row, {
        onSuccess: (dat, variables, context) => {
          console.log(`SUCCESS DATA: ${dat}`);
          console.log(`SUCCESS VARIABLES: ${variables}`);
          console.log(`SUCCESS CONTEXT: ${context}`);

          handleDuplicateDecorator(setRows, row);
        },
        onError: (err, variables, context) => {
          console.log(`ERROR ERROR: ${err}`);
          console.log(`ERROR VARIABLES: ${variables}`);
          console.log(`ERROR CONTEXT: ${context}`);

          handleDuplicateDecorator(setRows, row);
        },
      });
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
            onClick={handleDuplicate(params.row)}
          />,
        ],
      },
    ],
    []
  );

  return <GenericGrid theme={theme} rows={rows} columns={columns} hasToolbar />;
}
