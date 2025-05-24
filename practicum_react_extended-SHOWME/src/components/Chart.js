import { useState } from "react";
import ChartDraw from "./ChartDraw.js";
import * as d3 from "d3";

const Chart = (props) => {
	const [ox, setOx] = useState("Страна");
	const [oy, setOy] = useState([true, false]);
	const [chartType, setChartType] = useState("scatter");
	const [error, setError] = useState("");

	// console.log('Chart: filteredData', props.data);

	const handleSubmit = (event) => {
		event.preventDefault();

		const oySelected = [
			event.target["oy"][0].checked,
			event.target["oy"][1].checked,
		];

		const canRender = oySelected[0] || oySelected[1];
		if (!canRender) {
			setError("Выберите хотя бы одно значения для оси OY");
			alert(error);
			return;
		}

		setError("");
		setOx(event.target["ox"].value);
		setOy(oySelected);
	};

	const handleSelectChange = (event) => {
		setChartType(event.target.value);
	};

	const createArrGraph = (data, key) => {
		const groupObj = d3.group(data, d => d[key]);
		let arrGraph = [];
		for (let entry of groupObj) {
			let minMax = d3.extent(entry[1].map(d => d['Высота']));
			arrGraph.push({labelX: entry[0], values: minMax});
		}

		if (key === "Год") {
			arrGraph.sort((a, b) => a.labelX - b.labelX);
		}

		return arrGraph;
	};

    return (
		<>
			<h4> Визуализация </h4>
			<form onSubmit={ handleSubmit }>
				<p> Значение по оси ОХ: </p>
				<div>
					<input type="radio" name="ox" value="Страна" 
				defaultChecked={ ox === "Страна" }/>
					Страна
					<br/>
					<input type="radio" name="ox" value="Год"/>
					Год
				</div>

				<p> Значение по оси ОY: </p>
				<div>
					<input type="checkbox" name="oy"
				defaultChecked={ oy[0] === true } />
					Максимальная высота <br/>
					<input type="checkbox" name="oy" />
					Минимальная высота
				</div>

				<br/>
				<label for="chartType"> Тип диаграммы </label>
				<select name="chartType" onChange={ handleSelectChange }>
					<option value="scatter" selected> Точечная диаграмма </option>
					<option value="histogram"> Гистограмма </option>
				</select>

				<p> 
					<button type="submit"> Построить </button>
				</p>
			</form>

			<ChartDraw
				data={ createArrGraph(props.data, ox) }
				chartType={ chartType }
				showMaxMin={ [oy[0], oy[1]] }
			/>
		</>
    );
}

export default Chart;
