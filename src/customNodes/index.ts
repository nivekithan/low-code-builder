import { ApiRequestNode } from "./components/apiRequest";

export const CustomNodes = {
  apiRequest: ApiRequestNode,
} as const;

export type CustomNodeType = keyof typeof CustomNodes;

export type CustomNodes = ApiRequestNode & { type: CustomNodeType };
