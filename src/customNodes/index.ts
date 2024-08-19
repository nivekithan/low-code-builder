import { ReactNode } from "@tanstack/react-router";
import { Node } from "@xyflow/react";
import type { NodesDef } from "electron/lib/nodes/defination";
import { ApiRequestNode } from "./components/apiRequest";
import { ApiResponseNode } from "./components/apiResponse";

type ConvertToCustomNodes<T> = T extends NodesDef
  ? Node<T["data"]> & {
      type: T["type"];
    }
  : never;

// Converts the NodesDef to Node<data>
export type CustomNodes = ConvertToCustomNodes<NodesDef>;

// Utlity to get the Node<data> using type name
export type GetNodeComponent<T extends CustomNodes["type"]> =
  CustomNodes extends infer U ? (U extends { type: T } ? U : never) : never;

// Mapping of type to the Node component
export const CustomNodeTypes: Record<CustomNodes["type"], ReactNode> = {
  apiRequest: ApiRequestNode,
  apiResponse: ApiResponseNode,
};