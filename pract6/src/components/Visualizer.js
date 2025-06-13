import * as d3 from "d3";
import { useEffect, useState, useRef } from "react";

function processFormData() {
    const form = d3.select("form#chartForm");

    const chartType = form.select('select[name="chartType"]')
        .property("value");

    const keyX = form.select('input[type="radio"]:checked')
        .attr("value");

    const keysY = [];

    form.selectAll('input[type="checkbox"]:checked')
        .each(function() {
            keysY.push(this.value)
        });

    if (keysY.length === 0)
        return null;

    //console.log('chartType', chartType);

    return {
        chartType: chartType,
        keyX: keyX,
        keysY: keysY,
    };
}

function createArrGraph(data, userInput) {
    const groupObj = d3.group(data, d => {
        switch (userInput.keyX) {
            case "type": return d.type;
            case "year": return d.year;
        }
    });

    let arrGraph = [];
    for(let entry of groupObj) {
        let minMax = d3.extent(entry[1].map(d => d["position"]));
        arrGraph.push({labelX: entry[0], values: minMax});
    }

    if (userInput.keyX === "year") {
        arrGraph.sort((a, b) => {
            return a.labelX - b.labelX;
        });
    }

    console.log('arrGraph', arrGraph);

    return arrGraph;
}

function setErrorStyle() {
    const styledCheckboxes = d3.select("form#chartForm")
        .selectAll('input[type="checkbox"]');

    styledCheckboxes.each(function() {
        d3.select(this)
            .style("outline", "3px solid red");
    });

    const svg = d3.select("svg#chart")
        .style("display", "none");
}

function resetErrorStyle() {
    const styledCheckboxes = d3.select("form#chartForm")
        .selectAll('input[type="checkbox"]');

    styledCheckboxes.each(function() {
        d3.select(this)
            .style("outline", "");
    });

    // const svg = d3.select("svg#chart")
    //     .style("display", "");
}

function drawGraph(data) {
    const userInput = processFormData();
    if (userInput === null) {
        setErrorStyle();
        return;
    }

    // console.log('userInput', userInput);

    resetErrorStyle();

    const currentTableData = [];

    d3.select("table#table")
        .selectAll("tr")
        .each((_, i, nodes) => {
            if (i > 0) {
                currentTableData.push({
                    name: nodes[i].cells[0].innerText,
                    type: nodes[i].cells[1].innerText,
                    year: nodes[i].cells[2].innerText,
                    position: nodes[i].cells[3].innerText,
                    persantage: nodes[i].cells[4].innerText,
                });
            }
        });

    console.log('currentTableData', currentTableData);

    const arrGraph = createArrGraph(currentTableData, userInput);
    //console.log('arrGraph', arrGraph);

    let svg = d3.select("form#chartForm")
        .select("svg#chart");

    svg.selectAll('*').remove();

    const attrArea = {
        width: parseFloat(svg.style('width')),
        height: parseFloat(svg.style('height')),
        marginX: 50,
        marginY: 50
    };

    const [scX, scY] = createAxis(svg, arrGraph, attrArea);

    const showMin = userInput.keysY.includes("lowestRating");
    const showMax = userInput.keysY.includes("highestRating");

    //console.log('showMin', showMin);
    //console.log('showMax', showMax);

    svg.style("display", "block");
    if (userInput.chartType === "scatter")
        createScatterChart(svg, arrGraph, scX, scY, attrArea, showMin, showMax);
    else if (userInput.chartType === "histogram")
        createHistogramChart(svg, arrGraph, scX, scY, attrArea, showMin, showMax);
    else if (userInput.chartType === "linear")
        createLineChart(svg, arrGraph, scX, scY, attrArea, showMin, showMax);
}

function createAxis(svg, data, attrArea) {
    const [min, max] = d3.extent(data.map(d => d.values[1]));

    let scaleX = d3.scaleBand()
        .domain(data.map(d => d.labelX))
        .range([0, attrArea.width - 2 * attrArea.marginX]);

    let scaleY = d3.scaleLinear()
        .domain([0, max * 2.5])
        .range([attrArea.height - 2 * attrArea.marginY, 0]);

    let axisX = d3.axisBottom(scaleX);
    let axisY = d3.axisLeft(scaleY);

    svg.append("g")
        .attr("transform", `translate(${attrArea.marginX}, ${attrArea.height - attrArea.marginY})`)
        .call(axisX)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-25)");

    svg.append("g")
        .attr("transform", `translate(${attrArea.marginX}, ${attrArea.marginY})`)
        .call(axisY);

    return [scaleX, scaleY];
}

