import * as d3 from "d3";
import { useRef, useMemo, useEffect, useState } from "react";

const ChartDraw = (props) => {

	// console.log('ChartDraw: filteredData:', props.data);

	const chartRef = useRef(null);

	const [width, setWidth] = useState(0);
	const [height, setHeight] = useState(0);

	useEffect(() => {
		const svg = d3.select(chartRef.current);
		setWidth(parseFloat(svg.style('width')));
		setHeight(parseFloat(svg.style('height')));
	});

	const margin = {
		top: 20,
		bottom: 60,
		left: 60,
		right: 20,
	};

	const boundsWidth = width - margin.left - margin.right;
	const boundsHeight = height - margin.top - margin.bottom;

	useEffect(() => {
		const svg = d3.select(chartRef.current);
		svg.append("rect")
			.attr("x", margin.left)
			.attr("y", margin.top)
			.attr("width",  boundsWidth)
			.attr("height",  boundsWidth)
			.style("fill", "lightgrey");
	});

	let min = Infinity;
	let max = -Infinity;

	props.data.forEach(building => {
		if (props.showMaxMin[0]) {
			if (building.values[1] > max) max = building.values[1];
			if (building.values[1] < min) min = building.values[1];
		}
		if (props.showMaxMin[1]) {
			if (building.values[0] > max) max = building.values[0];
			if (building.values[0] < min) min = building.values[0];
		}
	});

	// формируем шкалы для осей
	const scaleX = useMemo(() => {
		return d3
		.scaleBand()
		.domain(props.data.map(d => d.labelX))
		.range([0, boundsWidth]);
	}, [props.data, boundsWidth]);

	const scaleY = useMemo(() => {
		return d3
			.scaleLinear()
			.domain([min * 0.85, max * 1.1])
			.range([boundsHeight, 0]);
	}, [boundsHeight, min, max]);

	useEffect(() => {
		const svg = d3.select(chartRef.current);
		svg.selectAll("*").remove();


		// рисуем оси
		const xAxis = d3.axisBottom(scaleX);
		svg.append("g")
			.attr("transform", `translate(${margin.left}, ${height - margin.bottom})`)
			.call(xAxis)
			.selectAll("text")
			.style("text-anchor", "end")
			.attr("dx", "-.8em")
			.attr("dy", ".15em")
			.attr("transform", d => "rotate(-30)");

		const yAxis = d3.axisLeft(scaleY);
		svg.append("g")
			.attr("transform", `translate(${margin.left}, ${margin.top})`)
			.call(yAxis);

		const maxColor = "red";
		const minColor = "blue";

		if (props.chartType === "scatter") {
			if (props.showMaxMin[1]) { // Минимальные значения (синие)
				svg.selectAll(".min-dot")
					.data(props.data)
					.enter()
					.append("circle")
					.attr("r", 5)
					.attr("cx", d => margin.left + scaleX(d.labelX) + scaleX.bandwidth() / 2)
					.attr("cy", d => margin.top + scaleY(d.values[0]))
					.style("fill", minColor);
			}
			if (props.showMaxMin[0]) { // Максимальные значения (красные)
				svg.selectAll(".max-dot")
					.data(props.data)
					.enter()
					.append("circle")
					.attr("r", 5)
					.attr("cx", d => margin.left + scaleX(d.labelX) + scaleX.bandwidth() / 2)
					.attr("cy", d => margin.top + scaleY(d.values[1]))
					.style("fill", maxColor);
			}

		} else if (props.chartType === "histogram") {

			const barPadding = 2;
			const showBoth = props.showMaxMin[0] && props.showMaxMin[1];

			const barWidth = (scaleX.bandwidth() - barPadding * 2) /
				(showBoth ? 2 : 1);

			const plotHeight = boundsHeight;

			if (props.showMaxMin[1]) { // Минимальные значения (синие)
				svg.selectAll(".min-bar")
					.data(props.data)
					.enter()
					.append("rect")
					.attr("class", "bar-min")
					.attr("x", d => margin.left + scaleX(d.labelX) + barPadding)
					.attr("y", d => scaleY(d.values[0]))
					.attr("width", barWidth)
					.attr("height", d => boundsHeight - scaleY(d.values[0]) + margin.top)
					.style("fill", minColor);
			}

			if (props.showMaxMin[0]) { // Максимальные значения (красные)
				svg.selectAll(".max-bar")
					.data(props.data)
					.enter()
					.append("rect")
					.attr("class", "bar-max")
					.attr("x", d => margin.left + scaleX(d.labelX) + barPadding +
					(showBoth ? barWidth : 0))
					.attr("y", d => scaleY(d.values[1]))
					.attr("width", barWidth)
					.attr("height", d => boundsHeight - scaleY(d.values[1]) + margin.top)
					.style("fill", maxColor);
			}
		}
	}, [scaleX, scaleY, props.data]);

	return (
		<svg ref={ chartRef }> </svg>
	);
}

export default ChartDraw;
