const width = 960;
const height = 500;

const svg = d3.select("#container")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

d3.csv("data.csv", (error, links) => {
  var nodes = {};

  // Compute the distinct nodes from the links.
  links.forEach((link) => {
    link.source = nodes[link.source] || (nodes[link.source] = { name: link.source });
    link.target = nodes[link.target] || (nodes[link.target] = { name: link.target });
    link.value = +link.value;
  });

  const v = d3.scale.linear().range([0, 100]).domain([0, d3.max(links, (d) => d.value)]);
  links.forEach((link) => {
    const value = link.value * 50;
    if (value <= 25) {
      link.type = "twofive";
    } else if (value <= 50 && value > 25) {
      link.type = "fivezero";
    } else if (value <= 75 && value > 50) {
      link.type = "sevenfive";
    } else {
      link.type = "onezerozero";
    }
  });

  const force = d3.layout.force()
    .nodes(d3.values(nodes))
    .links(links)
    .size([width, height])
    .linkDistance((d) => Math.pow(d.value, 2) * 60 * 3)
    .charge(-300)
    .on("tick", tick)
    .start();


  // build the arrow.
  svg.append("svg:defs").selectAll("marker")
    .data(["end"])      // Different link/path types can be defined here
    .enter().append("svg:marker")    // This section adds in the arrows
    .attr("id", String)
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 15)
    .attr("refY", -1.5)
    .attr("markerWidth", 6)
    .attr("markerHeight", 6)
    .attr("orient", "auto")
    .append("svg:path")
    .attr("d", "M0,-5L10,0L0,5");

  // add the links and the arrows
  const path = svg.append("svg:g").selectAll("path")
    .data(force.links())
    .enter().append("svg:path")
    .attr("class", (d) => `link ${d.type}`)
    .attr("marker-end", "url(#end)");

  // define the nodes
  const node = svg.selectAll(".node")
    .data(force.nodes())
    .enter().append("g")
    .attr("class", "node")
    .on("click", click)
    .on("dblclick", dblclick)
    .call(force.drag);

  // add the nodes
  const color = d3.scale.category20c();
  node.append("circle")
    .attr("r", 5)
    .style("fill", (d) => color(d.name));

  // add the text
  node.append("text")
    .attr("x", 12)
    .attr("dy", ".35em")
    .text((d) => d.name);

  // add the curvy lines
  function tick() {
    path.attr("d", (d) => {
      const dx = d.target.x - d.source.x;
      const dy = d.target.y - d.source.y;
      const dr = Math.sqrt(dx * dx + dy * dy);
      return `M${d.source.x},${d.source.y}A${dr},${dr} 0 0,1 ${d.target.x},${d.target.y}`;
    });

    node.attr("transform", (d) => `translate(${d.x},${d.y})`);
  }

  function click() {
    d3.select(this).select("text").transition()
      .duration(750)
      .attr("x", 22)
      .style("stroke", "lightsteelblue")
      .style("stroke-width", ".5px")
      .style("font", "20px sans-serif");
    d3.select(this).select("circle").transition()
      .duration(750)
      .attr("r", 16);
  }

  function dblclick() {
    d3.select(this).select("circle").transition()
      .duration(750)
      .attr("r", 6);
    d3.select(this).select("text").transition()
      .duration(750)
      .attr("x", 12)
      .style("stroke", "none")
      .style("stroke", "none")
      .style("font", "10px sans-serif");
  }
});
