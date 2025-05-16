document.addEventListener("DOMContentLoaded", function() {
    showTable('build', buildings);

    tableVisibilitySwitch.addEventListener("click", function() {
        const switcher = d3.select("input#tableVisibilitySwitch");
        const switcherValue = d3.select("input#tableVisibilitySwitch")
            .property("value");
        const table = d3.select("table#build");

        if (switcherValue === "Показать таблицу") {
            showTable('build', buildings);
            switcher.property("value", "Скрыть таблицу");
        } else if (switcherValue === "Скрыть таблицу") {
            table.selectAll("tr").remove();
            switcher.property("value", "Показать таблицу");
        }
    });

    d3.select("svg#chart").style("display", "none");

    chartSettingsSubmitBtn.addEventListener("click", function() {
        d3.select("svg#chart").style("display", "");

        drawGraph(buildings);
    });
});
