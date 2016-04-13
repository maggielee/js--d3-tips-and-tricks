const holder = d3.select("body") // select the 'body' element
  .append("svg") // append an SVG element to the body
  .attr("class", "svg-area")
  .attr("width", 800) // make the SVG element 449 pixels wide
  .attr("height", 600); // make the SVG element 249 pixels high

// draw a circle
holder.append("circle") // attach a circle
  .attr("cx", 60) // position the x-center
  .attr("cy", 60) // position the y-center
  .attr("r", 50); // set the radius

holder.append("ellipse") // attach an ellipse
  .style("fill", "steelblue")
  .attr("cx", 100) // position the x-centre
  .attr("cy", 130) // position the y-centre
  .attr("rx", 50) // set the x radius
  .attr("ry", 20); // set the y radius

holder.append("rect") // attach a rectangle
  .style("fill", "red")
  .attr("x", 100) // position the left of the rectangle
  .attr("y", 160) // position the top of the rectangle
  .attr("height", 50) // set the height
  .attr("width", 200); // set the width