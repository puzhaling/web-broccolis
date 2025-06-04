import { BarChart} from '@mui/x-charts/BarChart';
import Container from '@mui/material/Container';
import * as React from 'react';
import SettingChart from "./SettingChart";
import { LineChart} from '@mui/x-charts/LineChart';

type tGroup = {
    "id": number,
    "Группа": string | number,
    "Минимальная высота": number ,
    "Максимальная высота": number ,
    "Средняя высота": number,
}[];

type GroupProps = {
    data: tGroup;
};

function GroupChart({ data }: GroupProps) {
    const chartSetting = {
        yAxis: [
            {
            label: 'Высота(м)',
            }],
        height: 500,
        sx: {
            [`.${"axisClasses.left"} .${"Высота(м)"}`]: {
            transform: 'translate(-10px, 0)',
            },
        },
    };

    const [series, setSeries] = React.useState({
        'Максимальная высота': true,
        'Средняя высота': false,
        'Минимальная высота': false,
    });

    let seriesY = Object.entries(series)
    .filter(item => item[1] == true)
    .map(item => {
        return {"dataKey": item[0], "label": item[0]}
    });

    const [isBar, setIsBar] = React.useState(false);

    return(
        <Container maxWidth="lg">
            {isBar ? (
                <BarChart
                    dataset={ data }
                    xAxis={[{ scaleType: 'band', dataKey: 'Группа' }]}
                    series={ seriesY }
                    slotProps={{
                        legend: {
                            position: { vertical: 'bottom', horizontal: 'center' },
                        },
                    }}
                    barLabel={Object.values(series).filter(checked => checked).length === 1 ?
                        "value" : undefined}
                    {...chartSetting}
                />
            ) : (
                <LineChart
                    dataset={ data }
                    xAxis={[{ scaleType: 'band', dataKey: 'Группа' }]}
                    series={ seriesY}
                    slotProps={{
                        legend: {
                        position: { vertical: 'bottom', horizontal: 'center' },
                        },
                    }}
                    {...chartSetting}
                />
            )}
            <SettingChart series={ series } setSeries={ setSeries }
                isBar={ isBar } setIsBar={ setIsBar }/>
        </Container>
    )
}

export default GroupChart;
