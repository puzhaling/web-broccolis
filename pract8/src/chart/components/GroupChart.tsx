import { BarChart, LineChart } from '@mui/x-charts';
import Container from '@mui/material/Container';
import React from 'react';

type ChartDataItem = {
    id: number;
    group: string | number;
    minHeight: number;
    maxHeight: number;
    avgHeight: number;
};

type GroupChartProps = {
    data: ChartDataItem[];
    chartType: "bar" | "line";
    selectedValues: ("max" | "min" | "avg")[];
};

export default function GroupChart({ data, chartType, selectedValues }: GroupChartProps) {
    const series = [
        ...(selectedValues.includes("max")
            ? [{ dataKey: "maxHeight", label: "Maximum" }]
            : []),
        ...(selectedValues.includes("min")
            ? [{ dataKey: "minHeight", label: "Minimum" }]
            : []),
        ...(selectedValues.includes("avg")
            ? [{ dataKey: "avgHeight", label: "Average" }]
            : [])
    ];

    return (
        <Container maxWidth="lg" sx={{ mt: 2 }}>
            {chartType === "bar" ? (
                <BarChart
                    dataset={data}
                    xAxis={[{ scaleType: 'band', dataKey: 'group' }]}
                    series={series}
                    height={400}
                />
            ) : (
                <LineChart
                    dataset={data}
                    xAxis={[{ scaleType: 'band', dataKey: 'group' }]}
                    series={series}
                    height={400}
                />
            )}
        </Container>
    );
}
