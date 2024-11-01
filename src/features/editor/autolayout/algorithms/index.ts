import { Edge, Node } from "@xyflow/react";

export type Direction = "TB" | "BT" | "LR" | "RL";

export type LayoutAlgorithm = (
  nodes: Node[],
  edges: Edge[]
) => Promise<{ nodes: Node[]; edges: Edge[] }>;
