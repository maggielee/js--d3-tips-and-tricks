const units = "Widgets";

const margin = { top: 10, right: 10, bottom: 10, left: 10 };
const width = 700 - margin.left - margin.right;
const height = 300 - margin.top - margin.bottom;

const formatNumber = d3.format(",.0f");    // zero decimal places
const format = (d) => `${formatNumber(d)} ${units}`;
const color = d3.scale.category20();

// append the svg canvas to the page
const svg = d3.select("#container").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

// Set the sankey diagram properties
const sankey = d3.sankey()
  .nodeWidth(36)
  .nodePadding(40)
  .size([width, height]);

const path = sankey.link();

// load the data
d3.json("data.json", (error, graph) => {
  sankey
    .nodes(graph.nodes)
    .links(graph.links)
    .layout(32);

  // add in the links
  const link = svg.append("g").selectAll(".link")
    .data(graph.links)
    .enter().append("path")
    .attr("class", "link")
    .attr("d", path)
    .style("stroke-width", (d) => Math.max(1, d.dy))
    .sort((a, b) => b.dy - a.dy);

  // add the link titles
  link.append("title")
    .text((d) => `${d.source.name} → ${d.target.name} ${format(d.value)}`);

  // add in the nodes
  const node = svg.append("g").selectAll(".node")
    .data(graph.nodes)
    .enter().append("g")
    .attr("class", "node")
    .attr("transform", (d) => `translate(${d.x},${d.y})`)
    .call(d3.behavior.drag()
      .origin((d) => d)
      .on("dragstart", function() {
        this.parentNode.appendChild(this);
      })
      .on("drag", function dragmove(d) {
          d3.select(this).attr("transform", `translate(${d.x}, ${(d.y = Math.max(0, Math.min(height - d.dy, d3.event.y)))})`);
          sankey.relayout();
          link.attr("d", path);
        })
    );

  // add the rectangles for the nodes
  node.append("rect")
    .attr("height", (d) => d.dy)
    .attr("width", sankey.nodeWidth())
    .style("fill", (d) => d.color = color(d.name.replace(/ .*/, "")))
    .style("stroke", (d) => d3.rgb(d.color).darker(2))
    .append("title")
    .text((d) => `${d.name} ${format(d.value)}`);

  // add in the title for the nodes
  node.append("text")
    .attr("x", -6)
    .attr("y", (d) => d.dy / 2)
    .attr("dy", ".35em")
    .attr("text-anchor", "end")
    .attr("transform", null)
    .text((d) => d.name)
    .filter((d) => d.x < width / 2)
    .attr("x", 6 + sankey.nodeWidth())
    .attr("text-anchor", "start");
});