// load CSV data using D3.js
d3.csv("Electricity generation by source.csv").then(data => {
    // check if data is loaded correctly, if not -> error
    if (!data || data.length === 0) {
        console.error("No data found in the CSV file.");
        return;
    }


    const processedData = [];
    const countries = new Set();

    // process each row in the CSV data
    data.forEach((entry, index) => {
        const country = entry.Country.trim();
        countries.add(country); // Add country to set

        // loop through each column in the row
        Object.keys(entry).forEach(key => {
            if (key !== 'Country' && key !== 'Year' && !isNaN(+entry[key])) {
                // create and push processed data object
                processedData.push({
                    id: `${country}.${key}`,
                    parent: country,
                    value: +entry[key]
                });
            }
        });
    });

    // add a parent node for each unique country in the data set
    countries.forEach(country => {
        processedData.push({
            id: country,
            parent: "Total"
        });
    });

    // push the root node to the data set
    processedData.push({ id: "Total", parent: "", value: 0 });

    // create a hierarchy from the processed data
    const root = d3.stratify()
        .id(d => d.id)
        .parentId(d => d.parent)
        (processedData)
        .sum(d => d.value)
        .sort((a, b) => b.value - a.value);

    // define a color scale for coloring nodes
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    // apply the treemap layout to the hierarchical data
    d3.treemap()
        .size([960, 600]) // define size of the treemap
        .padding(4) // padding between nodes
        (root);

    // select the treemap div and append nodes
    const nodes = d3.select("#treemap").selectAll(".node")
        .data(root.leaves()) 
        .enter().append("div")
        .attr("class", "node")
        .style("left", d => `${d.x0}px`)
        .style("top", d => `${d.y0}px`)
        .style("width", d => `${d.x1 - d.x0}px`)
        .style("height", d => `${d.y1 - d.y0}px`)
        .style("background", d => color(d.parent.data.id))
        .text(d => `${d.data.id.split('.')[1]}: ${d.value.toLocaleString()}`);

    // color legend
    const legend = d3.select("#legend");
    countries.forEach(country => {
        legend.append("div")
            .attr("class", "legend-item")
            .html(`<span class="color-box" style="background:${color(country)};"></span>${country}`);
    });
}).catch(error => {
  
    console.error("Error loading or processing the CSV:", error);
});
