// Set the dimensions of the canvas / graph
const margin = {top: 30, right: 20, bottom: 30, left: 50};
const width = 600 - margin.left - margin.right;
const height = 270 - margin.top - margin.bottom;

// Parse the date / time
const parseDate = d3.time.format("%d-%b-%y").parse;
const formatTime = d3.time.format("%e %B");

// Set the ranges
const x = d3.time.scale().range([0, width]);
const y = d3.scale.linear().range([height, 0]);

// Define the axes
const xAxis = d3.svg
  .axis()
  .scale(x)
  .orient("bottom")
  .ticks(5);

const yAxis = d3.svg
  .axis()
  .scale(y)
  .orient("left")
  .ticks(5);

// Define the line
const valueline = d3.svg.line()
  .x((d) => x(d.date))
  .y((d) => y(d.close));

// Define the div for the tooltip
const div = d3.select("body").append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

// Adds the svg canvas
const svg = d3.select("body")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

// Get the data
d3.csv("data.csv", (error, data) => {
  data.forEach((d) => {
    d.date = parseDate(d.date);
    d.close = +d.close;
  });

  // Scale the range of the data
  x.domain(d3.extent(data, (d) => d.date));
  y.domain([0, d3.max(data, (d) => d.close)]);

  // Add the valueline path.
  svg.append("path")
    .attr("class", "line")
    .attr("d", valueline(data));

  // Add the X Axis
  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", `translate(0,${height})`)
    .call(xAxis);

  // Add the Y Axis
  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);

  // select with filter and fill with const
  svg.selectAll("dot")
    .data(data)
    .enter().append("circle")
    .filter((d) => d.close < 400)
    .style("fill", "red")
    .attr("r", 3.5)
    .attr("cx", (d) => x(d.date))
    .attr("cy", (d) => y(d.close));

  // select with filter and fill with if-statement
  svg.selectAll("dot")
    .data(data)
    .enter().append("circle")
    .filter((d) => d.close > 400)
    .style("fill", (d) => (d.close >= 620) ? "lawngreen" : "black")
    .attr("r", 3.5)
    .attr("cx", (d) => x(d.date))
    .attr("cy", (d) => y(d.close));
});