const margin = { top: 5, right: 40, bottom: 20, left: 120 };
const width = 800 - margin.left - margin.right;
const height = 50 - margin.top - margin.bottom;

const chart = d3.bullet().width(width).height(height);

d3.json("data.json", (error, data) => {
  const svg = d3.select("#container").selectAll("svg")
    .data(data)
    .enter().append("svg")
    .attr("class", "bullet")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`)
    .call(chart);

  const title = svg.append("g")
    .style("text-anchor", "end")
    .attr("transform", `translate(-6,${height / 2})`);

  title.append("text")
    .attr("class", "title")
    .text((d) => d.title);

  title.append("text")
    .attr("class", "subtitle")
    .attr("dy", "1em")
    .text((d) => d.subtitle);

  d3.selectAll("button").on("click", () => svg.datum(randomize).call(chart.duration(1000)));
});

function randomize(d) {
  if (!d.randomizer) {
    d.randomizer = randomizer(d);
  }
  d.markers = d.markers.map(d.randomizer);
  d.measures = d.measures.map(d.randomizer);
  return d;
}

function randomizer(d) {
  const k = d3.max(d.ranges) * .2;
  return (d) => Math.max(0, d + k * (Math.random() - .5));
}
