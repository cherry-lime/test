import * as React from "react";
import { QueryKey, useQuery } from "react-query";
import axios from "axios";

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
