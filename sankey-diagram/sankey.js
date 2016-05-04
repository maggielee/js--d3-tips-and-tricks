d3.sankey = () => {
  const sankey = {};
  let nodeWidth = 24;
  let nodePadding = 8;
  let size = [1, 1];
  let nodes = [];
  let links = [];

  const ascendingDepth = (a, b) => a.y - b.y;
  const ascendingSourceDepth = (a, b) => a.source.y - b.source.y;
  const ascendingTargetDepth = (a, b) => a.target.y - b.target.y;
  const center = (node) => node.y + node.dy / 2;
  const computeNodeValues = () => nodes.forEach((node) => node.value = Math.max(d3.sum(node.sourceLinks, value), d3.sum(node.targetLinks, value)));
  const moveSinksRight = (x) => nodes.forEach((node) => !node.sourceLinks.length && (node.x = x - 1));
  const moveSourcesRight = () => nodes.forEach((node) => !node.targetLinks.length && (node.x = d3.min(node.sourceLinks, (d) =>d.target.x) - 1));
  const scaleNodeBreadths = (kx) => nodes.forEach((node) => node.x *= kx);
  const value = (link) => link.value;
  const weightedSource = (link) => center(link.source) * link.value;
  const weightedTarget = (link) => center(link.target) * link.value;

  sankey.nodeWidth = function(_) {
    if (!arguments.length) return nodeWidth;
    nodeWidth = +_;
    return sankey;
  };

  sankey.nodePadding = function(_) {
    if (!arguments.length) return nodePadding;
    nodePadding = +_;
    return sankey;
  };

  sankey.nodes = function(_) {
    if (!arguments.length) return nodes;
    nodes = _;
    return sankey;
  };

  sankey.links = function(_) {
    if (!arguments.length) return links;
    links = _;
    return sankey;
  };

  sankey.size = function(_) {
    if (!arguments.length) return size;
    size = _;
    return sankey;
  };

  sankey.layout = (iterations) => {
    computeNodeLinks();
    computeNodeValues();
    computeNodeBreadths();
    computeNodeDepths(iterations);
    computeLinkDepths();
    return sankey;
  };

  sankey.relayout = () => (computeLinkDepths(), sankey);

  sankey.link = () => {
    let curvature = .5;

    function link(d) {
      const x0 = d.source.x + d.source.dx,
        x1 = d.target.x,
        xi = d3.interpolateNumber(x0, x1),
        x2 = xi(curvature),
        x3 = xi(1 - curvature),
        y0 = d.source.y + d.sy + d.dy / 2,
        y1 = d.target.y + d.ty + d.dy / 2;
      return `M${x0},${y0}C${x2},${y0} ${x3},${y1} ${x1},${y1}`;
    }

    link.curvature = (_) => {
      if (!arguments.length) return curvature;
      curvature = +_;
      return link;
    };

    return link;
  };

  // Populate the sourceLinks and targetLinks for each node.
  // Also, if the source and target are not objects, assume they are indices.

  function computeNodeLinks() {
    nodes.forEach((node) => (node.sourceLinks = [], node.targetLinks = []));
    links.forEach((link) => {
      let source = link.source;
      let target = link.target;
      if (typeof source === "number") source = link.source = nodes[link.source];
      if (typeof target === "number") target = link.target = nodes[link.target];
      source.sourceLinks.push(link);
      target.targetLinks.push(link);
    });
  }

  // Iteratively assign the breadth (x-position) for each node.
  // Nodes are assigned the maximum breadth of incoming neighbors plus one;
  // nodes with no incoming links are assigned breadth zero, while
  // nodes with no outgoing links are assigned the maximum breadth.

  function computeNodeBreadths() {
    let remainingNodes = nodes;
    let nextNodes;
    let x = 0;

    while (remainingNodes.length) {
      nextNodes = [];
      remainingNodes.forEach((node) => {
        node.x = x;
        node.dx = nodeWidth;
        node.sourceLinks.forEach((link) => nextNodes.push(link.target));
      });
      remainingNodes = nextNodes;
      ++x;
    }

    //
    moveSinksRight(x);
    scaleNodeBreadths((width - nodeWidth) / (x - 1));
  }


  function computeNodeDepths(iterations) {
    const nodesByBreadth = d3.nest()
      .key((d) => d.x)
      .sortKeys(d3.ascending)
      .entries(nodes)
      .map((d) => d.values);

    const relaxLeftToRight = (alpha) =>nodesByBreadth.forEach((nodes, breadth) => nodes.forEach((node) => {
          if (node.targetLinks.length) {
            const y = d3.sum(node.targetLinks, weightedSource) / d3.sum(node.targetLinks, value);
            node.y += (y - center(node)) * alpha;
          }
        })
      );

    const relaxRightToLeft = (alpha) => nodesByBreadth.slice().reverse().forEach((nodes) => nodes.forEach((node) => {
          if (node.sourceLinks.length) {
            const y = d3.sum(node.sourceLinks, weightedTarget) / d3.sum(node.sourceLinks, value);
            node.y += (y - center(node)) * alpha;
          }
        })
      );

    //
    initializeNodeDepth();
    resolveCollisions();
    for (let alpha = 1; iterations > 0; --iterations) {
      relaxRightToLeft(alpha *= .99);
      resolveCollisions();
      relaxLeftToRight(alpha);
      resolveCollisions();
    }

    function initializeNodeDepth() {
      const ky = d3.min(nodesByBreadth, (nodes) => (size[1] - (nodes.length - 1) * nodePadding) / d3.sum(nodes, value));

      nodesByBreadth.forEach((nodes) => nodes.forEach((node, i) => (node.y = i, node.dy = node.value * ky)));

      links.forEach((link) => link.dy = link.value * ky);
    }

    function resolveCollisions() {
      nodesByBreadth.forEach((nodes) => {
        let node;
        let dy;
        let y0 = 0;
        let n = nodes.length;
        let i;

        // Push any overlapping nodes down.
        nodes.sort(ascendingDepth);
        for (i = 0; i < n; ++i) {
          node = nodes[i];
          dy = y0 - node.y;
          if (dy > 0) node.y += dy;
          y0 = node.y + node.dy + nodePadding;
        }

        // If the bottommost node goes outside the bounds, push it back up.
        dy = y0 - nodePadding - size[1];
        if (dy > 0) {
          y0 = node.y -= dy;

          // Push any overlapping nodes back up.
          for (i = n - 2; i >= 0; --i) {
            node = nodes[i];
            dy = node.y + node.dy + nodePadding - y0;
            if (dy > 0) node.y -= dy;
            y0 = node.y;
          }
        }
      });
    }
  }

  function computeLinkDepths() {
    nodes.forEach((node) => (node.sourceLinks.sort(ascendingTargetDepth), node.targetLinks.sort(ascendingSourceDepth)));
    nodes.forEach((node) => {
      let sy = 0;
      let ty = 0;
      node.sourceLinks.forEach((link) => (link.sy = sy, sy += link.dy));
      node.targetLinks.forEach((link) => (link.ty = ty, ty += link.dy));
    });
  }

  return sankey;
};