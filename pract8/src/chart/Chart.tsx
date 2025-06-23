import Navbar from "../components/Navbar";
import GroupGrid from "./components/GroupGrid";
import Container from '@mui/material/Container';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import * as React from 'react';
import GroupChart from "./components/GroupChart";
import { proglangs, ProgLang } from "../langs_data";
import Typography from '@mui/material/Typography';

type GroupByField = "type" | "year";
type ChartType = "bar" | "line";
type ValueField = "max" | "min" | "avg";

function Chart() {
    const [groupBy, setGroupBy] = React.useState<GroupByField>("type");
    const [chartType, setChartType] = React.useState<ChartType>("bar");
    const [selectedValues, setSelectedValues] = React.useState<ValueField[]>(["max"]);

    const transformData = (data: ProgLang[], groupKey: GroupByField) => {
        const grouped = data.reduce((acc: Record<string, ProgLang[]>, obj) => {
            const key = String(obj[groupKey]);
            acc[key] = acc[key] || [];
            acc[key].push(obj);
            return acc;
        }, {});

        return Object.entries(grouped).map(([groupName, items], index) => {
            const positions = items.map(i => i.position);
            const sum = positions.reduce((a, b) => a + b, 0);
            return {
                id: index + 1,
                group: groupName,
                minHeight: Math.min(...positions),
                maxHeight: Math.max(...positions),
                avgHeight: parseFloat((sum / positions.length).toFixed(2))
            };
        });
    };

    const chartData = transformData(proglangs, groupBy);
    const gridData = transformData(proglangs, groupBy);

    const handleGroupChange = (event: SelectChangeEvent) => {
        setGroupBy(event.target.value as GroupByField);
    };

    const handleValueToggle = (value: ValueField) => {
        setSelectedValues(prev =>
            prev.includes(value)
                ? prev.filter(v => v !== value)
                : [...prev, value]
        );
    };

    return (
        <Container maxWidth="xl">
            <Navbar active="3"/>

            <Box sx={{ width: "200px", m: "auto", p: 3 }}>
                <FormControl fullWidth>
                    <InputLabel>Group by</InputLabel>
                    <Select
                        value={groupBy}
                        onChange={handleGroupChange}
                        label="Group by"
                    >
                        <MenuItem value="type">Type</MenuItem>
                        <MenuItem value="year">Year</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <GroupChart
                data={chartData}
                chartType={chartType}
                selectedValues={selectedValues}
            />

            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: 3,
                p: 3,
                border: '1px solid lightgrey',
                borderRadius: 1,
                marginTop: 2,
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <FormControl sx={{ width: '200px' }}>
                    <InputLabel>Type</InputLabel>
                    <Select
                        value={chartType}
                        onChange={(e) => setChartType(e.target.value as ChartType)}
                    >
                        <MenuItem value="bar">Histogram</MenuItem>
                        <MenuItem value="line">Linear</MenuItem>
                    </Select>
                </FormControl>

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    width: '100%',
                    maxWidth: '300px'
                }}>
                    <Typography variant="subtitle1" sx={{ mb: 1 }}>Show values:</Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={selectedValues.includes("max")}
                                    onChange={() => handleValueToggle("max")}
                                />
                            }
                            label="Maximum"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={selectedValues.includes("min")}
                                    onChange={() => handleValueToggle("min")}
                                />
                            }
                            label="Minimum"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={selectedValues.includes("avg")}
                                    onChange={() => handleValueToggle("avg")}
                                />
                            }
                            label="Average"
                        />
                    </Box>
                </Box>
            </Box>

            <GroupGrid data={gridData}/>
        </Container>
    );
}

export default Chart;
