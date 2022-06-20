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
import { Link } from "react-router-dom";

import GenericGrid from "../Generic/GenericGrid";

import { AssessmentType } from "../../../types/AssessmentType";
import {
  handleAddDecorator,
  handleDeleteDecorator,
  handleDuplicateDecorator,
  processRowUpdateDecorator,
} from "../decorators";

// Define type for the rows in the grid
type Row = {
  id: number;
  name: string;
  description: string;
};

// Get row object with default values
const getDefaultRow = () => {
  const defaultRow = {
    id: Date.now(),
    name: "Name...",
    description: "Description...",
  };
  return defaultRow;
};

type TemplateGridProps = {
  theme: Theme;
  assessmentType: AssessmentType;
};

export default function TemplateGrid({
  theme,
  assessmentType,
}: TemplateGridProps) {
  const [rows, setRows] = React.useState<Row[]>([]);

  // Fetch initial rows of the grid
  React.useEffect(() => {
    // TODO Replace this by API fetch
    setRows(() => []);
  }, []);

  // Called when a row is edited
  const processRowUpdate = React.useCallback(
    (newRow: GridRowModel, oldRow: GridRowModel) => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      const handleRowAPI = () => {};

      return processRowUpdateDecorator(handleRowAPI, setRows, newRow, oldRow);
    },
    []
  );

  // Called when the "Delete" action is pressed in the menu
  const handleDelete = React.useCallback(
    (rowId: GridRowId) => () => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      const handleAPI = () => {};

      handleDeleteDecorator(handleAPI, setRows, rowId);
    },
    []
  );

  // Called when the "Duplicate" action is pressed in the menu
  const handleDuplicate = React.useCallback(
    (row: GridRowModel) => () => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      const handleAPI = () => {};

      handleDuplicateDecorator(handleAPI, setRows, row);
    },
    []
  );

  // Called when the "Add" button is pressed below the grid
  const handleAdd = React.useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const handleAPI = () => {};

    handleAddDecorator(handleAPI, setRows, getDefaultRow());
  }, [rows]);

  const columns = React.useMemo<GridColumns<Row>>(
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
        getActions: (params: { id: GridRowId; row: Row }) => [
          <GridActionsCellItem
            icon={
              <Tooltip title="Visit">
                <Link
                  to={`/admin/templates/${params.id}`}
                  data-testid={`template-${params.id}`}
                >
                  <ArrowForwardIcon />
                </Link>
              </Tooltip>
            }
            label="Visit"
          />,
          <GridActionsCellItem
            icon={<FileCopyIcon />}
            label="Duplicate"
            onClick={handleDuplicate(params.row)}
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
    [handleDuplicate, handleDelete]
  );

  return (
    <GenericGrid
      theme={theme}
      rows={rows}
      columns={columns}
      processRowUpdate={processRowUpdate}
      hasToolbar
      add={{
        text: `CREATE NEW ${assessmentType} EVALUATION TEMPLATE`,
        handler: handleAdd,
      }}
    />
  );
}
