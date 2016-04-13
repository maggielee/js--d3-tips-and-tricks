const holder = d3.select("body") // select the 'body' element
  .append("svg") // append an SVG element to the body
  .attr("width", 449) // make the SVG element 449 pixels wide
  .attr("height", 249); // make the SVG element 249 pixels high

// draw a circle
holder.append("circle") // attach a circle
  .attr("cx", 200) // position the x-center
  .attr("cy", 100) // position the y-center
  .attr("r", 50); // set the radius