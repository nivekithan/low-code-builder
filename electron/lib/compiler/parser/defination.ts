import {
  ClientApiRequestNode,
  ClientApiResponseNode,
  NodePosition,
} from "common/types";

export type NodeMeta = {
  position: NodePosition;
  id: string;
};

export type ApiRequestNodeDef = {
  type: "apiRequest";
  data: ClientApiRequestNode["data"];
  meta: NodeMeta;
  next: NodesDef | null;
};

export type ApiResponseNodeDef = {
  type: "apiResponse";
  data: ClientApiResponseNode["data"];
  meta: NodeMeta;
  next: null;
};

export type NodesDef = ApiRequestNodeDef | ApiResponseNodeDef;

export type BackendProject = {
  routes: Array<{ route: string; definition: ApiRequestNodeDef }>;
  name: string;
};
