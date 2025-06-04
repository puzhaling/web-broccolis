import { tGroup, countries } from "../groupdata";
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import Container from '@mui/material/Container';

type GroupProps = {
    data: tGroup;
};

function GroupGrid({ data }: GroupProps) {

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', flex: 1, },
        { field: 'group', headerName: 'Группа', flex: 1, },
        { field: 'minHeight', headerName: 'Минимальная высота', flex: 1, },
        { field: 'maxHeight', headerName: 'Максимальная высота', flex: 1, },
        { field: 'averageHeight', headerName: 'Средняя высота', flex: 1, },
    ];

    const rows: GridRowsProp = data.map(
        item => ({  id: item["id"],
                    group: item["Группа"],
                    minHeight: item["Минимальная высота"],
                    maxHeight: item["Максимальная высота"],
                    averageHeight: item["Средняя высота"],
                })
    );

    return (
        <Container maxWidth="lg" sx={{height:"850px",}}>
            <DataGrid rows={rows} columns={columns} showToolbar={true}/>
        </Container>
    );
}

export default GroupGrid;
