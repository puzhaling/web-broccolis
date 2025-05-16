document.addEventListener("DOMContentLoaded", function() {
    const button = d3.select("#causer");

    button.on("click", function() {
        if (d3.select(".dev-links-container").empty()) {
            const headers = d3.select(".content").selectAll("h1");
            let targetHeader = null;

            headers.each(function() {
                if (d3.select(this).text() === "Топ браузеров")
                    targetHeader = this;
            });

            if (targetHeader) {
                const container = d3.select(targetHeader.parentNode)
                    .insert("div", function() { return targetHeader; })
                    .attr("class", "dev-links-container");

                const linksBlock = container.append("div")
                    .attr("class", "menu");

                const developersNames = d3.select(".content")
                    .selectAll("a")
                    .nodes()
                    .map(d => d.innerText);

                console.log(developersNames);

                linksBlock.selectAll("a")
                    .data(developersNames)
                    .enter()
                    .append("a")
                    .text((d, i) => { return (i + 1 !== developersNames.length) ? `${d} | ` : d })
                    .attr("href", "#");
            }

            button.text("Скрыть разработчиков");

        } else {
            d3.select(".dev-links-container").remove();
            button.text("Показать разработчиков");
        }
    });
});
