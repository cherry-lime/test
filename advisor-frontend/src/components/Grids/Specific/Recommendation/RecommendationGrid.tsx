import * as React from "react";

import {
  GridActionsCellItem,
  GridColumns,
  GridPreProcessEditCellProps,
  GridRowId,
  GridRowModel,
} from "@mui/x-data-grid";
import { Theme } from "@mui/material/styles";
import { IconButton, Tooltip } from "@mui/material";
import UpwardIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import DownwardIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import RevertIcon from "@mui/icons-material/Cached";

import GenericGrid from "../../Generic/GenericGrid";

import { UserRole } from "../../../../types/UserRole";
import { AssessmentType } from "../../../../types/AssessmentType";
import {
  handleMoveRows,
  preProcessEditOrder,
  processRowUpdate,
} from "../handlers";

// Define type for the rows in the grid
type Row = {
  id: number;
  order: number;
  description: string;
  additionalInfo: string;
};

type RecommendationGridProps = {
  theme: Theme;
  assessmentId: number;
  assessmentType: AssessmentType;
  userId: number;
  userRole: UserRole;
};

export default function RecommendationGrid({
  theme,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  assessmentId,
  assessmentType,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  userId,
  userRole,
}: RecommendationGridProps) {
  const [rows, setRows] = React.useState<Row[]>([
    {
      id: 0,
      order: 0,
      description: "Description A",
      additionalInfo: "Additional information A",
    },
    {
      id: 1,
      order: 1,
      description: "Description B",
      additionalInfo: "Additional information B",
    },
  ]);

  // Fetch initial rows of the grid
  React.useEffect(() => {
    // TODO Replace this by API fetch
    // setRows(() => []);
  }, []);

  // Called when the 'Order' column is edited
  const preProcessEditOrderDecorator = React.useCallback(
    (params: GridPreProcessEditCellProps) => preProcessEditOrder(rows, params),
    [rows]
  );

  // Called when a row is edited
  const processRowUpdateDecorator = React.useCallback(
    (newRow: GridRowModel, oldRow: GridRowModel) =>
      processRowUpdate(setRows, newRow, oldRow, true),
    []
  );

  // Called when the "Upward" action is pressed
  const handleUpward = React.useCallback(
    (row: Row) => () => {
      handleMoveRows(setRows, row, row.order - 1);
    },
    []
  );

  // Called when the "Downward" action is pressed
  const handleDownward = React.useCallback(
    (row: Row) => () => {
      handleMoveRows(setRows, row, row.order + 1);
    },
    []
  );

  // Called when "Revert To Default" action is pressed
  const handleRevertToDefault = React.useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (id: GridRowId) => () => {
      setRows(
        (prevRows) =>
          // Fetch default additional information
          // TODO

          prevRows
      );
    },
    []
  );

  const columns = React.useMemo<GridColumns<Row>>(
    () => [
      ...(userRole === "ASSESSOR" && assessmentType === "TEAM"
        ? [
            {
              field: "",
              width: 50,
              renderCell: (params: { row: Row }) =>
                userRole === "ASSESSOR" && assessmentType === "TEAM" ? (
                  <div className="parent">
                    <div className="child">
                      <IconButton onClick={handleUpward(params.row)}>
                        <UpwardIcon />
                      </IconButton>
                    </div>
                    <div className="child">
                      <IconButton onClick={handleDownward(params.row)}>
                        <DownwardIcon />
                      </IconButton>
                    </div>
                  </div>
                ) : (
                  <strong>{params.row.order}</strong>
                ),
            },
          ]
        : []),
      {
        field: "order",
        headerName: "Priority",
        headerAlign: "center",
        align: "center",
        type: "number",
        width: 75,
        editable: userRole === "ASSESSOR" && assessmentType === "TEAM",
        preProcessEditCellProps: preProcessEditOrderDecorator,
      },
      {
        field: "description",
        headerName: "Description",
        type: "string",
        flex: 1,
        editable: userRole === "ASSESSOR" && assessmentType === "TEAM",
      },
      {
        field: "additionalInfo",
        headerName: "Additional Information",
        type: "string",
        flex: 1,
        editable: userRole === "ASSESSOR" && assessmentType === "TEAM",
      },
      ...(userRole === "ASSESSOR"
        ? [
            {
              field: "actions",
              type: "actions",
              width: 75,
              getActions: (params: { id: GridRowId }) => [
                <GridActionsCellItem
                  icon={
                    <Tooltip title="Revert To Default">
                      <RevertIcon />
                    </Tooltip>
                  }
                  label="Remove"
                  onClick={handleRevertToDefault(params.id)}
                />,
              ],
            },
          ]
        : []),
    ],
    [
      handleUpward,
      handleDownward,
      preProcessEditOrderDecorator,
      handleRevertToDefault,
    ]
  );

  return (
    <GenericGrid
      theme={theme}
      rows={rows}
      columns={columns}
      processRowUpdate={processRowUpdateDecorator}
      hasToolbar
    />
  );
}
