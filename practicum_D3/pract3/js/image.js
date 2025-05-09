document.addEventListener("DOMContentLoaded", drawSvg);

function drawSvg() {
    const outerSvgHeight = 450;
    const outerSvgWidth = 450;
    const innerSvgHeight = 400;
    const innerSvgWidth = 400;

    const outerSvg = d3.select("svg#outerSvg")
        .attr("height", outerSvgHeight)
        .attr("width", outerSvgWidth);

    const innerSvg = d3.select("svg#innerSvg")
        .attr("x", 25)
        .attr("y", 25)
        .attr("height", innerSvgHeight)
        .attr("width", innerSvgWidth)
        .append("rect")
        .attr("width", innerSvgWidth)
        .attr("height", innerSvgHeight)
        .attr("fill", "white");
}

function createHuman() {
    const human = d3.select("svg#innerSvg")
        .append("g")
        .attr("class", "human");

    // Голова
    human.append("circle")
        .attr("r", 8)
        .attr("fill", "lightblue")
        .attr("stroke", "black")
        .attr("cy", -20);

    // Тело
    human.append("line")
        .attr("y1", -12)
        .attr("y2", 10)
        .attr("stroke", "black")
        .attr("stroke-width", 2);

    // Руки
    human.append("line")
        .attr("x1", -10)
        .attr("x2", 10)
        .attr("y1", 0)
        .attr("y2", 0)
        .attr("stroke", "black")
        .attr("stroke-width", 2);

    // Ноги
    human.append("line")
        .attr("x1", -10)
        .attr("x2", 0)
        .attr("y1", 20)
        .attr("y2", 10)
        .attr("stroke", "black")
        .attr("stroke-width", 2);

    human.append("line")
        .attr("x1", 0)
        .attr("x2", 10)
        .attr("y1", 10)
        .attr("y2", 20)
        .attr("stroke", "black")
        .attr("stroke-width", 2);

    return human;
}

function runAnimation() {
    const svg = d3.select("svg#innerSvg");
    const width = +svg.attr("width");
    const height = +svg.attr("height");

    svg.selectAll(".human, path").remove();

    const path = drawPath();
    const pathNode = path.node();
    const pathLength = pathNode.getTotalLength();

    const human = createHuman();

    const durationSec = +document.getElementById("duration").value || 3;
    const xScaleFrom = +document.getElementById("cxScaleFrom").value || 1;
    const xScaleTo = +document.getElementById("cxScaleTo").value || 1;
    const yScaleFrom = +document.getElementById("cyScaleFrom").value || 1;
    const yScaleTo = +document.getElementById("cyScaleTo").value || 1;
    const angleFrom = +document.getElementById("angleFrom").value || 0;
    const angleTo = +document.getElementById("angleTo").value || 0;

    const startPoint = pathNode.getPointAtLength(0);
    human.attr("transform",
               `translate(${startPoint.x},${startPoint.y})
               rotate(${angleFrom})
               scale(${xScaleFrom},${yScaleFrom})`);

    human.transition()
    .duration(durationSec * 1000)
    .attrTween("transform", function() {
        return function(t) {
            const point = pathNode.getPointAtLength(t * pathLength);
            const currentAngle = angleFrom + t * (angleTo - angleFrom);
            const currentScaleX = xScaleFrom + t * (xScaleTo - xScaleFrom);
            const currentScaleY = yScaleFrom + t * (yScaleTo - yScaleFrom);

            return `translate(${point.x},${point.y})
                rotate(${currentAngle})
                scale(${currentScaleX},${currentScaleY})`;
        };
    });
}

function clearSvg() {
    d3.select("svg#innerSvg").selectAll("*").remove();
    drawSvg();
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("animateBtn").onclick = runAnimation;
    document.getElementById("clearBtn").onclick = clearSvg;
    drawSvg();
});
