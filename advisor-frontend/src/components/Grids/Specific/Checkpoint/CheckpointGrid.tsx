import * as React from "react";
import { UseMutationResult } from "react-query";

import {
  GridActionsCellItem,
  GridColumns,
  GridPreProcessEditCellProps,
  GridRowId,
} from "@mui/x-data-grid";
import { Theme } from "@mui/material/styles";
import {
  FormControl,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import UpwardIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import DownwardIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

import GenericGrid from "../../Generic/GenericGrid";

import { TopicAPP, useGetTopics } from "../../../../api/TopicAPI";
import { MaturityAPP, useGetMaturities } from "../../../../api/MaturityAPI";

import {
  CheckpointAPP,
  useDeleteCheckpoint,
  useGetCheckpoints,
  usePatchCheckpoint,
  usePostCheckpoint,
} from "../../../../api/CheckpointAPI";

import {
  handleAdd,
  handleChange,
  handleDelete,
  handleInit,
  handleMove,
  preProcessEditOrder,
  processRowUpdate,
} from "../handlers";

import ErrorPopup, { RefObject } from "../../../ErrorPopup/ErrorPopup";

type CheckpointGridProps = {
  theme: Theme;
  templateId: number;
  categoryId: number;
};

export default function CheckpointGrid({
  theme,
  templateId,
  categoryId,
}: CheckpointGridProps) {
  const [rows, setRows] = React.useState<CheckpointAPP[]>([]);
  const [topics, setTopics] = React.useState<TopicAPP[]>([]);
  const [maturities, setMaturities] = React.useState<MaturityAPP[]>([]);

  // Ref for error popup
  const ref = React.useRef<RefObject>(null);

  // Checkpoint queries
  const { status: statusCheckpoints, data: dataCheckpoints } =
    useGetCheckpoints(categoryId, undefined, ref);

  const { status: statusTopics, data: dataTopics } = useGetTopics(
    templateId,
    true,
    ref
  );

  const { status: statusMaturities, data: dataMaturities } = useGetMaturities(
    templateId,
    true,
    ref
  );

  // Checkpoint mutations
  const patchCheckpoint = usePatchCheckpoint(ref);
  const postCheckpoint = usePostCheckpoint(categoryId, ref);
  const deleteCheckpoint = useDeleteCheckpoint(ref);

  // Called when "status" of checkpoints query is changed
  React.useEffect(() => {
    handleInit(setRows, statusCheckpoints, dataCheckpoints);
  }, [statusCheckpoints, dataCheckpoints]);

  // Called when "status" of topics query is changed
  React.useEffect(() => {
    handleInit(setTopics, statusTopics, dataTopics);
  }, [statusTopics, dataTopics]);

  // Called when "status" of maturities query is changed
  React.useEffect(() => {
    handleInit(setMaturities, statusMaturities, dataMaturities);
  }, [statusMaturities, dataMaturities]);

  // Called when the 'Order' column is edited
  const preProcessEditOrderDecorator = React.useCallback(
    (params: GridPreProcessEditCellProps) =>
      preProcessEditOrder(rows, params, ref),
    [rows]
  );

  // Called when a row is edited
  const processRowUpdateDecorator = React.useCallback(
    async (newRow: CheckpointAPP, oldRow: CheckpointAPP) =>
      processRowUpdate(
        setRows,
        patchCheckpoint as UseMutationResult,
        newRow,
        oldRow
      ),
    []
  );

  // Called when the "Upward" action is pressed
  const handleUpwardDecorator = React.useCallback(
    (row: CheckpointAPP) => () => {
      handleMove(
        setRows,
        patchCheckpoint as UseMutationResult,
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
    (row: CheckpointAPP) => () => {
      handleMove(
        setRows,
        patchCheckpoint as UseMutationResult,
        {
          ...row,
          order: row.order + 1,
        },
        ref
      );
    },
    []
  );

  // Called when topic changes
  const handleTopicsChange = React.useCallback(
    (row: CheckpointAPP, event: SelectChangeEvent<string[]>) => {
      const { value } = event.target;
      const topicStrings = typeof value === "string" ? value.split(",") : value;
      const topicIds = topicStrings.map((topicString) =>
        parseInt(topicString, 10)
      );

      handleChange(
        setRows,
        patchCheckpoint as UseMutationResult,
        { ...row, topics: topicIds },
        row
      );
    },
    []
  );

  // Called when maturity level changes
  const handleMaturityChange = React.useCallback(
    (row: CheckpointAPP, event: SelectChangeEvent<string>) => {
      const maturityId = parseInt(event.target.value, 10);

      handleChange(
        setRows,
        patchCheckpoint as UseMutationResult,
        { ...row, maturityId },
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
        deleteCheckpoint as UseMutationResult,
        rowId as number
      );
    },
    []
  );

  // Called when the "Add" button is pressed below the grid
  const handleAddDecorator = React.useCallback(() => {
    handleAdd(setRows, postCheckpoint as UseMutationResult);
  }, []);

  const columns = React.useMemo<GridColumns<CheckpointAPP>>(
    () => [
      {
        field: "",
        width: 50,
        renderCell: (params: { row: CheckpointAPP }) => (
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
        field: "description",
        headerName: "Description",
        type: "string",
        flex: 1.5,
        editable: true,
      },
      {
        field: "additionalInfo",
        headerName: "Additional Information",
        type: "string",
        flex: 1.5,
        editable: true,
      },
      {
        field: "topic",
        headerName: "Topic",
        type: "string",
        flex: 1,
        renderCell: (params: { row: CheckpointAPP }) => (
          <FormControl sx={{ m: 1, width: 200 }}>
            <Select
              multiple
              value={params.row.topics.map((topicId) => topicId.toString())}
              onChange={(event: SelectChangeEvent<string[]>) =>
                handleTopicsChange(params.row, event)
              }
            >
              {topics.map((topic) => (
                <MenuItem key={topic.name} value={topic.id.toString()}>
                  {topic.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ),
      },
      {
        field: "maturity",
        headerName: "Maturity Level",
        type: "string",
        flex: 1,
        renderCell: (params: { row: CheckpointAPP }) => (
          <FormControl sx={{ m: 1, width: 200 }}>
            <Select
              value={params.row.maturityId.toString()}
              onChange={(event: SelectChangeEvent<string>) =>
                handleMaturityChange(params.row, event)
              }
            >
              {maturities.map((maturity) => (
                <MenuItem key={maturity.name} value={maturity.id.toString()}>
                  {maturity.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ),
      },
      {
        field: "weight",
        headerName: "Weight",
        headerAlign: "center",
        align: "center",
        type: "number",
        width: 75,
        editable: true,
      },
      {
        field: "enabled",
        headerName: "Enabled",
        headerAlign: "center",
        type: "boolean",
        width: 75,
        editable: true,
      },
      {
        field: "actions",
        type: "actions",
        width: 75,
        getActions: (params: { id: GridRowId; row: CheckpointAPP }) => [
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
      handleTopicsChange,
      handleMaturityChange,
      handleDeleteDecorator,
      topics,
      maturities,
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
          text: "CREATE CHECKPOINT",
          handler: handleAddDecorator,
        }}
      />
      <ErrorPopup ref={ref} />
    </>
  );
}
