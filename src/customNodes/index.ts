import { ReactNode } from "@tanstack/react-router";
import { ApiRequestNode } from "./components/apiRequest";
import { ApiResponseNode } from "./components/apiResponse";
import type { CustomNodes } from "common/types";

// Mapping of type to the Node component
export const CustomNodeTypes: Record<CustomNodes["type"], ReactNode> = {
  apiRequest: ApiRequestNode,
  apiResponse: ApiResponseNode,
};
