import { Graph } from "../lexer/lexer";
import { BackendProject } from "../../nodes/defination";

export function parseGraph({ apiRequestNode, graph }: Graph) {
  const connectedNodes = graph.get(apiRequestNode);

  if (!connectedNodes || connectedNodes.length === 0) {
    throw new Error("No connected nodes found");
  }

  if (connectedNodes.length > 1) {
    throw new Error("Multiple connected nodes found");
  }

  const firstNode = connectedNodes[0];

  if (firstNode.type !== "apiResponse") {
    throw new Error("First connected node is not an API response node");
  }

  const definition: BackendProject["routes"][number]["definition"] = {
    type: "apiRequest",
    data: {
      method: apiRequestNode.data.method,
    },
    meta: {
      id: apiRequestNode.id,
      position: apiRequestNode.position,
    },
    next: {
      type: "apiResponse",
      data: {
        text: firstNode.data.text,
      },
      meta: {
        id: firstNode.id,
        position: firstNode.position,
      },
      next: null,
    },
  };

  return definition;
}
