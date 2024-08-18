export type NodeMeta = {
  position: {
    x: number;
    y: number;
  };
  id: string;
};

export type ApiRequestNodeDef = {
  type: "apiRequest";
  data: {
    method: "GET" | "POST" | "PUT" | "DELETE";
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
