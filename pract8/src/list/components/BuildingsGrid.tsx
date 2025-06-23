import { DataGrid, GridRowsProp } from '@mui/x-data-grid';
import { proglangs } from '../../langs_data';
import Container from '@mui/material/Container';
import React from 'react';

function BuildingsGrid() {
    const rows: GridRowsProp = proglangs.map((item, index) => ({
        ...item,
        id: index + 1
    }));

    const columns = [
        { field: 'name', headerName: 'Name', flex: 1 },
        { field: 'type', headerName: 'Type', flex: 0.5 },
        { field: 'year', headerName: 'Year', flex: 0.5 },
        { field: 'position', headerName: 'Position', flex: 0.5 },
        { field: 'percentage', headerName: 'Percentage', flex: 0.5 },
    ];

    return (
        <Container>
            <DataGrid
                rows={rows}
                columns={columns}
                showToolbar={true}
            />
        </Container>
    );
}

export default BuildingsGrid;
