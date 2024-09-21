import { ReactNode } from "@tanstack/react-router";
import { ApiRequestNode } from "./nodes/apiRequest";
import { ApiResponseNode } from "./nodes/apiResponse";
import type { CustomNodes } from "common/types";

// Mapping of type to the Node component
export const CustomNodeTypes: Record<CustomNodes["type"], ReactNode> = {
  apiRequest: ApiRequestNode,
  apiResponse: ApiResponseNode,
};
