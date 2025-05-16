function processFormData() {
    const form = d3.select("form#chartSettings");
    const retval = { keysY: { showMin: false, showMax: false, } };

    form.selectAll('input[name="xAxis"]:checked').each(function() {
        retval.keyX = this.value;
    });

    form.selectAll('input[name="yAxis"]:checked').each(function() {
        if (this.value === "maxHeight")
            retval.keysY.showMax = true;
        else if (this.value === "minHeight")
            retval.keysY.showMin = true;
    });

    form.select('select[name="chartType"]').each(function() {
        retval.chartType = this.value;
    });

    return (retval.keysY.showMin || retval.keysY.showMax) ? retval : null;
}

function createArrGraph(data, key) {
    groupObj = d3.group(data, d => d[key]);
    let arrGraph =[];
    for(let entry of groupObj) {
        let minMax = d3.extent(entry[1].map(d => d['Высота']));
        arrGraph.push({labelX : entry[0], values : minMax});
    }
    return arrGraph;
}

function drawGraph(data) {
    const userInput = processFormData();
    if (userInput === null) {
        console.error("Неправильные входные данные");
        return;
    }

    // значения по оси ОХ
    const keyX = userInput.keyX === "country" ? "Страна" : "Год";
    // создаем массив для построения графика
    const arrGraph = createArrGraph(data, keyX);
    let svg = d3.select("svg")
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

    const showMin = userInput.keysY.showMin;
    const showMax = userInput.keysY.showMax;

    // рисуем график
    if (userInput.chartType === "scatter")
        createScatterChart(svg, arrGraph, scX, scY, attr_area, showMin, showMax);
    else if (userInput.chartType === "histogram")
        createHistogramChart(svg, arrGraph, scX, scY, attr_area, showMin, showMax);
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
    .domain([min * 0.85, max * 1.1 ])
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
    .attr("transform", d => "rotate(-45)");

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

    // Высота области для столбцов (без учета отступов)
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
