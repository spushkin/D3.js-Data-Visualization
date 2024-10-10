const svg1 = d3.select("#grid1");

// creating 10x10 grid of squares
const gridSize = 10;
const cellSize = 30;
const fillColor = "#4dbeff";

// append cells to the first SVG
for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
        svg1.append("rect")
            .attr("x", j * cellSize)
            .attr("y", i * cellSize)
            .attr("width", cellSize)
            .attr("height", cellSize)
            .style("fill", fillColor)
            .on("mouseover", function() {
                d3.select(this)
                    .transition()
                    .duration(100)
                    .style("fill", "#ffffff");
            })
            .on("mouseout", function() {
                d3.select(this)
                    .transition()
                    .duration(2000)
                    .style("fill", fillColor);
            });
    }
}
