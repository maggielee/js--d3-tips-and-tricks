const margin = { top: 20, right: 120, bottom: 20, left: 120 };
const width = 960 - margin.right - margin.left;
const height = 500 - margin.top - margin.bottom;
const tree = d3.layout.tree().size([height, width]);
const diagonal = d3.svg.diagonal().projection((d) => [d.y, d.x]);

const svg = d3.select("body").append("svg")
  .attr("width", width + margin.right + margin.left)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

const update = (source) => {
  let i = 0;

  // Compute the new tree layout.
  const nodes = tree.nodes(source).reverse();
  const links = tree.links(nodes);

  // Normalize for fixed-depth.
  nodes.forEach((d) => d.y = d.depth * 180);

  // Declare the nodes…
  var nodeEnter = svg.selectAll("g.node")
    .data(nodes, (d) => d.id || (d.id = ++i))
    // Enter the nodes.
    .enter().append("g")
    .attr("class", "node")
    .attr("transform", (d) => `translate(${d.y},${d.x})`);

  nodeEnter.append("circle")
    .attr("r", 10)
    .style("fill", "#fff");

  nodeEnter.append("text")
    .attr("x", (d) => d.children || d._children ? -13 : 13)
    .attr("dy", ".35em")
    .attr("text-anchor", (d) => d.children || d._children ? "end" : "start")
    .text((d) => d.name)
    .style("fill-opacity", 1);

  // Declare the links…
  svg.selectAll("path.link")
    .data(links, (d) => d.target.id)
    // Enter the links.
    .enter().insert("path", "g")
    .attr("class", "link")
    .attr("d", diagonal);
};

d3.json("data.json", (error, treeData) => update(treeData[0]));

