import * as React from "react";
import { createTheme } from "@mui/material/styles";
import { 
    GridActionsCellItem,
    GridColumns,
    GridRenderCellParams } from "@mui/x-data-grid";
import Button from "@mui/material/Button";

import EditIcon from '@mui/icons-material/Edit';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import DeleteIcon from '@mui/icons-material/Delete';

import GenericGrid from "./GenericGrid";

function handleAdd() {
    console.log(3);
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

type Row = {
    id: number,
    name: string,
    data: Date
}
  
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
    const columns = React.useMemo<GridColumns<Row>>(
        () => [
            {
                field: "name",
                headerName: "Name",
                flex: 1,
                editable: true
            },
            {
                field: "date",
                headerName: "Year",
                flex: 1,
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
            },
            {
                field: 'actions',
                type: 'actions',
                width: 300,
                getActions: () => [
                    <Button
                        variant="contained"
                    >
                        <strong>Contained</strong>
                    </Button>,
                    <Button
                        variant="outlined"
                    >
                        <strong>Outlined</strong>
                    </Button>,
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        showInMenu
                    />,
                    <GridActionsCellItem
                        icon={<FileCopyIcon />}
                        label="Duplicate"
                        showInMenu
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        showInMenu
                    />
                ]
            }
        ],
        []
    );

    return (
        <GenericGrid
            theme={theme}
            rows={rows}
            columns={columns}
            hasToolbar
            textAdd="add user"
            handleAdd={handleAdd}
        />
    );
}