import * as React from "react";
import { QueryKey, useQuery, useMutation, MutationKey } from "react-query";
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

function useGet(key: QueryKey, url: string) {
  return useQuery(key, async () => {
    const { data } = await axios.get(url);
    return data;
  });
}

function usePost<BodyType>(key: MutationKey) {
  return useMutation(key, (variables: { url: string; body: BodyType }) =>
    axios.post(variables.url, variables.body)
  );
}

function usePatch<BodyType>(key: MutationKey) {
  return useMutation(key, (variables: { url: string; body: BodyType }) =>
    axios.patch(variables.url, variables.body)
  );
}

function useDelete(key: MutationKey) {
  return useMutation(key, (url: string) => axios.delete(url));
}

export default function TestGrid({ theme }: { theme: Theme }) {
  const [rows, setRows] = React.useState<Row[]>([]);

  const postMutation = usePost<Row>(["test", "testId"]);

  const { status, data, error, isFetching } = useGet(
    ["parameter 1", "parameter 2"],
    "https://jsonplaceholder.typicode.com/posts"
  );

  // Fetch initial rows of the grid
  React.useEffect(() => {
    if (status === "success") {
      setRows(() => data);
    }
  }, [status, data, error, isFetching]);

  const handleDuplicate = React.useCallback(
    (row: Row) => () => {
      postMutation.mutate(
        { url: "/post", body: row },
        {
          onSuccess: (dat, variables) => {
            console.log(`SUCCESS DATA: ${dat}`);
            console.log(`SUCCESS VARIABLES: ${JSON.stringify(variables)}`);

            handleDuplicateDecorator(setRows, row);
          },
          onError: (err, variables) => {
            console.log(`ERROR ERROR: ${err}`);
            console.log(`ERROR VARIABLES: ${JSON.stringify(variables)}`);

            handleDuplicateDecorator(setRows, row);
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
            onClick={handleDuplicate(params.row)}
          />,
        ],
      },
    ],
    []
  );

  return <GenericGrid theme={theme} rows={rows} columns={columns} hasToolbar />;
}
