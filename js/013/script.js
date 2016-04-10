// Starting with a basic graph

// Set the dimensions of the canvas / graph
const margin = { top: 30, right: 35, bottom: 30, left: 50 };
const width = 600 - margin.left - margin.right;
const height = 270 - margin.top - margin.bottom;

// Parse the date / time
const parseDate = d3.time.format("%d-%b-%y").parse;

// Set the ranges
const x = d3.time.scale().range([0, width]);
const y = d3.scale.linear().range([height, 0]);

function make_x_axis() {
  return d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .ticks(5)
}
function make_y_axis() {
  return d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(5)
}

// Define the axes
const xAxis = make_x_axis();
const yAxis = make_y_axis();

const area = d3.svg.area()
  .x(function(d) { return x(d.date); })
  .y0(height)
  .y1(function(d) { return y(d.close); });

var areaAbove = d3.svg.area()
  .x((d) => x(d.date))
  .y0(0)
  .y1((d) => y(d.close));

// https://github.com/mbostock/d3/wiki/SVG-Shapes#wiki-line_interpolate
// • linear – Normal line (jagged).
// • step-before – a stepping graph alternating between vertical and horizontal segments.
// • step-after - a stepping graph alternating between horizontal and vertical segments.
// • basis - a B-spline, with control point duplication on the ends (that’s the one above).
// • basis-open - an open B-spline; may not intersect the start or end.
// • basis-closed - a closed B-spline, with the start and the end closed in a loop.
// • bundle - equivalent to basis, except a separate tension parameter is used to straighten the spline. This could be really cool with varying tension.
// • cardinal - a Cardinal spline, with control point duplication on the ends. It looks slightly more ‘jagged’ than basis.
// • cardinal-open - an open Cardinal spline; may not intersect the start or end, but will intersect other control points. So kind of shorter than ‘cardinal’.
// • cardinal-closed - a closed Cardinal spline, looped back on itself.
// • monotone - cubic interpolation that makes the graph only slightly smoother.
//   .interpolate("basis") // Smoothing out graph lines
// Define the lines
const valueline = d3.svg.line()
  .interpolate("linear")
  .x((d) => x(d.date))
  .y((d) => y(d.close));

const valueline2 = d3.svg.line()
  .interpolate("basis")
  .x((d) => x(d.date))
  .y((d) => y(d.open));

// Adds the svg canvas
const svg = d3.select(".step.step-013")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

// Get the data
d3.csv("js/013/data.csv", (error, data) => {

  data.forEach((d) => {
    d.date = parseDate(d.date);
    d.close = +d.close;
    d.open = +d.open;
  });

  // Scale the range of the data
  x.domain(d3.extent(data, (d) => d.date));
  y.domain([0, d3.max(data, (d) => Math.max(d.close, d.open))]);

  // Add the X Axis
  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", `translate(0,${height})`)
    .style("stroke-dasharray", ("5, 5"))// make line dashed
    .call(xAxis);

  // Add the Y Axis
  svg.append("g")
    .attr("class", "y axis")
    .style("stroke-dasharray", ("7, 7"))// make line dashed
    .call(yAxis);

  // x-axe label
  svg.append('text')
    //.attr('x', width / 2)
    //.attr('y', height + margin.bottom)
    .attr("transform", `translate(${ width/2 }, ${ height+margin.bottom })`) // do the same as two lines above
    .style('text-anchor', 'middle')
    .text('Date');

  // y-axe label
  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left)
    .attr("x", -(height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Value");

  // title for graph
  svg.append("text")
    .attr("x", (width / 2))
    .attr("y", -(margin.top / 2))
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("text-decoration", "underline")
    .text("Value vs Date Graph");

  svg.append("g")
    .attr("class", "grid")
    .attr("transform", "translate(0," + height + ")")
    .call(make_x_axis()
      .tickSize(-height, 0, 0)
      .tickFormat("")
    );

  svg.append("g")
    .attr("class", "grid")
    .call(make_y_axis()
      .tickSize(-width, 0, 0)
      .tickFormat("") // grid line text
    );

  svg.append("path")
    .datum(data)
    .attr("class", "area")
    .attr("d", area);

  svg.append("path")
    .datum(data)
    .attr("class", "area-above")
    .attr("d", areaAbove);

  svg.append("text")
    .attr("x", (width / 2))
    .attr("y", 25 )
    .attr("class", "shadow")
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("text-decoration", "underline")
    .text("Value vs Date Graph on chart area");

  // Add the valueline path.
  svg.append("path")
    .attr("class", "line")
    .style("stroke", "black")
    .style("stroke-dasharray", ("3, 3"))// make line dashed
    .attr("d", valueline(data));

  svg.append("path") // Add the valueline2 path.
    .style("stroke", "red")
    .attr("d", valueline2(data));


  svg.append("text")
    .attr("transform", `translate(${width},${y(data[0].open)})`)
    .attr("dy", ".35em")
    .attr("text-anchor", "start")
    .style("fill", "red")
    .text("Open");

  svg.append("text")
    .attr("transform", `translate(${width}, ${y(data[0].close)})`)
    .attr("dy", ".35em")
    .attr("text-anchor", "start")
    .style("fill", "steelblue")
    .text("Close");

});
