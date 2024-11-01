import Elk, { type ElkNode } from "elkjs/lib/elk.bundled.js";
import { Direction, LayoutAlgorithm } from ".";

const elk = new Elk();

function getDirection(direction: Direction) {
  switch (direction) {
    case "TB":
      return "DOWN";
    case "LR":
      return "RIGHT";
    case "BT":
      return "UP";
    case "RL":
      return "LEFT";
  }
}

export const elkLayoutAlgorithm: LayoutAlgorithm = async (nodes, edges) => {
  const graph = {
    id: "elk-root",
    layoutOptions: {
      "elk.algorithm": "mrtree",
      "elk.direction": getDirection("TB"),
      "elk.spacing.nodeNode": `${50}`,
    },
    children: nodes.map((node) => ({
      id: node.id,
      width: node.measured?.width ?? 0,
      height: node.measured?.height ?? 0,
    })),
    edges: edges.map((edge) => ({
      id: edge.id,
      sources: [edge.source],
      targets: [edge.target],
    })),
  };

  // We create a map of the laid out nodes here to avoid multiple traversals when
  // looking up a node's position later on.
  const root = await elk.layout(graph);
  const layoutNodes = new Map<string, ElkNode>();
  for (const node of root.children ?? []) {
    layoutNodes.set(node.id, node);
  }

  const nextNodes = nodes.map((node) => {
    const elkNode = layoutNodes.get(node.id)!;
    const position = { x: elkNode.x!, y: elkNode.y! };

    return {
      ...node,
      position,
    };
  });

  return { nodes: nextNodes, edges };
};
