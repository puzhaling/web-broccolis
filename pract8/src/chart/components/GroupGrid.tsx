import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Container from '@mui/material/Container';
import React from 'react';

type GridDataItem = {
    id: number;
    group: string | number;
    minHeight: number;
    maxHeight: number;
    avgHeight: number;
};

export default function GroupGrid({ data }: { data: GridDataItem[] }) {
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', flex: 1 },
        { field: 'group', headerName: 'Group', flex: 1 },
        { field: 'minHeight', headerName: 'Min. height', flex: 1 },
        { field: 'maxHeight', headerName: 'Max. height', flex: 1 },
        { field: 'avgHeight', headerName: 'Avg. height', flex: 1 },
    ];

    return (
        <Container maxWidth="lg" sx={{ height: 400, marginTop: "50px" }}>
            <DataGrid
                rows={data}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { pageSize: 5 },
                    },
                }}
            />
        </Container>
    );
}
