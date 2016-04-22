const width = 174;
const height = 32;
const border = 10;

const container = d3.select("body");

d3.csv("colors.csv", (error, data) => {

  // ****************  Individual colours  *********************
  data.forEach((d) => {

    // create the SVG area for the rectangle
    svgArea = container.append("svg")
      .attr("width", width + (2*border))
      .attr("height", height + (2*border));

    // Add in the rectangle
    svgArea.append("rect")
      .attr("transform", `translate(${border}, ${border}")`)
      .attr("height", height)
      .attr("width", width)
      .style("fill", d.colour)
      .attr("rx", 5)
      .attr("ry", 5);

    // Add in the white background for the label
    svgArea.append("text")
      .attr("transform", `translate(${border+(width/2)},${border})`)
      .attr("dy", ".71em")
      .attr("text-anchor", "middle")
      .style("fill", "black")
      .style("font-weight", "bold")
      .attr("class", "shadow")
      .text(d.colour);

    // Add in the label
    svgArea.append("text")
      .attr("transform", `translate(${border+(width/2)},${border})`)
      .attr("dy", ".71em")
      .attr("text-anchor", "middle")
      .style("fill", "black")
      .style("font-weight", "bold")
      .text(d.colour);
  });
});