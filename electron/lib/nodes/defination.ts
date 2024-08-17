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
    method: string;
  };
  meta: NodeMeta;
  next: NodesDef | null;
};

export type NodesDef = ApiRequestNodeDef;
