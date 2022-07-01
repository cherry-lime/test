import * as React from "react";

import {
  GridActionsCellItem,
  GridRowId,
  GridColumns,
  GridPreProcessEditCellProps,
} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { Theme } from "@mui/material/styles";

import { UseMutationResult } from "react-query";

import {
  processRowUpdate,
  handleDelete,
  handleMove,
  preProcessEditOrder,
  handleInit,
  handleAdd,
} from "../../functions/handlers/handlers";

import GenericGrid from "../../Generic/GenericGrid";

import {
  SubareaAPP,
  usePatchSubarea,
  usePostSubarea,
  useDeleteSubarea,
  useGetSubareas,
} from "../../../../api/SubareaAPI/SubareaAPI";

import ErrorPopup, {
  getOnError,
  RefObject,
} from "../../../ErrorPopup/ErrorPopup";
import { RenderEditCell } from "../columns";

type SubareaGridProps = {
  theme: Theme;
  categoryId: number;
};

export default function SubareaGrid({ theme, categoryId }: SubareaGridProps) {
  const [rows, setRows] = React.useState<SubareaAPP[]>([]);

  // Error handling
  const refErrorSubarea = React.useRef<RefObject>(null);
  const onErrorSubarea = getOnError(refErrorSubarea);

  // Subarea query
  const { status, data } = useGetSubareas(
    categoryId,
    undefined,
    onErrorSubarea
  );

  // Subarea mutations
  const patchSubarea = usePatchSubarea(onErrorSubarea);
  const postSubarea = usePostSubarea(categoryId, onErrorSubarea);
  const deleteSubarea = useDeleteSubarea(onErrorSubarea);

  // Called when "status" of subareas query is changed
  React.useEffect(() => {
    handleInit(setRows, status, data);
  }, [status, data]);

  // Called when the 'Order' column is edited
  const preProcessEditOrderDecorator = React.useCallback(
    (params: GridPreProcessEditCellProps) =>
      preProcessEditOrder(rows, params, onErrorSubarea),
    [rows]
  );

  // Called when a row is edited
  const processRowUpdateDecorator = React.useCallback(
    async (newRow: SubareaAPP, oldRow: SubareaAPP) =>
      processRowUpdate(
        setRows,
        patchSubarea as UseMutationResult,
        newRow,
        oldRow
      ),
    []
  );

  // Called when the "Upward" action is pressed
  const handleUpwardDecorator = React.useCallback(
    (row: SubareaAPP) => () => {
      handleMove(setRows, patchSubarea as UseMutationResult, {
        ...row,
        order: row.order - 1,
      });
    },
    []
  );

  // Called when the "Downward" action is pressed
  const handleDownwardDecorator = React.useCallback(
    (row: SubareaAPP) => () => {
      handleMove(setRows, patchSubarea as UseMutationResult, {
        ...row,
        order: row.order + 1,
      });
    },
    []
  );

  // Called when the "Delete" action is pressed in the menu
  const handleDeleteDecorator = React.useCallback(
    (rowId: GridRowId) => () => {
      handleDelete(
        setRows,
        deleteSubarea as UseMutationResult,
        rowId as number
      );
    },
    []
  );

  // Called when the "Add" button is pressed below the grid
  const handleAddDecorator = React.useCallback(() => {
    handleAdd(setRows, postSubarea as UseMutationResult);
  }, []);

  const columns = React.useMemo<GridColumns<SubareaAPP>>(
    () => [
      {
        field: "",
        width: 50,
        renderCell: (params: { row: SubareaAPP }) => (
          <RenderEditCell
            handleUpward={handleUpwardDecorator(params.row)}
            handleDownward={handleDownwardDecorator(params.row)}
          />
        ),
      },
      {
        preProcessEditCellProps: preProcessEditOrderDecorator,
        field: "order",
        headerName: "Order",
        headerAlign: "center",
        align: "center",
        type: "number",
        width: 75,
        editable: true,
      },
      {
        field: "name",
        headerName: "Name",
        type: "string",
        width: 200,
        editable: true,
      },
      {
        field: "summary",
        headerName: "Summary",
        type: "string",
        editable: true,
        flex: 1,
      },
      {
        field: "description",
        headerName: "Description",
        type: "string",
        editable: true,
        flex: 1,
      },
      {
        field: "enabled",
        type: "boolean",
        headerName: "Enabled",
        editable: true,
        width: 75,
      },
      {
        field: "Actions",
        getActions: (params: { id: GridRowId }) => [
          <GridActionsCellItem
            label="Delete"
            icon={<DeleteIcon />}
            onClick={handleDeleteDecorator(params.id)}
            showInMenu
          />,
        ],
        type: "actions",
        width: 75,
      },
    ],
    [
      handleDeleteDecorator,
      handleUpwardDecorator,
      preProcessEditOrderDecorator,
      handleDownwardDecorator,
    ]
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
          text: "CREATE NEW SUBAREA",
          handler: handleAddDecorator,
        }}
      />
      <ErrorPopup ref={refErrorSubarea} />
    </>
  );
}
