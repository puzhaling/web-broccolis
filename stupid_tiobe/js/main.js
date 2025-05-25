document.addEventListener("DOMContentLoaded", function() {

    // // настраиваем работу формы
    // const chartSett_X_AxisRadios = d3.select("#chartForm").selectAll("input[type='radio']");
    // const chartSett_Y_AxisCheckboxes = d3.select("#chartForm").selectAll("input[type='checkbox']");
    //
    // chartSett_X_AxisRadios.each(function() {
    //     chartSett_Y_AxisCheckboxes.each(function() {
    //         d3.select(this).attr("disabled", null);
    //     });
    //     if (this.value === "year") {
    //         this.addEventListener("click", function() {
    //             chartSett_Y_AxisCheckboxes.each(function() {
    //                 if (this.value === "year_highest_rating" ||
    //                     this.value === "type_highest_rating")
    //                     d3.select(this).attr("disabled", true);
    //             });
    //         });
    //     } else if (this.value === "type") {
    //         this.addEventListener("click", function() {
    //             chartSett_Y_AxisCheckboxes.each(function() {
    //                 d3.select(this).attr("disabled", null);
    //             });
    //         });
    //     }
    // });

    const chartSettDrawChartButton = d3.select("#chartForm").select("input[type='button'][value='Draw']");
    chartSettDrawChartButton.node().addEventListener("click", function() {
        drawGraph(data);
    });
});
