import * as React from "react";

import {
  GridActionsCellItem,
  GridColumns,
  GridRowId,
  GridRowModel,
} from "@mui/x-data-grid";
import { Theme } from "@mui/material/styles";
import { Tooltip } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import DeleteIcon from "@mui/icons-material/Delete";

import GenericGrid from "../../Generic/GenericGrid";
import { AssessmentType } from "../../../../types/AssessmentType";
import {
  Row,
  useDeleteTemplate,
  useDuplicateTemplate,
  useGetTemplates,
  usePatchTemplate,
  usePostTemplate,
} from "./TemplateAPI";
import { processRowUpdate } from "../helpers";

type TemplateGridProps = {
  theme: Theme;
  assessmentType: AssessmentType;
};

export default function TemplateGrid({
  theme,
  assessmentType,
}: TemplateGridProps) {
  const [rows, setRows] = React.useState<Row[]>([]);

  // Get and set initial rows
  useGetTemplates(setRows, assessmentType);

  // Mutations
  const patchTemplate = usePatchTemplate();
  const postTemplate = usePostTemplate(setRows);
  const deleteTemplate = useDeleteTemplate(setRows);
  const duplicateTemplate = useDuplicateTemplate(setRows);

  // Called when a row is edited
  const processRowUpdateDecorator = React.useCallback(
    async (newRow: Row, oldRow: Row) => {
      const mutate = async (row: Row) => {
        await patchTemplate.mutateAsync(row);
      };

      return processRowUpdate(setRows, newRow, oldRow, mutate);
    },
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
  const handleDelete = React.useCallback(
    (rowId: GridRowId) => () => {
      deleteTemplate.mutate(rowId as number);
    },
    []
  );

  // Called when the "Duplicate" action is pressed in the menu
  const handleDuplicate = React.useCallback(
    (rowId: GridRowId) => () => {
      duplicateTemplate.mutate(rowId as number);
    },
    []
  );

  // Called when the "Add" button is pressed below the grid
  const handleAdd = React.useCallback(() => {
    postTemplate.mutate(assessmentType);
  }, []);

  const columns = React.useMemo<GridColumns<GridRowModel>>(
    () => [
      {
        field: "name",
        headerName: "Name",
        type: "string",
        flex: 1,
        editable: true,
      },
      {
        field: "description",
        headerName: "Description",
        type: "string",
        flex: 1,
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
            icon={<FileCopyIcon />}
            label="Duplicate"
            onClick={handleDuplicate(params.id)}
            showInMenu
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDelete(params.id)}
            showInMenu
          />,
        ],
      },
    ],
    [handleVisit, handleDuplicate, handleDelete]
  );

  return (
    <GenericGrid
      theme={theme}
      rows={rows}
      columns={columns}
      processRowUpdate={processRowUpdateDecorator}
      hasToolbar
      add={{
        text: `CREATE NEW ${assessmentType} EVALUATION TEMPLATE`,
        handler: handleAdd,
      }}
    />
  );
}
