const treeData = {
  "name": "Top Level",
  "parent": "null",
  "value": 10,
  "type": "black",
  "level": "red",
  "children": [
    {
      "name": "Level 2: A",
      "parent": "Top Level",
      "value": 15,
      "type": "grey",
      "level": "red",
      "children": [
        {
          "name": "Son of A",
          "parent": "Level 2: A",
          "value": 5,
          "type": "steelblue",
          "level": "orange"
        },
        {
          "name": "Daughter of A",
          "parent": "Level 2: A",
          "value": 8,
          "type": "steelblue",
          "level": "red"
        }
      ]
    },
    {
      "name": "Level 2: B",
      "parent": "Top Level",
      "value": 10,
      "type": "grey",
      "level": "green"
    }
  ]
};
// ************** Generate the tree diagram	 *****************
const margin = { top: 20, right: 120, bottom: 20, left: 120 };
const width = 960 - margin.right - margin.left;
const height = 500 - margin.top - margin.bottom;

const tree = d3.layout.tree().size([height, width]);
const diagonal = d3.svg.diagonal().projection((d) => [d.y, d.x]);
const svg = d3.select("#container")
  .append("svg")
  .attr("width", width + margin.right + margin.left)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

let i = 0;
const update = (source) => {
  // Compute the new tree layout.
  const nodes = tree.nodes(source).reverse();
  const links = tree.links(nodes);

  // Normalize for fixed-depth.
  nodes.forEach((d) => d.y = d.depth * 180);

  // Declare the nodes…
  const nodeEnter = svg
    .selectAll("g.node")
    .data(nodes, (d) => d.id || (d.id = ++i))
    .enter()
    .append("g")
    .attr("class", "node")
    .attr("transform", (d) => `translate(${d.y},${d.x})`);

  //   There are six pre-defined symbol types as follows;
  // • circle - a circle.
  // • cross - a Greek cross or plus sign.
  // • diamond - a rhombus.
  // • square - an axis-aligned square.
  // • triangle-down - a downward-pointing equilateral triangle.
  // • triangle-up - an upward-pointing equilateral triangle.
  nodeEnter.append("path")
    .attr("d", d3.svg.symbol()
      .size((d) => 10*d.value)
      .type((d) => (d.value >= 9)? "cross" : "diamond")
    )
    .style("stroke", (d) => d.type)
    .style("fill", (d) => d.level);

  nodeEnter.append("text")
    .attr("x", (d) =>  d.children || d._children ? (d.value + 4) * -1 : d.value + 4)
    .attr("dy", ".35em")
    .attr("text-anchor", (d) => d.children || d._children ? "end" : "start")
    .text((d) => d.name)
    .style("fill-opacity", 1);

  // Declare the links…
  svg.selectAll("path.link")
    .data(links, (d) => d.target.id)
    .enter()
    .insert("path", "g")
    .attr("class", "link")
    .style("stroke", (d) => d.target.level)
    .attr("d", diagonal);

};

update(treeData);
