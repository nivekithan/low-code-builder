import type { Edge, Node } from "@xyflow/react";
import type { NodesDef } from "electron/lib/nodes/defination";

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

export type ClientApiRoute = {
  customNodes: CustomNodes[];
  edges: Edge[];
  route: string;
};
export type ClientProject = {
  apiRoutes: ClientApiRoute[];
  name: string;
};
