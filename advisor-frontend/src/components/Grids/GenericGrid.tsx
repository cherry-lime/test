import * as React from "react";
import { DataGrid, GridToolbar, gridClasses, GridRowClassNameParams } from "@mui/x-data-grid";
import { styled, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import "./GenericGrid.css";

const StyledGrid = styled(DataGrid)(({ theme }) => ({
    // Style even rows
    [`& .${gridClasses.row}.even`]: {
        backgroundColor: "white", // White
        "&:hover, &.Mui-hovered": {
            backgroundColor: theme.palette.primary.light, // Light Orane
            "@media (hover: none)": {
                backgroundColor: "transparent"
            }
        }
    },
    // Style odd rows
    [`& .${gridClasses.row}.odd`]: {
        backgroundColor: theme.palette.secondary.light, // Light Grey
        "&:hover, &.Mui-hovered": {
            backgroundColor: theme.palette.primary.light, // Light Orange
            "@media (hover: none)": {
                backgroundColor: "transparent"
            }
        }
    },
    // Style toolbar 
    "& .MuiDataGrid-virtualScrollerContent": {
        backgroundColor: "white" // White
    },
    // Style header
    "& .MuiDataGrid-columnHeaders": {
        color: theme.palette.secondary.light, // Light Grey
        backgroundColor: theme.palette.secondary.dark // Dark Grey
    },
    // Style footer
    "& .MuiDataGrid-footerContainer": {
        backgroundColor: "white" // Dark Grey
    },
    // Style sort icon (arrow in header)
    "& .MuiDataGrid-sortIcon": {
        color: theme.palette.secondary.light // Light Grey
    },
    // Style menu icon button (triple dots in header)
    "& .MuiDataGrid-menuIconButton": {
        color: theme.palette.secondary.light // Light Grey
    }
}));

export default function GenericGrid({
    theme,
    rows,
    columns,
    hasToolbar,
    addText,
    addFunc
}: any) {
    return (
        <ThemeProvider theme={theme}>
            <div className="GenericGrid" style={{ backgroundColor: theme.palette.secondary.dark }}>
                <StyledGrid
                    rows={rows}
                    columns={columns}
                    components={hasToolbar && { Toolbar: GridToolbar }}
                    getRowClassName={(params: GridRowClassNameParams) =>
                        params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
                    }
                />
                {addText && addFunc && ( // if addText and addFunc not null
                    <Button
                        onClick={addFunc}
                        variant="outlined"
                        style={{ width: "100%", backgroundColor: "white" }}
                    >
                        <strong>+ {addText}</strong>
                    </Button>
                )}
            </div>
        </ThemeProvider>
    );
}
