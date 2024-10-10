const svg2 = d3.select("#grid2");

const circleRadius = 10;
const circleFillColor = "#ff5900";

// append circles to the second SVG
for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
        svg2.append("circle")
            .attr("cx", j * 30 + circleRadius)
            .attr("cy", i * 30 + circleRadius)
            .attr("r", circleRadius)
            .style("fill", circleFillColor)
            .on("click", function() {
                let row = i, col = j;
                
                // select all circles in the same row and column
                svg2.selectAll("circle")
                    .filter((d, idx) => {
                        const currentRow = Math.floor(idx / gridSize);
                        const currentCol = idx % gridSize;
                        return currentRow === row || currentCol === col;
                    })
                    .transition()
                    .duration(100)
                    .style("fill", "#4dbeff")
                    .transition()
                    .duration(1000)
                    .style("fill", circleFillColor);
            });
    }
}
