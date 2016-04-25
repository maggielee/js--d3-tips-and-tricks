const margin = { top: 30, right: 40, bottom: 70, left: 50 };
const width = 600 - margin.left - margin.right;
const height = 300 - margin.top - margin.bottom;

const parseDate = d3.time.format("%d-%b-%y").parse;

const x = d3.time.scale().range([0, width]);
const y0 = d3.scale.linear().range([height, 0]);
const y1 = d3.scale.linear().range([height, 0]);

const xAxis = d3.svg.axis().scale(x)
  .orient("bottom").ticks(5);

const yAxisLeft = d3.svg.axis().scale(y0)
  .orient("left").ticks(5);

const yAxisRight = d3.svg.axis().scale(y1)
  .orient("right").ticks(5);

const valueline = d3.svg.line()
  .x((d) => x(d.date))
  .y((d) => y0(d.close));

const valueline2 = d3.svg.line()
  .x((d) => x(d.date))
  .y((d) => y1(d.open));

const svg = d3.select("body")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

const data = [
  { "date": "9-Apr-12", "close": 436, "open": 9.04 },
  { "date": "7-Apr-12", "close": 221, "open": 4.02 },
  { "date": "5-Apr-12", "close": 113, "open": 9.02 },
  { "date": "4-Apr-12", "close": 64, "open": 32.05 },
  { "date": "3-Apr-12", "close": 29, "open": 46.03 },
  { "date": "2-Apr-12", "close": 18, "open": 51.03 }
];

// Get the data
data.forEach((d) => {
  d.date = parseDate(d.date);
  d.close = +d.close;
  d.open = +d.open;
});

// Scale the range of the data
x.domain(d3.extent(data, (d) => d.date));
y0.domain([0, d3.max(data, (d) => Math.max(d.close))]);
y1.domain([0, d3.max(data, (d) => Math.max(d.open))]);

svg.append("path")
  .attr("class", "line")
  .attr("id", "blueLine")
  .attr("d", valueline(data));

svg.append("path")
  .attr("class", "line")
  .style("stroke", "red")
  .attr("id", "redLine")
  .attr("d", valueline2(data));

svg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")")
  .call(xAxis);

// edit the Y Axis Left
svg.append("g")
  .attr("class", "y axis")
  .style("fill", "steelblue")
  .attr("id", "blueAxis")
  .call(yAxisLeft);

svg.append("g")
  .attr("class", "y axis")
  .attr("transform", "translate(" + width + " ,0)")
  .style("fill", "red")
  .attr("id", "redAxis")
  .call(yAxisRight);

const clickHandler = (color) => () => {
  const lineElement = document.querySelector(`#${color}Line`);
  // Determine if current line is visible
  const active = lineElement.active ? false : true;
  const newOpacity = active ? 0 : 1;
  // Hide or show the elements
  d3.select(lineElement).style("opacity", newOpacity);
  d3.select(`#${color}Axis`).style("opacity", newOpacity);
  // Update whether or not the elements are active
  lineElement.active = active;
}

// Add the blue line title
svg.append("text")
  .attr("x", 0)
  .attr("y", height + margin.top + 10)
  .attr("class", "legend")
  .style("fill", "steelblue")
  .on("click", clickHandler('blue'))
  .text("Blue Line");

// Add the red line title
svg.append("text")
  .attr("x", 0)
  .attr("y", height + margin.top + 30)
  .attr("class", "legend")
  .style("fill", "red")
  .on("click", clickHandler('red'))
  .text("Red Line");
