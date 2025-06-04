import Navbar from "../components/Navbar";
import GroupGrid from "./components/GroupGrid";
import { countries, types, years } from "./groupdata";
import Container from '@mui/material/Container';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import * as React from 'react';
import GroupChart from "./components/GroupChart";
type tSelect = "Страна" | "Год" | "Тип";

function Chart() {

    const [group, setGroup] = React.useState<tSelect>("Страна");
    const [groupData, setGroupData] = React.useState(countries);

    const handleChange = (event: SelectChangeEvent<tSelect>) => {
        const value = event.target.value as tSelect;
        setGroup(value);

        switch(value) {
            case "Страна": setGroupData(countries); break;
            case "Год": setGroupData(years); break;
            case "Тип": setGroupData(types); break;
        }
    };

    return (
        <Container maxWidth="xl">
            <Navbar active="3"/>

            <Box sx={{ width:"200px", m:"auto", p:3, }}>
                <FormControl fullWidth>
                    <InputLabel> Группировать по </InputLabel>
                    <Select
                        id="select-group"
                        value={group}
                        label="Группировать по"
                        onChange={handleChange}
                    >
                        <MenuItem value="Страна"> Стране </MenuItem>
                        <MenuItem value="Год"> Году </MenuItem>
                        <MenuItem value="Тип"> Типу </MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <GroupChart data={groupData}/>

            <GroupGrid data={groupData}/>
        </Container>
    );
}

export default Chart;
