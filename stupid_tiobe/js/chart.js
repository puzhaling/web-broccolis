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

    console.log('chartType', chartType);

    return {
        chartType: chartType,
        keyX: keyX,
        keysY: keysY,
    };
}

function createArrGraph(data, userInput) {
    groupObj = d3.group(data, d => {
        switch (userInput.keyX) {
            case "type": return d.type; break;
            case "year": return d.year; break;
        }
    });

    let arrGraph =[];
    for(let entry of groupObj) {
        let minMax = d3.extent(entry[1].map(d => d["position"]));
        arrGraph.push({labelX : entry[0], values : minMax});
    }

    return arrGraph;
}

function setErrorStyle() {
    const styledCheckboxes = d3.select("form#chartForm").
        selectAll('input[type="checkbox"]');

    styledCheckboxes.each(function() {
        d3.select(this)
            .style("outline", "3px solid red");
    });

    const svg = d3.select("svg#chart")
        .style("display", "none");
}

function resetErrorStyle() {
    const styledCheckboxes = d3.select("form#chartForm").
        selectAll('input[type="checkbox"]');

    styledCheckboxes.each(function() {
        d3.select(this)
            .style("outline", "");
    });

    const svg = d3.select("svg#chart")
        .style("display", "");
}

function drawGraph(data) {
    const userInput = processFormData();
    if (userInput === null) {
        // console.error("Неправильные входные данные");
        setErrorStyle();
        return;
    }

    resetErrorStyle();

    console.log('userInput', userInput);


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

    // создаем массив для построения графика
    const arrGraph = createArrGraph(currentTableData, userInput)

    console.log('arrGraph', arrGraph);

    let svg = d3.select("form#chartForm")
        .select("svg#chart");

    svg.selectAll('*').remove();

    // создаем словарь с атрибутами области вывода графика
    attr_area = {
        width: parseFloat(svg.style('width')),
        height: parseFloat(svg.style('height')),
        marginX: 50,
        marginY: 50
    }

    // создаем шкалы преобразования и выводим оси
    const [scX, scY] = createAxis(svg, arrGraph, attr_area);

    const showMin = userInput.keysY.includes("lowest_rating");
    const showMax = userInput.keysY.includes("highest_rating");

    console.log('showMin', showMin);
    console.log('showMax', showMax);

    // рисуем график
    svg.style("display", "block");
    if (userInput.chartType === "scatter")
        createScatterChart(svg, arrGraph, scX, scY, attr_area, showMin, showMax);
    else if (userInput.chartType === "histogram")
        createHistogramChart(svg, arrGraph, scX, scY, attr_area, showMin, showMax);
    else if (userInput.chartType === "linear")
        createLineChart(svg, arrGraph, scX, scY, attr_area, showMin, showMax);
}

function createAxis(svg, data, attr_area){
    // находим интервал значений, которые нужно отложить по оси OY
    // максимальное и минимальное значение и максимальных высот по каждой стране
    const [min, max] = d3.extent(data.map(d => d.values[1]));
    // функция интерполяции значений на оси
    // по оси ОХ текстовые значения
    let scaleX = d3.scaleBand()
    .domain(data.map(d => d.labelX))
    .range([0, attr_area.width - 2 * attr_area.marginX]);
    let scaleY = d3.scaleLinear()
    .domain([0, max * 1.1 ])
    .range([attr_area.height - 2 * attr_area.marginY, 0]);
    // создание осей
    let axisX = d3.axisBottom(scaleX); // горизонтальная
    let axisY = d3.axisLeft(scaleY); // вертикальная
    // отрисовка осей в SVG-элементе
    svg.append("g")
    .attr("transform", `translate(${attr_area.marginX},
                                  ${attr_area.height - attr_area.marginY})`)
    .call(axisX)
    .selectAll("text") // подписи на оси - наклонные
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", d => "rotate(-25)");

    svg.append("g")
    .attr("transform", `translate(${attr_area.marginX},
                                  ${attr_area.marginY})`)
    .call(axisY);
    return [scaleX, scaleY]
}

function createScatterChart(svg, data, scaleX, scaleY, attr_area,
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
        .attr("transform", `translate(${attr_area.marginX},
                                      ${attr_area.marginY})`)
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
        .attr("transform", `translate(${attr_area.marginX},
                                      ${attr_area.marginY})`)
        .style("fill", minColor);
    }
}

function createHistogramChart(svg, data, scaleX, scaleY, attr_area,
                                showMin, showMax) {
    const maxColor = "red";
    const minColor = "blue";
    const barPadding = 5;

    const barWidth = (scaleX.bandwidth() - barPadding * 2) /
    ((showMin && showMax) ? 2 : 1);

    const plotHeight = attr_area.height - 2 * attr_area.marginY;

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
        .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
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
        .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
        .style("fill", minColor);
    }
}


function createLineChart(svg, data, scaleX, scaleY, attr_area, showMin, showMax) {
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
            .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
            .style("fill", color);
        } else {
            const line = d3.line()
            .x(d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
            .y(d => scaleY(d.values[valueIndex]));

            svg.append("path")
            .datum(data)
            .attr("class", className)
            .attr("d", line)
            .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
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
