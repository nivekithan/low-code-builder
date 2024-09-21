import { z } from "zod";

export const NodePositionSchema = z.object({
  x: z.number(),
  y: z.number(),
});

export type NodePosition = z.infer<typeof NodePositionSchema>;

export const ClientApiRequestNodeSchema = z.object({
  type: z.literal("apiRequest"),
  data: z.object({
    method: z.union([
      z.literal("GET"),
      z.literal("POST"),
      z.literal("PUT"),
      z.literal("DELETE"),
    ]),
    definedHeaders: z
      .array(z.object({ id: z.string(), value: z.string() }))
      .default([]),
  }),
  id: z.string(),
  position: NodePositionSchema,
});

export type ClientApiRequestNode = z.infer<typeof ClientApiRequestNodeSchema>;
export type ClientApiRequestMethod = ClientApiRequestNode["data"]["method"];

export const ClientApiResponseNodeSchema = z.object({
  type: z.literal("apiResponse"),
  data: z.object({
    text: z.string(),
  }),
  id: z.string(),
  position: NodePositionSchema,
});

export type ClientApiResponseNode = z.infer<typeof ClientApiResponseNodeSchema>;

export const CustomNodesSchema = z.discriminatedUnion("type", [
  ClientApiRequestNodeSchema,
  ClientApiResponseNodeSchema,
]);

export const EdgeSchema = z.object({
  source: z.string(),
  target: z.string(),
  id: z.string(),
});

export type Edge = z.infer<typeof EdgeSchema>;

export type CustomNodes = z.infer<typeof CustomNodesSchema>;

// Utility to get the Node<data> using type name
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
