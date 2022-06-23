import * as React from "react";
import { UseMutationResult } from "react-query";

import { GridActionsCellItem, GridColumns, GridRowId } from "@mui/x-data-grid";
import { Theme } from "@mui/material/styles";
import { Tooltip } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import DeleteIcon from "@mui/icons-material/Delete";

import GenericGrid from "../../Generic/GenericGrid";
import { AssessmentType } from "../../../../types/AssessmentType";
import {
  TemplateRow,
  useDeleteTemplate,
  useDuplicateTemplate,
  useGetTemplates,
  usePatchTemplate,
  usePostTemplate,
} from "../../../../api/TemplateAPI";
import {
  handleAdd,
  handleDelete,
  handleDuplicate,
  handleInit,
  processRowUpdate,
} from "../handlersNew";

type TemplateGridProps = {
  theme: Theme;
  templateType: AssessmentType;
};

export default function TemplateGrid({
  theme,
  templateType,
}: TemplateGridProps) {
  const [rows, setRows] = React.useState<TemplateRow[]>([]);

  // Template query
  const { status, data, error } = useGetTemplates(templateType);

  // Template mutations
  const patchTemplate = usePatchTemplate();
  const postTemplate = usePostTemplate(templateType);
  const deleteTemplate = useDeleteTemplate();
  const duplicateTemplate = useDuplicateTemplate();

  // Called when "status" of templates query is changed
  React.useEffect(() => {
    handleInit(setRows, status, data, error);
  }, [status]);

  // Called when a row is edited
  const processRowUpdateDecorator = React.useCallback(
    async (newRow: TemplateRow, oldRow: TemplateRow) =>
      processRowUpdate(
        setRows,
        patchTemplate as UseMutationResult,
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
      handleDelete(
        setRows,
        deleteTemplate as UseMutationResult,
        rowId as number
      );
    },
    []
  );

  // Called when the "Duplicate" action is pressed in the menu
  const handleDuplicateDecorator = React.useCallback(
    (rowId: GridRowId) => () => {
      handleDuplicate(
        setRows,
        duplicateTemplate as UseMutationResult,
        rowId as number
      );
    },
    []
  );

  // Called when the "Add" button is pressed below the grid
  const handleAddDecorator = React.useCallback(() => {
    handleAdd(setRows, postTemplate as UseMutationResult);
  }, []);

  const columns = React.useMemo<GridColumns<TemplateRow>>(
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
            onClick={handleDuplicateDecorator(params.id)}
            showInMenu
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
    [handleVisit, handleDuplicateDecorator, handleDeleteDecorator]
  );

  return (
    <GenericGrid
      theme={theme}
      rows={rows}
      columns={columns}
      processRowUpdate={processRowUpdateDecorator}
      hasToolbar
      add={{
        text: `CREATE NEW ${templateType} EVALUATION TEMPLATE`,
        handler: handleAddDecorator,
      }}
    />
  );
}
