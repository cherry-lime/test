import * as React from "react";
import { createTheme } from "@mui/material/styles";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import GenericGrid from "./GenericGrid";

function addFunc() {
    console.log("Add function");
}

const theme = createTheme({
    // Style color palette
    palette: {
        primary: {
            light: "#FFD6B1", // Light Orange
            main: "#FF6200", // Orange
            dark: "#AA3909" // Dark Orange
        },
        secondary: {
            // Lightest Grey: #FAF6F3
            light: "#EDE6E2", // Light Grey
            main: "#8B817C", // Grey
            dark: "#5A534F" // Dark Grey
        },
        text: {
            primary: "#5A534F" // Dark Grey
        }
    }
});
  
const columns: GridColDef[] = [
    {
        field: "name",
        headerName: "Name",
        editable: true
    },
    {
        field: "date",
        headerName: "Year",
        width: 150,
        renderCell: (params: GridRenderCellParams<Date>) => (
            <strong>
                {params.value?.getFullYear() ?? ""}
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    style={{ marginLeft: 16 }}
                >
                    Open
                </Button>
            </strong>
        )
    }
];
  
const rows = [
    {
        id: 1,
        name: "Alice",
        date: new Date(1979, 0, 1)
    },
    {
        id: 2,
        name: "Bob",
        date: new Date(1984, 1, 1)
    },
    {
        id: 3,
        name: "Charlie",
        date: new Date(1992, 2, 1)
    },
    {
        id: 4,
        name: "Denise",
        date: new Date(1992, 2, 1)
    }
];
  
export default function ExampleGrid() {
    return (
        <GenericGrid
            theme={theme}
            rows={rows}
            columns={columns}
            hasToolbar
            addText="add user"
            addFunc={addFunc}
        />
    );
}