const holder = d3.select("body") // select the 'body' element
  .append("svg") // append an SVG element to the body
  .attr("class", "svg-area")
  .attr("width", 800) // make the SVG element 449 pixels wide
  .attr("height", 800); // make the SVG element 249 pixels high

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

holder.append("polygon") // attach a polygon
  .style("stroke", "red") // colour the line
  .style("fill", "none") // remove any fill colour
  .attr("points", "100,250, 200,350, 300,250"); // x,y points

holder.append("path") // attach a path
  .style("stroke", "green") // colour the line
  .style("fill", "none") // remove any fill colour
  .attr("d", "M 300,260, L 400,360, L 500,250 Z"); // path commands


// define the clipPath
holder.append("clipPath") // define a clip path
  .attr("id", "ellipse-clip") // give the clipPath an ID
  .append("ellipse") // shape it as an ellipse
  .attr("cx", 475) // position the x-centre
  .attr("cy", 100) // position the y-centre
  .attr("rx", 100) // set the x radius
  .attr("ry", 50); // set the y radius

// draw clipped path on the screen
holder.append("rect") // attach a rectangle
  .attr("x", 425) // position the left of the rectangle
  .attr("y", 75) // position the top of the rectangle
  .attr("clip-path", "url(#ellipse-clip)") // clip the rectangle
  .style("fill", "lightgrey") // fill the clipped path with grey
  .attr("height", 100) // set the height
  .attr("width", 200); // set the width

holder.append("text") // append text
  .style("fill", "black") // fill the text with the colour black
  .attr("x", 700) // set x position of left side of text
  .attr("y", 100) // set y position of bottom of text
  .attr("text-anchor", "middle") // set anchor y justification
  .text("Hello World anchor to middle"); // define the text to display

holder.append("text") // append text
  .style("fill", "black") // fill the text with the colour black
  .attr("x", 700) // set x position of left side of text
  .attr("y", 130) // set y position of bottom of text
  .attr("text-anchor", "end") // set anchor y justification
  .text("Hello World anchor to end"); // define the text to display

holder.append("text") // append text
  .style("fill", "black") // fill the text with the colour black
  .attr("x", 700) // set x position of left side of text
  .attr("y", 160) // set y position of bottom of text
  .attr("text-anchor", "end") // set anchor y justification
  .text("Hello World"); // define the text to display

holder.append("text") // append text
  .style("fill", "black") // fill the text with the colour black
  .attr("x", 700) // set x position of left side of text
  .attr("y", 190) // set y position of bottom of text
  .attr("dy", ".35em") // set offset y position
  .attr("text-anchor", "start") // set anchor y justification
  .text("Hello World"); // define the text to display

holder.append("text") // append text
  .style("fill", "black") // fill the text with the colour black
  .attr("x", 700) // set x position of left side of text
  .attr("y", 210) // set y position of bottom of text
  .attr("dy", ".35em") // set offset y position
  .attr("text-anchor", "middle") // set anchor y justification
  .text("Hello World"); // define the text to display

holder.append("text") // append text
  .style("fill", "black") // fill the text with the colour black
  .attr("x", 700) // set x position of left side of text
  .attr("y", 250) // set y position of bottom of text
  .attr("dy", ".35em") // set offset y position
  .attr("text-anchor", "end") // set anchor y justification
  .text("Hello World"); // define the text to display

holder.append("text") // append text
  .style("fill", "black") // fill the text with the colour black
  .attr("x", 700) // set x position of left side of text
  .attr("y", 280) // set y position of bottom of text
  .attr("dy", ".71em") // set offset y position
  .attr("text-anchor", "end") // set anchor y justification
  .text("Hello World"); // define the text to display

holder.append("rect") // attach a rectangle
  .attr("x", 20) // position the left of the rectangle
  .attr("y", 350) // position the top of the rectangle
  .attr("height", 20) // set the height
  .attr("width", 40); // set the width


holder.append("ellipse") // attach an circle
  .attr('fill', 'green')
  .attr("cx", 300) // position the x-centre
  .attr("cy", 350) // position the y-centre
  .attr("rx", 50) // set the x radius
  .attr("ry", 50); // set the y radius

holder.append("ellipse") // attach an circle
  .style('fill', 'red')    // inner color
  .style('stroke', 'blue') // line colors
  .style('opacity', 0.7)   // opacity
  .style("fill-opacity", .4) // set the fill opacity
  .style("stroke-opacity", .9) // set the stroke opacity
  .style("stroke-width", 5) // set the stroke width
  .style("stroke-dasharray", ("40,3")) // make the stroke dashed
  .style("stroke-linecap", "butt") // stroke-linecap type "butt|round|square"
  .attr("cx", 550) // position the x-centre
  .attr("cy", 450) // position the y-centre
  .attr("rx", 150) // set the x radius
  .attr("ry", 150); // set the y radius

holder.append("polyline") // attach a polyline
  .style("stroke", "black") // colour the line
  .style("fill", "none") // remove any fill colour
  .style("stroke-width", 20) // colour the line
  .style("stroke-linejoin", "round") // shape the line join
  .attr("points", "20,500, 100,550, 200,500"); // x,y points
holder.append("polyline") // attach a polyline
  .style("stroke", "red") // colour the line
  .style("fill", "none") // remove any fill colour
  .style("stroke-width", 20) // colour the line
  .style("stroke-linejoin", "butt") // shape the line join
  .attr("points", "20,525, 100,575, 200,525"); // x,y points
holder.append("polyline") // attach a polyline
  .style("stroke", "blue") // colour the line
  .style("fill", "none") // remove any fill colour
  .style("stroke-width", 20) // colour the line
  .style("stroke-linejoin", "square") // shape the line join
  .attr("points", "20,550, 100,600, 200,550"); // x,y points

holder.append("text") // append text
  .style("fill", "black") // make the text black
  .style("writing-mode", "tb") // set the writing mode
  .attr("x", 10) // set x position of left side of text
  .attr("y", 150) // set y position of bottom of text
  .text("Hello World"); // define the text to display

holder.append("text") // append text
  .style("fill", "black") // make the text black
  .style("writing-mode", "tb") // set the writing mode
  .style("glyph-orientation-vertical", 0)
  .style('letter-spacing', '0.5em')
  .attr("rotate", -90)
  .attr("x", 30) // set x position of left side of text
  .attr("y", 150) // set y position of bottom of text
  .text("Hello World"); // define the text to display

holder.append("line") // attach a line
  .style("stroke-linecap", "butt") // stroke-linecap type
  .attr("class", "linecap") // inherits styles from CSS
  .attr("x1", 500) // x position of the first end of the line
  .attr("y1", 550) // y position of the first end of the line
  .attr("x2", 750) // x position of the second end of the line
  .attr("y2", 550); // y position of the second end of the line
holder.append("line") // attach a line
  .style("stroke-linecap", "round") // stroke-linecap type
  .attr("class", "linecap") // inherits styles from CSS
  .attr("x1", 500) // x position of the first end of the line
  .attr("y1", 600) // y position of the first end of the line
  .attr("x2", 750) // x position of the second end of the line
  .attr("y2", 600); // y position of the second end of the line
holder.append("line") // attach a line
  .style("stroke-linecap", "square") // stroke-linecap type
  .attr("class", "linecap") // inherits styles from CSS
  .attr("x1", 500) // x position of the first end of the line
  .attr("y1", 650) // y position of the first end of the line
  .attr("x2", 750) // x position of the second end of the line
  .attr("y2", 650); // y position of the second end of the line