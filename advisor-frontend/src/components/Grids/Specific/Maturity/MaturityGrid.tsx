import * as React from "react";
import { UseMutationResult } from "react-query";

import {
  GridActionsCellItem,
  GridColumns,
  GridPreProcessEditCellProps,
  GridRowId,
} from "@mui/x-data-grid";
import { Theme } from "@mui/material/styles";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import UpwardIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import DownwardIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

import GenericGrid from "../../Generic/GenericGrid";

import {
  handleAdd,
  handleDelete,
  handleInit,
  handleMove,
  preProcessEditOrder,
  processRowUpdate,
} from "../../functions/handlers/handlers";

import {
  MaturityAPP,
  useDeleteMaturity,
  useGetMaturities,
  usePatchMaturity,
  usePostMaturity,
} from "../../../../api/MaturityAPI";

import ErrorPopup, { RefObject } from "../../../ErrorPopup/ErrorPopup";

type MaturityGridProps = {
  theme: Theme;
  templateId: number;
};

export default function MaturityGrid({ theme, templateId }: MaturityGridProps) {
  const [rows, setRows] = React.useState<MaturityAPP[]>([]);

  // Ref for error popup
  const ref = React.useRef<RefObject>(null);

  // Maturity query
  const { status, data } = useGetMaturities(templateId, undefined, ref);

  // Maturity mutations
  const patchMaturity = usePatchMaturity(ref);
  const postMaturity = usePostMaturity(templateId, ref);
  const deleteMaturity = useDeleteMaturity(ref);

  // Called when "status" of maturities query is changed
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
    async (newRow: MaturityAPP, oldRow: MaturityAPP) =>
      processRowUpdate(
        setRows,
        patchMaturity as UseMutationResult,
        newRow,
        oldRow
      ),
    []
  );

  // Called when the "Upward" action is pressed
  const handleUpwardDecorator = React.useCallback(
    (row: MaturityAPP) => () => {
      handleMove(setRows, patchMaturity as UseMutationResult, {
        ...row,
        order: row.order - 1,
      });
    },
    []
  );

  // Called when the "Downward" action is pressed
  const handleDownwardDecorator = React.useCallback(
    (row: MaturityAPP) => () => {
      handleMove(setRows, patchMaturity as UseMutationResult, {
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
        deleteMaturity as UseMutationResult,
        rowId as number
      );
    },
    []
  );

  // Called when the "Add" button is pressed below the grid
  const handleAddDecorator = React.useCallback(() => {
    handleAdd(setRows, postMaturity as UseMutationResult);
  }, []);

  const columns = React.useMemo<GridColumns<MaturityAPP>>(
    () => [
      {
        field: "",
        width: 50,
        renderCell: (params: { row: MaturityAPP }) => (
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
          text: "CREATE NEW MATURITY LEVEL",
          handler: handleAddDecorator,
        }}
      />
      <ErrorPopup ref={ref} />
    </>
  );
}
