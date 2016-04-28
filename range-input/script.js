(function() {
  const width = 600;
  const height = 300;
  const nRadiusInput = document.querySelector('#nRadius');

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
    d3.select(nRadiusInput).property("value", nRadius);
    // update the circle radius
    holder.selectAll("circle")
      .attr("r", nRadius);
  };

  // when the input range changes update the circle
  d3.select("#nRadius").on("input", () => update(+nRadiusInput.value));
  // Initial starting radius of the circle
  update(120);
})();

(function() {
  const width = 600;
  const height = 300;
  const nWidthInput = document.querySelector('#nWidth');
  const nHeightInput = document.querySelector('#nHeight');
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
  d3.select("#nHeight").on("input", () => updateHeight(+nHeightInput.value));

  // read a change in the width input
  d3.select("#nWidth").on("input", () => updateWidth(+nWidthInput.value));

  // update the values
  updateHeight(150);
  updateWidth(100);

})();

(function() {
  const width = 600;
  const height = 300;
  const nAngleInput = document.querySelector('#nAngle');
  const nAngleInput2 = document.querySelector('#nAngle2');

  const holder = d3.select("#container3")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  // draw the text
  holder.append("text")
    .style("fill", "black")
    .style("font-size", "56px")
    .attr("dy", ".35em")
    .attr("text-anchor", "middle")
    .attr("transform", "translate(300,150) rotate(0)")
    .text("vvscode.by");

  // update the element
  const update = (nAngle) => {
    // adjust the text on the range slider
    d3.select("#nAngle-value").text(nAngle);
    d3.select(nAngleInput).property("value", nAngle);
    d3.select(nAngleInput2).property("value", nAngle);

    // rotate the text
    holder.select("text").attr("transform", `translate(300,150) rotate(${nAngle})`);
  };

  // when the input range changes update the angle
  d3.select(nAngleInput).on("input", () => update(+nAngleInput.value));
  d3.select(nAngleInput2).on("input", () => update(+nAngleInput2.value));

  // Initial starting angle of the text
  update(0);
})();
