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
const xAxis = d3.svg.axis().scale(x)
  .orient("bottom").ticks(5);

const yAxis = d3.svg.axis().scale(y)
  .orient("left").ticks(5);

// Define the line
const valueline = d3.svg.line()
  .x((d) => x(d.date1))
  .y((d) => y(d.close));

// Adds the svg canvas
const svg = d3.select("#container")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

// Get the data
d3.csv("data.csv", function(error, data) {
  data.forEach((d) => {
    d.date1 = parseDate(d.date);
    d.close = +d.close;
  });

  // Scale the range of the data
  x.domain(d3.extent(data, (d) => d.date1));
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

  // The table generation function
  const tabulate = (data, columns) => {
    const table = d3.select("#container").append("table")
      .attr("style", "margin-left: 250px"),
      thead = table.append("thead"),
      tbody = table.append("tbody");

    // append the header row
    thead.append("tr")
      .selectAll("th")
      .data(columns)
      .enter()
      .append("th")
      .text((column) => column);

    // create a row for each object in the data
    const rows = tbody.selectAll("tr")
      .data(data)
      .enter()
      .append("tr");

    // create a cell in each row for each column
    const cells = rows.selectAll("td")
      .data((row) => columns.map((column) => ({ column, value: row[column] })))
      .enter()
      .append("td")
      .attr("style", "font-family: Courier")
      .html((d) => d.value);

    return table;
  };

  // render the table
  const peopleTable = tabulate(data, ["date", "close"]);
});