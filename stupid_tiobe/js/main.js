document.addEventListener("DOMContentLoaded", function() {
    const chartSettDrawChartButton = d3.select("#chartForm").select("input[type='button'][value='Draw']");
    chartSettDrawChartButton.node().addEventListener("click", function() {
        drawGraph(data);
    });
});

// FIXME:
// не выводим в консоль ошибки, используем стили (+)
// при фильтрации перестроить график автоматически (+)
// в сортировке добавить кнопку очистки (синхронизировать фильтры и сортировки) (+)
