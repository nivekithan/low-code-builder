import { Handle, Node, NodeProps, Position } from "@xyflow/react";
import { Heading } from "@/components/ui/text";

export type ApiRequestNode = Node<{ method: string }>;

export function ApiRequestNode({ data }: NodeProps<ApiRequestNode>) {
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div className="border p-4">
        <Heading>{data.method}</Heading>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </>
  );
}
