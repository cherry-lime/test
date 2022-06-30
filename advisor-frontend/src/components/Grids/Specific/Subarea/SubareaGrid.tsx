import * as React from "react";
import { UseMutationResult } from "react-query";

import {
  GridActionsCellItem,
  GridColumns,
  GridPreProcessEditCellProps,
  GridRowId,
} from "@mui/x-data-grid";
import { Theme } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import UpwardIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import DownwardIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { IconButton } from "@mui/material";

import GenericGrid from "../../Generic/GenericGrid";

import {
  handleAdd,
  handleDelete,
  handleInit,
  handleMove,
  preProcessEditOrder,
  processRowUpdate,
} from "../handlers";

import {
  SubareaAPP,
  usePatchSubarea,
  usePostSubarea,
  useDeleteSubarea,
  useGetSubareas,
} from "../../../../api/SubareaAPI";

import ErrorPopup, { RefObject } from "../../../ErrorPopup/ErrorPopup";

type SubareaGridProps = {
  theme: Theme;
  categoryId: number;
};

export default function SubareaGrid({ theme, categoryId }: SubareaGridProps) {
  const [rows, setRows] = React.useState<SubareaAPP[]>([]);

  // Ref for error popup
  const ref = React.useRef<RefObject>(null);

  // Subarea query
  const { status, data } = useGetSubareas(categoryId, undefined, ref);

  // Subarea mutations
  const patchSubarea = usePatchSubarea(ref);
  const postSubarea = usePostSubarea(categoryId, ref);
  const deleteSubarea = useDeleteSubarea(ref);

  // Called when "status" of subareas query is changed
  React.useEffect(() => {
    handleInit(setRows, status, data);
  }, [status, data]);

  // Called when the 'Order' column is edited
  const preProcessEditOrderDecorator = React.useCallback(
    (params: GridPreProcessEditCellProps) =>
      preProcessEditOrder(rows, params, ref),
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
      handleMove(
        setRows,
        patchSubarea as UseMutationResult,
        {
          ...row,
          order: row.order - 1,
        },
        ref
      );
    },
    []
  );

  // Called when the "Downward" action is pressed
  const handleDownwardDecorator = React.useCallback(
    (row: SubareaAPP) => () => {
      handleMove(
        setRows,
        patchSubarea as UseMutationResult,
        {
          ...row,
          order: row.order + 1,
        },
        ref
      );
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
          <div className="parent">
            <div className="child">
              <IconButton onClick={handleUpwardDecorator(params.row)}>
                <UpwardIcon />
              </IconButton>
            </div>
            <div className="child">
              <IconButton onClick={handleDownwardDecorator(params.row)}>
                <DownwardIcon />
              </IconButton>
            </div>
          </div>
        ),
      },
      {
        field: "order",
        headerName: "Order",
        headerAlign: "center",
        align: "center",
        type: "number",
        width: 75,
        editable: true,
        preProcessEditCellProps: preProcessEditOrderDecorator,
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
        field: "enabled",
        headerName: "Enabled",
        type: "boolean",
        width: 75,
        editable: true,
      },
      {
        field: "actions",
        type: "actions",
        width: 75,
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
    [
      handleUpwardDecorator,
      handleDownwardDecorator,
      preProcessEditOrderDecorator,
      handleDeleteDecorator,
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
      <ErrorPopup ref={ref} />
    </>
  );
}
