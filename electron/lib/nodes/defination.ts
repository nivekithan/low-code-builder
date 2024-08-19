export type NodeMeta = {
  position: {
    x: number;
    y: number;
  };
  id: string;
};

export type ApiRequestMethod = "GET" | "POST" | "PUT" | "DELETE";

export type ApiRequestNodeDef = {
  type: "apiRequest";
  data: {
    method: ApiRequestMethod;
  };
  meta: NodeMeta;
  next: NodesDef | null;
};

export type ApiResponseNodeDef = {
  type: "apiResponse";
  data: {
    text: string;
  };
  meta: NodeMeta;
  next: null;
};

export type NodesDef = ApiRequestNodeDef | ApiResponseNodeDef;

export type BackendProject = {
  routes: Array<{ route: string; definition: ApiRequestNodeDef }>;
  name: string;
};
