import * as React from "react";

import {
  DataGrid,
  GridToolbar,
  gridClasses,
  GridRowClassNameParams,
  GridRowsProp,
  GridColumns,
  GridRowModel,
  GridSortModel,
} from "@mui/x-data-grid";
import { styled, Theme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import ErrorPopup, { RefObject } from "../../ErrorPopup/ErrorPopup";

const StyledGrid = styled(DataGrid)(({ theme }) => ({
  // Style even rows
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: "white", // White
    "&:hover, &.Mui-hovered": {
      backgroundColor: theme.palette.primary.light, // Light Orane
      "@media (hover: none)": {
        backgroundColor: "transparent",
      },
    },
  },
  // Style odd rows
  [`& .${gridClasses.row}.odd`]: {
    backgroundColor: theme.palette.secondary.light, // Light Grey
    "&:hover, &.Mui-hovered": {
      backgroundColor: theme.palette.primary.light, // Light Orange
      "@media (hover: none)": {
        backgroundColor: "transparent",
      },
    },
  },
  // Style toolbar
  "& .MuiDataGrid-virtualScrollerContent": {
    backgroundColor: "white", // White
  },
  // Style header
  "& .MuiDataGrid-columnHeaders": {
    color: theme.palette.secondary.light, // Light Grey
    backgroundColor: theme.palette.secondary.dark, // Dark Grey
  },
  // Style footer
  "& .MuiDataGrid-footerContainer": {
    backgroundColor: "white", // White
  },
  // Style sort icon (arrow in header)
  "& .MuiDataGrid-sortIcon": {
    color: theme.palette.secondary.light, // Light Grey
  },
  // Style menu icon button (triple dots in header)
  "& .MuiDataGrid-menuIconButton": {
    color: theme.palette.secondary.light, // Light Grey
  },
}));

type GenericGridProps = {
  theme: Theme;
  rows: GridRowsProp;
  columns: GridColumns;
  ref: React.RefObject<RefObject>;
  // eslint-disable-next-line react/require-default-props
  processRowUpdate?: (
    newRow: GridRowModel,
    oldRow: GridRowModel
  ) => GridRowModel;
  // eslint-disable-next-line react/require-default-props
  hasToolbar?: boolean;
  // eslint-disable-next-line react/require-default-props
  add?: {
    text: string;
    handler: () => void;
  };
  // eslint-disable-next-line react/require-default-props
  sortModel?: GridSortModel | undefined;
};

export default function GenericGrid({
  theme,
  rows,
  columns,
  ref,
  processRowUpdate,
  hasToolbar,
  add,
  sortModel,
}: GenericGridProps) {
  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          height: "650px",
          width: "inherit",
          marginTop: "10px",
          marginBottom: "50px",
          marginRight: "0px",
          borderRadius: "5px",
          backgroundColor: theme.palette.secondary.dark,
        }}
      >
        <StyledGrid
          rows={rows}
          columns={columns}
          initialState={{
            sorting: {
              sortModel,
            },
          }}
          experimentalFeatures={{ newEditingApi: true }}
          processRowUpdate={processRowUpdate}
          components={hasToolbar ? { Toolbar: GridToolbar } : {}}
          getEstimatedRowHeight={() => 100}
          getRowHeight={() => "auto"}
          sx={{
            // Style rows for compact, standard, and comfortable density
            "&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell": {
              py: "8px",
            },
            "&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell": {
              py: "15px",
            },
            "&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell": {
              py: "22px",
            },
          }}
          // Define even and odd for styling
          getRowClassName={(params: GridRowClassNameParams) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
          }
        />
        {add && (
          <Button
            onClick={add.handler}
            variant="outlined"
            style={{ width: "100%", backgroundColor: "white" }}
          >
            <strong>+ {add.text}</strong>
          </Button>
        )}
        <ErrorPopup ref={ref} />
      </div>
    </ThemeProvider>
  );
}
