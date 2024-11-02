import type { CustomEdges, CustomNodes, GetNodeComponent } from "common/types";

export type Graph = {
  graph: WeakMap<CustomNodes, { node: CustomNodes; edge: CustomEdges }[]>;
  apiRequestNode: GetNodeComponent<"apiRequest">;
};

export function tokeniseNodesAndEdges(
  customNodes: CustomNodes[],
  edges: CustomEdges[]
): Graph {
  const graph = new WeakMap<
    CustomNodes,
    { node: CustomNodes; edge: CustomEdges }[]
  >();

  const customNodesMap = processCustomNodes(customNodes);
  let apiRequestNode: GetNodeComponent<"apiRequest"> | null = null;

  for (const edge of edges) {
    const sourceId = edge.source;
    const targetId = edge.target;

    const sourceNode = customNodesMap.get(sourceId);

    if (!sourceNode) {
      throw new Error(`Source node with id ${sourceId} not found`);
    }

    const targetNode = customNodesMap.get(targetId);

    if (!targetNode) {
      throw new Error(`Target node with id ${targetId} not found`);
    }

    if (sourceNode.type === "apiRequest" && apiRequestNode) {
      throw new Error("Multiple apiRequest nodes found");
    }

    if (sourceNode.type === "apiRequest" && !apiRequestNode) {
      apiRequestNode = sourceNode;
    }

    const currentEdges = graph.get(sourceNode) || [];

    currentEdges.push({ node: targetNode, edge: edge });

    graph.set(sourceNode, currentEdges);
  }

  if (!apiRequestNode) {
    throw new Error("No API request node found");
  }

  return { graph, apiRequestNode };
}

function processCustomNodes(customNodes: CustomNodes[]) {
  const nodes = new Map<string, CustomNodes>();

  customNodes.forEach((node) => {
    nodes.set(node.id, node);
  });

  return nodes;
}