function createScatterChart(svg, data, scaleX, scaleY, attrArea,
                            showMin, showMax) {
    const r = 4;
    const maxColor = "red";
    const minColor = "blue";

    if (showMax) {
        svg.selectAll(".dot-max")
        .data(data)
        .enter()
        .append("circle")
        .attr("r", r)
        .attr("cx", d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
        .attr("cy", d => scaleY(d.values[1]))
        .attr("transform", `translate(${attrArea.marginX},
                                      ${attrArea.marginY})`)
        .style("fill", maxColor);
    }

    if (showMin) {
        svg.selectAll(".dot-min")
        .data(data)
        .enter()
        .append("circle")
        .attr("r", r)
        .attr("cx", d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
        .attr("cy", d => scaleY(d.values[0]))
        .attr("transform", `translate(${attrArea.marginX},
                                      ${attrArea.marginY})`)
        .style("fill", minColor);
    }
}

function createHistogramChart(svg, data, scaleX, scaleY, attrArea,
                                showMin, showMax) {
    const maxColor = "red";
    const minColor = "blue";
    const barPadding = 5;

    const barWidth = (scaleX.bandwidth() - barPadding * 2) /
    ((showMin && showMax) ? 2 : 1);

    const plotHeight = attrArea.height - 2 * attrArea.marginY;

    if (showMax) {
        svg.selectAll(".bar-max")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar-max")
        .attr("x", d => scaleX(d.labelX) + barPadding +
        (showMin ? barWidth : 0))
        .attr("y", d => scaleY(d.values[1]))
        .attr("width", barWidth)
        .attr("height", d => plotHeight - scaleY(d.values[1]))
        .attr("transform", `translate(${attrArea.marginX}, ${attrArea.marginY})`)
        .style("fill", maxColor);
    }

    if (showMin) {
        svg.selectAll(".bar-min")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar-min")
        .attr("x", d => scaleX(d.labelX) + barPadding)
        .attr("y", d => scaleY(d.values[0]))
        .attr("width", barWidth)
        .attr("height", d => plotHeight - scaleY(d.values[0]))
        .attr("transform", `translate(${attrArea.marginX}, ${attrArea.marginY})`)
        .style("fill", minColor);
    }
}


function createLineChart(svg, data, scaleX, scaleY, attrArea, showMin, showMax) {
    const maxColor = "red";
    const minColor = "blue";
    const lineWidth = 2;
    const pointRadius = 4;

    const drawLineOrPoint = (data, valueIndex, color, className) => {
        if (data.length === 1) {
            svg.append("circle")
            .attr("class", className)
            .attr("cx", scaleX(data[0].labelX) + scaleX.bandwidth() / 2)
            .attr("cy", scaleY(data[0].values[valueIndex]))
            .attr("r", pointRadius)
            .attr("transform", `translate(${attrArea.marginX}, ${attrArea.marginY})`)
            .style("fill", color);
        } else {
            const line = d3.line()
            .x(d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
            .y(d => scaleY(d.values[valueIndex]));

            svg.append("path")
            .datum(data)
            .attr("class", className)
            .attr("d", line)
            .attr("transform", `translate(${attrArea.marginX}, ${attrArea.marginY})`)
            .style("fill", "none")
            .style("stroke", color)
            .style("stroke-width", lineWidth);
        }
    };

    if (showMax && data.length > 0) {
        drawLineOrPoint(data, 1, maxColor, "line-max");
    }

    if (showMin && data.length > 0) {
        drawLineOrPoint(data, 0, minColor, "line-min");
    }
}

function Visualizer(props) {
    const [shouldRenderChart, setShouldRenderChart] = useState(false);
    const svgRef = useRef(null);

    // Рисуем график только когда shouldRenderChart=true и есть данные
    useEffect(() => {
        if (shouldRenderChart) {
            drawGraph(props.displayData);
        }
    }, [props.displayData, shouldRenderChart]);

    const handleSubmit = event => {
        event.preventDefault();

        if (!shouldRenderChart)
            setShouldRenderChart(true);

        drawGraph(props.displayData);
    };

    console.log('displayData', props.displayData);

    // const handleSelectChange = event => {
    //     handleSubmit(event);
    // };

    return (
        <form id="chartForm" onSubmit={handleSubmit}>
            <table>
                <tbody>
                    <tr>
                        <th>OX-axis value</th>
                        <th>OY-axis value</th>
                    </tr>
                    <tr>
                        <td>
                            <label>
                                <input type="radio" name="type" value="type" defaultChecked /> Type
                            </label>
                            <label>
                                <input type="radio" name="type" value="year" /> Year
                            </label>
                        </td>
                        <td>
                            <label>
                                <input type="checkbox" value="lowestRating" onChange={resetErrorStyle}/>
                                Lowest rating
                            </label>
                            <br />
                            <label>
                                <input type="checkbox" value="highestRating" onChange={resetErrorStyle}
                                    defaultChecked />
                                Highest rating
                            </label>
                        </td>
                    </tr>
                </tbody>
            </table>

            <br />
            <label htmlFor="chartType">Chart type: </label>
            <select name="chartType" id="chartType" onChange={ handleSubmit }>
                <option value="scatter">scatter</option>
                <option value="histogram">histogram</option>
            </select>
            <br />
            <br />

            <input type="submit" value="Draw" />

            <svg
                id="chart"
                ref={svgRef}
                style={{
                    display: shouldRenderChart ? "block" : "none",
                    width: "1000px",
                    height: "500px"
                }}
            ></svg>
        </form>
    );
}
export default Visualizer;
