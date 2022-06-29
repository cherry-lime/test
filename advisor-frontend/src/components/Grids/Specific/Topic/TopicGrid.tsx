import * as React from "react";
import { UseMutationResult } from "react-query";

import { GridActionsCellItem, GridColumns, GridRowId } from "@mui/x-data-grid";
import { Theme } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";

import GenericGrid from "../../Generic/GenericGrid";

import ErrorPopup, { RefObject } from "../../../ErrorPopup/ErrorPopup";

import {
  handleAdd,
  handleDelete,
  handleInit,
  processRowUpdate,
} from "../handlers";

import {
  TopicAPP,
  useDeleteTopic,
  useGetTopics,
  usePatchTopic,
  usePostTopic,
} from "../../../../api/TopicAPI";

type TopicGridProps = {
  theme: Theme;
  templateId: number;
};

export default function TopicGrid({ theme, templateId }: TopicGridProps) {
  const [rows, setRows] = React.useState<TopicAPP[]>([]);

  // Ref for error popup
  const ref = React.useRef<RefObject>(null);

  // Topic query
  const { status, data } = useGetTopics(templateId, undefined, ref);

  // Topic mutations
  const patchTopic = usePatchTopic(ref);
  const postTopic = usePostTopic(templateId, ref);
  const deleteTopic = useDeleteTopic(ref);

  // Called when "status" of templates query is changed
  React.useEffect(() => {
    handleInit(setRows, status, data);
  }, [status, data]);

  // Called when a row is edited
  const processRowUpdateDecorator = React.useCallback(
    async (newRow: TopicAPP, oldRow: TopicAPP) =>
      processRowUpdate(
        setRows,
        patchTopic as UseMutationResult,
        newRow,
        oldRow
      ),
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

  const columns = React.useMemo<GridColumns<TopicAPP>>(
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
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteDecorator(params.id)}
            showInMenu
          />,
        ],
      },
    ],
    [handleDeleteDecorator]
  );

  return (
    <>
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
      <ErrorPopup ref={ref} />
    </>
  );
}
