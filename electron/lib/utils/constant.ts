import { NodeMeta } from "../compiler/parser/defination";

export function generateEmptyMeta(): NodeMeta {
  return {
    id: crypto.randomUUID().slice(0, 6),
    position: {
      x: 0,
      y: 0,
    },
  };
}
