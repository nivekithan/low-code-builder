import { ReactNode } from "@tanstack/react-router";
import { ApiRequestNode } from "./nodes/apiRequest";
import { ApiResponseNode } from "./nodes/apiResponse";
import type { CustomEdges, CustomNodes } from "common/types";
import { SimpleEdge } from "./edges/simple";
import { IfAndElseConditionNode } from "./nodes/ifAndElseCondition";
import {
  IfElseConditionOnFalse,
  IfElseConditionOnTrue,
} from "./edges/ifElseCondition";

// Mapping of type to the Node component
export const CustomNodeTypes: Record<CustomNodes["type"], ReactNode> = {
  apiRequest: ApiRequestNode,
  apiResponse: ApiResponseNode,
  ifAndElseCondition: IfAndElseConditionNode,
};

export const CustomEdgeTypes: Record<CustomEdges["type"], ReactNode> = {
  simple: SimpleEdge,
  "ifElseCondition-onTrue": IfElseConditionOnTrue,
  "ifElseCondition-onFalse": IfElseConditionOnFalse,
};
