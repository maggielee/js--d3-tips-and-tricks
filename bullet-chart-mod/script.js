const margin = { top: 5, right: 40, bottom: 20, left: 120 };
const width = 800 - margin.left - margin.right;
const height = 50 - margin.top - margin.bottom;

const chart = d3.bullet()
  .width(width)
  .height(height);

const svgCollection = d3.select("#container").selectAll("svg");

fetchData((error, data) => {
  const svg = d3.select("body").selectAll("svg")
    .data(data)
    .enter().append("svg")
    .attr("class", "bullet")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`)
    .call(chart);

  var title = svg.append("g")
    .style("text-anchor", "end")
    .attr("transform", `translate(-6,${height / 2})`);

  title.append("text")
    .attr("class", "title")
    .text((d) => d.title);

  title.append("text")
    .attr("class", "subtitle")
    .attr("dy", "1em")
    .text((d) => d.subtitle);

  setInterval(updateData, 1000);
});

function updateData() {
  fetchData((error, data) => {
    d3.select("body").selectAll("svg")
      .datum( (d, i) => {
        d.ranges = data[i].ranges;
        d.measures = data[i].measures;
        d.markers = data[i].markers;
        return d;
      })
      .call(chart.duration(1000 + Math.random()*500));
  });
}

function fetchData(cb) {
  return cb(null, [
    {
      "title": "CPU Load",
      "subtitle": "GHz",
      "ranges": [ 1500, 2250, 3000 ],
      "measures": [ Math.random()*3000 ],
      "markers": [ Math.random()*3000 ]
    },
    {
      "title": "Memory Used",
      "subtitle": "MBytes",
      "ranges": [ 256, 512, 1024 ],
      "measures": [ Math.random()*1000 ],
      "markers": [ Math.random()*1000 ]
    },
    {
      "title": "Disk usage",
      "subtitle": "GBytes",
      "ranges": [ 1000, 2000, 3000, 4000, 5000 ],
      "measures": [ Math.random()*5000 ],
      "markers": [ Math.random()*5000 ]
    }
  ]);
}