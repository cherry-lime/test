import * as React from "react";
import { BlockPicker, ColorResult } from "react-color";
import { UseMutationResult } from "react-query";
import { Link } from "react-router-dom";

import {
  GridActionsCellItem,
  GridColumns,
  GridPreProcessEditCellProps,
  GridRowId,
} from "@mui/x-data-grid";
import { Theme } from "@mui/material/styles";
import { IconButton, Tooltip } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DeleteIcon from "@mui/icons-material/Delete";
import UpwardIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import DownwardIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

import GenericGrid from "../../Generic/GenericGrid";

import {
  handleAdd,
  handleChange,
  handleDelete,
  handleInit,
  handleMove,
  preProcessEditOrder,
  processRowUpdate,
} from "../handlers";

import {
  CategoryAPP,
  useDeleteCategory,
  useGetCategories,
  usePatchCategory,
  usePostCategory,
} from "../../../../api/CategoryAPI";

import ErrorPopup, { RefObject } from "../../../ErrorPopup/ErrorPopup";

type CategoryGridProps = {
  theme: Theme;
  templateId: number;
};

export default function CategoryGrid({ theme, templateId }: CategoryGridProps) {
  const [rows, setRows] = React.useState<CategoryAPP[]>([]);

  // Ref for error popup
  const ref = React.useRef<RefObject>(null);

  // Category query
  const { status, data } = useGetCategories(templateId, undefined, ref);

  // Category mutations
  const patchCategory = usePatchCategory(ref);
  const postCategory = usePostCategory(templateId, ref);
  const deleteCategory = useDeleteCategory(ref);

  // Called when "status" of categories query is changed
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
    async (newRow: CategoryAPP, oldRow: CategoryAPP) =>
      processRowUpdate(
        setRows,
        patchCategory as UseMutationResult,
        newRow,
        oldRow
      ),
    []
  );

  // Called when the "Upward" action is pressed
  const handleUpwardDecorator = React.useCallback(
    (row: CategoryAPP) => () => {
      handleMove(setRows, patchCategory as UseMutationResult, {
        ...row,
        order: row.order - 1,
      });
    },
    []
  );

  // Called when the "Downward" action is pressed
  const handleDownwardDecorator = React.useCallback(
    (row: CategoryAPP) => () => {
      handleMove(setRows, patchCategory as UseMutationResult, {
        ...row,
        order: row.order + 1,
      });
    },
    []
  );

  // Called when color picker registers a complete change
  const handleColorChange = React.useCallback(
    (color: ColorResult, row: CategoryAPP) => {
      handleChange(
        setRows,
        patchCategory as UseMutationResult,
        { ...row, color: color.hex },
        row
      );
    },
    []
  );

  // Called when the "Delete" action is pressed in the menu
  const handleDeleteDecorator = React.useCallback(
    (rowId: GridRowId) => () => {
      handleDelete(
        setRows,
        deleteCategory as UseMutationResult,
        rowId as number
      );
    },
    []
  );

  // Called when the "Add" button is pressed below the grid
  const handleAddDecorator = React.useCallback(() => {
    handleAdd(setRows, postCategory as UseMutationResult);
  }, []);

  const columns = React.useMemo<GridColumns<CategoryAPP>>(
    () => [
      {
        field: "",
        width: 50,
        renderCell: (params: { row: CategoryAPP }) => (
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
        field: "color",
        headerName: "Color Theme",
        flex: 1,
        editable: false,
        renderCell: (params: { row: CategoryAPP }) => (
          <BlockPicker
            width="250px"
            colors={[]}
            triangle="hide"
            color={params.row.color}
            onChangeComplete={(color: ColorResult) =>
              handleColorChange(color, params.row)
            }
            styles={{
              default: {
                head: {
                  height: "50px",
                  borderStyle: "solid",
                  borderColor:
                    params.row.order % 2 === 0
                      ? theme.palette.secondary.light
                      : "white",
                },
                body: {
                  backgroundColor:
                    params.row.order % 2 === 0
                      ? theme.palette.secondary.light
                      : "white",
                },
              },
            }}
          />
        ),
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
        width: 125,
        getActions: (params: { id: GridRowId; row: CategoryAPP }) => [
          <GridActionsCellItem
            icon={
              <Tooltip title="Visit">
                <Link to={`/admin/templates/${templateId}/${params.id}`}>
                  <ArrowForwardIcon className="arrowIcon" />
                </Link>
              </Tooltip>
            }
            label="Visit"
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
    [
      handleUpwardDecorator,
      handleDownwardDecorator,
      preProcessEditOrderDecorator,
      handleColorChange,
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
          text: "CREATE NEW AREA",
          handler: handleAddDecorator,
        }}
      />
      <ErrorPopup ref={ref} />
    </>
  );
}
