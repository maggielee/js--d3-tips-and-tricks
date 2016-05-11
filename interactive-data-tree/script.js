const root = {
  "name": "Top Level",
  "parent": "null",
  "children": [
    {
      "name": "Level 2: A",
      "parent": "Top Level",
      "children": [
        {
          "name": "Son of A",
          "parent": "Level 2: A"
        },
        {
          "name": "Daughter of A",
          "parent": "Level 2: A",
          "children": [
            {
              "name": "Son of Daughter of A",
              "parent": "Daughter of A"
            },
            {
              "name": "Daughter of Daughter of A",
              "parent": "Daughter of A"
            }
          ]
        }
      ]
    },
    {
      "name": "Level 2: B",
      "parent": "Top Level"
    },
    {
      "name": "Level 3: C",
      "parent": "Top Level"
    },
    {
      "name": "Level 4: D",
      "parent": "Top Level"
    }
  ]
};


// ************** Generate the tree diagram	 *****************
const margin = { top: 20, right: 120, bottom: 20, left: 120 };
const width = 960 - margin.right - margin.left;
const height = 500 - margin.top - margin.bottom;
const duration = 750;
let i = 0;

const tree = d3.layout.tree().size([height, width]);
const diagonal = d3.svg.diagonal().projection((d) => [d.y, d.x]);

const svg = d3.select("#container").append("svg")
  .attr("width", width + margin.right + margin.left)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

root.x0 = height / 2;
root.y0 = 0;

d3.select(self.frameElement).style("height", "500px");


function update(source) {
  return new Promise((resolve) => {
    // Compute the new tree layout.
    const nodes = tree.nodes(root).reverse();
    const links = tree.links(nodes);

    // Normalize for fixed-depth.
    nodes.forEach((d) => d.y = d.depth * 180);

    // Update the nodes…
    const node = svg.selectAll("g.node").data(nodes, (d) => d.id || (d.id = ++i));

    // Enter any new nodes at the parent's previous position.
    var nodeEnter = node.enter().append("g")
      .attr("class", "node")
      .attr("transform", (d) => `translate(${source.y0},${source.x0})`)
      .on("click", click);

    nodeEnter.append("circle")
      .attr("r", 1e-6)
      .style("fill", (d) => d._children ? "lightsteelblue" : "#fff");

    nodeEnter.append("text")
      .attr("x", (d) => d.children || d._children ? -13 : 13)
      .attr("dy", ".35em")
      .attr("text-anchor", (d) => d.children || d._children ? "end" : "start")
      .text((d) => d.name)
      .style("fill-opacity", 1e-6);

    // Transition nodes to their new position.
    const nodeUpdate = node.transition()
      .duration(duration)
      .attr("transform", (d) => `translate(${d.y},${d.x})`);

    nodeUpdate.select("circle")
      .attr("r", 10)
      .style("fill", (d) => d._children ? "lightsteelblue" : "#fff");

    nodeUpdate.select("text")
      .style("fill-opacity", 1);

    // Transition exiting nodes to the parent's new position.
    const nodeExit = node.exit().transition()
      .duration(duration)
      .attr("transform", (d) => `translate(${source.y},${source.x})`)
      .remove();

    nodeExit.select("circle").attr("r", 1e-6);
    nodeExit.select("text").style("fill-opacity", 1e-6);

    // Update the links…
    const link = svg.selectAll("path.link").data(links, (d) => d.target.id);

    // Enter any new links at the parent's previous position.
    link.enter().insert("path", "g")
      .attr("class", "link")
      .attr("d", (d) => {
        let o = { x: source.x0, y: source.y0 };
        return diagonal({ source: o, target: o });
      });

    // Transition links to their new position.
    link.transition()
      .duration(duration)
      .attr("d", diagonal)
      .call(endall, resolve);

    // Transition exiting nodes to the parent's new position.
    link.exit().transition()
      .duration(duration)
      .attr("d", (d) => {
        let o = { x: source.x, y: source.y };
        return diagonal({ source: o, target: o });
      })
      .remove();

    // Stash the old positions for transition.
    nodes.forEach((d) => ((d.x0 = d.x), (d.y0 = d.y)));
  });
}

function endall(transition, callback) {
  if (transition.size() === 0) {
    callback()
  }
  let n = 0;
  transition
    .each(() => ++n)
    .each("end", () => (!--n) && callback.apply(this, arguments));
}

// Toggle children on click.
function toggleNode(d) {
  if (d.children) {
    d._children = d.children;
    d.children = null;
  } else {
    d.children = d._children;
    d._children = null;
  }
  return update(d);
}

function click(d) {
  let arr = [];
  if (Array.isArray(d.children)) {
    arr.push(...d.children);
  }

  return (function toggleChildren() {
      return arr.length  ? toggleNode(arr.pop()).then(toggleChildren) : toggleNode(d);
  })();
}


update(root);
