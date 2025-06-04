// SettingChart.tsx
import React from 'react';
import { FormControl, FormLabel, FormControlLabel, Checkbox } from '@mui/material';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';

type CheckboxProps = {
  series: tSeries;
  setSeries: React.Dispatch<
    React.SetStateAction<tSeries>
  >,
  isBar: boolean;
  setIsBar: React.Dispatch<
    React.SetStateAction<boolean>
  >;
};

type SeriesKeys = 'Максимальная высота' | 'Средняя высота' | 'Минимальная высота';

type tSeries = {
    'Максимальная высота': boolean,
    'Средняя высота': boolean,
    'Минимальная высота': boolean,
};

function SettingChart({series, setSeries, isBar, setIsBar}: CheckboxProps) {
  const handleChange = (key: SeriesKeys) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setSeries(prev => ({
      ...prev,
      [key]: event.target.checked
    }));
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsBar(event.target.value === "bar");
  };

  return (
    <Stack
      direction="row"
      justifyContent="center"
      divider={<Divider orientation="vertical" flexItem />}
      spacing={2}
      sx={{ m: "20px 0" }}
    >
      <FormControl>
        <FormLabel id="label-radio-group">Тип диаграммы:</FormLabel>
        <RadioGroup
          aria-labelledby="label-radio-group"
          name="chart-type-radio"
          value={isBar ? "bar" : "dot"}
          onChange={handleRadioChange}
        >
          <FormControlLabel
            value="bar"
            control={<Radio />}
            label="Гистограмма"
          />
          <FormControlLabel
            value="dot"
            control={<Radio />}
            label="Линейная"
          />
        </RadioGroup>
      </FormControl>

      <FormControl component="fieldset">
        <FormLabel component="legend">На диаграмме показать:</FormLabel>

        <FormControlLabel
          control={
            <Checkbox
              checked={series['Максимальная высота']}
              onChange={handleChange('Максимальная высота')}
            />
          }
          label="Максимальную высоту"
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={series['Средняя высота']}
              onChange={handleChange('Средняя высота')}
            />
          }
          label="Среднюю высоту"
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={series['Минимальная высота']}
              onChange={handleChange('Минимальная высота')}
            />
          }
          label="Минимальную высоту"
        />
      </FormControl>
    </Stack>
  );
}

export default SettingChart;
