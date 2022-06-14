import * as React from "react";

import {
  GridActionsCellItem,
  GridColumns,
  GridPreProcessEditCellProps,
  GridRowId,
  GridRowModel,
  GridValueFormatterParams,
} from "@mui/x-data-grid";
import { Theme } from "@mui/material/styles";
import { Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import GenericGrid from "../Generic/GenericGrid";
import {
  handleAddDecorator,
  handleDeleteDecorator,
  processRowUpdateDecorator,
} from "../decorators";

// Define type for the rows in the grid
type Row = {
  id: number;
  label: string;
  value: number;
  enabled: boolean;
};

// Get row object with default values
const getDefaultRow = () => {
  const defaultRow = {
    id: Date.now(),
    label: "Label...",
    value: 0,
    enabled: false,
  };
  return defaultRow;
};

type AnswerTypeGridProps = {
  theme: Theme;
  templateId: number;
};

export default function AnswerTypeGrid({
  theme,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  templateId,
}: AnswerTypeGridProps) {
  const [rows, setRows] = React.useState<Row[]>([]);

  // Fetch initial rows of the grid
  React.useEffect(() => {
    // TODO Replace this by API fetch
    setRows(() => []);
  }, []);

  // Called when the 'Order' column is edited
  const preProcessEditValue = React.useCallback(
    (params: GridPreProcessEditCellProps) => {
      const { value } = params.props;

      // If value is below 0, above 100, or null: reject
      const hasError = value < 0 || value > 100 || value === null;

      return { ...params.props, error: hasError };
    },
    [rows]
  );

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

  // Called when the "Add" button is pressed below the grid
  const handleAdd = React.useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const handleAPI = () => {};

    handleAddDecorator(handleAPI, setRows, getDefaultRow());
  }, [rows]);

  const columns = React.useMemo<GridColumns<Row>>(
    () => [
      {
        field: "label",
        headerName: "Label",
        type: "string",
        flex: 1,
        editable: true,
      },
      {
        field: "value",
        headerName: "Value",
        headerAlign: "left",
        align: "left",
        type: "number",
        flex: 1,
        editable: true,
        preProcessEditCellProps: preProcessEditValue,
        valueFormatter: (params: GridValueFormatterParams<number>) =>
          `${params.value} %`,
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
        getActions: (params: { id: GridRowId; row: Row }) => [
          <GridActionsCellItem
            icon={
              <Tooltip title="Delete">
                <DeleteIcon />
              </Tooltip>
            }
            label="Delete"
            onClick={handleDelete(params.id)}
          />,
        ],
      },
    ],
    [handleDelete]
  );

  return (
    <GenericGrid
      theme={theme}
      rows={rows}
      columns={columns}
      processRowUpdate={processRowUpdate}
      hasToolbar
      add={{
        text: "ADD ANSWER OPTION",
        handler: handleAdd,
      }}
    />
  );
}
