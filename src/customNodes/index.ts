import { ReactNode } from "@tanstack/react-router";
import { ApiRequestNode } from "./nodes/apiRequest";
import { ApiResponseNode } from "./nodes/apiResponse";
import type { CustomEdges, CustomNodes } from "common/types";
import { SimpleEdge } from "./edges/simple";

// Mapping of type to the Node component
export const CustomNodeTypes: Record<CustomNodes["type"], ReactNode> = {
  apiRequest: ApiRequestNode,
  apiResponse: ApiResponseNode,
};

export const CustomEdgeTypes: Record<CustomEdges["type"], ReactNode> = {
  simple: SimpleEdge,
};
