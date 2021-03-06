const width = 960;
const height = 500;

const projection = d3.geo.mercator()
  .center([0, 5 ])
  .scale(150)
  .rotate([-180,0]);

const svg = d3.select("#container").append("svg")
  .attr("width", width)
  .attr("height", height);

const path = d3.geo.path().projection(projection);
const g = svg.append("g");
const c20c = d3.scale.category20c();

// load and display the World
d3.json("world-110m2.json", (error, topology) => {
  g.selectAll("path")
    .data(topojson.object(topology, topology.objects.countries).geometries)
    .enter()
    .append("path")
    .attr("d", path)
    .style('fill', (d) => c20c(d.id))
});

var zoom = d3.behavior.zoom()
  .on("zoom",() => {
    g.attr("transform",`translate(${d3.event.translate.join(",")})scale(${d3.event.scale})`);
    g.selectAll("path").attr("d", path.projection(projection));
  });
svg.call(zoom);