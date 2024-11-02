import type { CustomEdges, CustomEdgeType, CustomNodes } from "common/types";

export function getNodesBasedOnEdge<T extends Record<string, CustomEdgeType>>(
  v: T,
  nodes: { node: CustomNodes; edge: CustomEdges }[]
): { [K in keyof T]: CustomNodes | null } {
  const result: Record<string, CustomNodes | null> = {};

  for (const [name, edgeType] of Object.entries(v)) {
    const node = nodes.find((n) => n.edge.type === edgeType);

    if (!node) {
      result[name] = null;
      continue;
    }

    result[name] = node.node;
  }

  return result as { [K in keyof T]: CustomNodes | null };
}
