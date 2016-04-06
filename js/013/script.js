// Starting with a basic graph

// Set the dimensions of the canvas / graph
const margin = { top: 30, right: 20, bottom: 30, left: 50 };
const width = 600 - margin.left - margin.right;
const height = 270 - margin.top - margin.bottom;

// Parse the date / time
const parseDate = d3.time.format("%d-%b-%y").parse;

// Set the ranges
const x = d3.time.scale().range([0, width]);
const y = d3.scale.linear().range([height, 0]);

// Define the axes
const xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(5);
const yAxis = d3.svg.axis().scale(y).orient("left").ticks(10);

// Define the line
const valueline = d3.svg.line()
  .x((d) => x(d.date))
  .y((d) => y(d.close));

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
});