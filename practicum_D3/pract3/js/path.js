function createPath() {
    const svg = d3.select("svg#innerSvg");
    const width = +svg.attr("width");
    const height = +svg.attr("height");
    const centerX = width / 2;
    const centerY = height / 2;
    const scale = width / 4;
    let data = [];

    // Движение ПО ЧАСОВОЙ СТРЕЛКЕ (от 2π до 0)
    for (let t = 2 * Math.PI; t >= 0; t -= 0.01) {
        const x = 2 * Math.pow(Math.sin(t), 3);
        const y = 2 * Math.pow(Math.cos(t), 3);

        data.push({
            x: centerX + x * scale,
            y: centerY - y * scale
        });
    }

    return data;
}

function drawPath() {
    const dataPoints = createPath();
    const line = d3.line()
    .x(d => d.x)
    .y(d => d.y);

    const svg = d3.select("svg#innerSvg");
    return svg.append('path')
    .attr('d', line(dataPoints))
    .attr('stroke', 'blue')
    .attr('fill', 'none')
    .attr('stroke-width', 2);
}
