(function() {
  const width = 600;

  const height = 300;
  const holder = d3.select("#container1")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  // draw the circle
  holder.append("circle")
    .attr("cx", 300)
    .attr("cy", 150)
    .style("fill", "none")
    .style("stroke", "blue")
    .attr("r", 120);

  // update the elements
  const update = (nRadius) => {
    // adjust the text on the range slider
    d3.select("#nRadius-value").text(nRadius);
    d3.select("#nRadius").property("value", nRadius);
    // update the circle radius
    holder.selectAll("circle")
      .attr("r", nRadius);
  };

  // when the input range changes update the circle
  d3.select("#nRadius").on("input", function() {
    update(+this.value);
  });
  // Initial starting radius of the circle
  update(120);


})();

(function() {
  const width = 600;
  const height = 300;
  const holder = d3.select("#container2")
    .append("svg")
    .attr("width", width)
    .attr("height", height);
  // draw a rectangle
  holder.append("rect")
    .attr("x", 300)
    .attr("y", 150)
    .style("fill", "none")
    .style("stroke", "blue")
    .attr("height", 150)
    .attr("width", 200);

  // Update the height attributes
  const updateHeight = (nHeight) => {// adjust the text on the range slider
    d3.select("#nHeight-value").text(nHeight);
    d3.select("#nHeight").property("value", nHeight);
    // update the rectangle height
    holder.selectAll("rect")
      .attr("y", 150 - (nHeight / 2))
      .attr("height", nHeight);
  };

  // Update the width attributes
  const updateWidth = (nWidth) => {
    // adjust the text on the range slider
    d3.select("#nWidth-value").text(nWidth);
    d3.select("#nWidth").property("value", nWidth);
    // update the rectangle width
    holder.selectAll("rect")
      .attr("x", 300 - (nWidth / 2))
      .attr("width", nWidth);
  };

  // read a change in the height input
  d3.select("#nHeight").on("input", function() {
    updateHeight(+this.value);
  });

  // read a change in the width input
  d3.select("#nWidth").on("input", function() {
    updateWidth(+this.value);
  });

  // update the values
  updateHeight(150);
  updateWidth(100);

})();
