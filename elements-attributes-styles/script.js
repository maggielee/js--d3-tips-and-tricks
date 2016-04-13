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

holder.append("rect") // attach a rectangle
  .style("fill", "green")
  .attr("x", 200) // position the left of the rectangle
  .attr("y", 50) // position the top of the rectangle
  .attr("height", 100) // set the height
  .attr("width", 200) // set the width
  .attr("rx", 50) // set the x corner curve radius
  .attr("ry", 20); // set the y corner curve radius

holder.append("line") // attach a line
  .style("stroke", "black") // colour the line
  .attr("x1", 150) // x position of the first end of the line
  .attr("y1", 50) // y position of the first end of the line
  .attr("x2", 350) // x position of the second end of the line
  .attr("y2", 200); // y position of the second end of the line

holder.append("polyline") // attach a polyline
  .style("stroke", "black") // colour the line
  .style("fill", "none") // remove any fill colour
  .attr("points", "400,150, 500,250, 600,150"); // x,y points