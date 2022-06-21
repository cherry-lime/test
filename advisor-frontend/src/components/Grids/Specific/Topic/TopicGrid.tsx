import * as React from "react";
import { UseMutationResult } from "react-query";

import { GridActionsCellItem, GridColumns, GridRowId } from "@mui/x-data-grid";
import { Theme } from "@mui/material/styles";
import { Tooltip } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DeleteIcon from "@mui/icons-material/Delete";

import GenericGrid from "../../Generic/GenericGrid";

import {
  handleAdd,
  handleDelete,
  handleInit,
  processRowUpdate,
} from "../handlersNew";

import {
  TopicRow,
  useDeleteTopic,
  useGetTopics,
  usePatchTopic,
  usePostTopic,
} from "./TopicAPI";

type TopicGridProps = {
  theme: Theme;
  templateId: number;
};

export default function TopicGrid({ theme, templateId }: TopicGridProps) {
  const [rows, setRows] = React.useState<TopicRow[]>([]);

  // Topic query
  const { status, data, error } = useGetTopics(templateId);

  // Topic mutations
  const patchTopic = usePatchTopic();
  const postTopic = usePostTopic(templateId);
  const deleteTopic = useDeleteTopic();

  // Called when "status" of templates query is changed
  React.useEffect(() => {
    handleInit(setRows, status, data, error);
  }, [status]);

  // Called when a row is edited
  const processRowUpdateDecorator = React.useCallback(
    async (newRow: TopicRow, oldRow: TopicRow) =>
      processRowUpdate(
        setRows,
        patchTopic as UseMutationResult,
        newRow,
        oldRow
      ),
    []
  );

  // Called when the "Visit" action is pressed
  const handleVisit = React.useCallback(
    (rowId: GridRowId) => () => {
      // TODO Replace this by correct link
      window.location.href = `http://google.com/search?q=${rowId}`;
    },
    []
  );

  // Called when the "Delete" action is pressed in the menu
  const handleDeleteDecorator = React.useCallback(
    (rowId: GridRowId) => () => {
      handleDelete(setRows, deleteTopic as UseMutationResult, rowId as number);
    },
    []
  );

  // Called when the "Add" button is pressed below the grid
  const handleAddDecorator = React.useCallback(() => {
    handleAdd(setRows, postTopic as UseMutationResult);
  }, []);

  const columns = React.useMemo<GridColumns<TopicRow>>(
    () => [
      {
        field: "name",
        headerName: "Name",
        type: "string",
        flex: 1,
        editable: true,
      },
      {
        field: "enabled",
        headerName: "Enabled",
        type: "boolean",
        width: 75,
        editable: true,
      },
      {
        field: "actions",
        type: "actions",
        width: 100,
        getActions: (params: { id: GridRowId }) => [
          <GridActionsCellItem
            icon={
              <Tooltip title="Visit">
                <ArrowForwardIcon />
              </Tooltip>
            }
            label="Visit"
            onClick={handleVisit(params.id)}
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteDecorator(params.id)}
            showInMenu
          />,
        ],
      },
    ],
    [handleVisit, handleDeleteDecorator]
  );

  return (
    <GenericGrid
      theme={theme}
      rows={rows}
      columns={columns}
      processRowUpdate={processRowUpdateDecorator}
      hasToolbar
      add={{
        text: "CREATE NEW TOPIC",
        handler: handleAddDecorator,
      }}
    />
  );
}
