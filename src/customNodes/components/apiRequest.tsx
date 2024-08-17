import { Handle, NodeProps, Position } from "@xyflow/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GetNodeComponent } from "..";

export type ApiRequestNode = GetNodeComponent<"apiRequest">;

export function ApiRequestNode({ data }: NodeProps<ApiRequestNode>) {
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <Card>
        <CardHeader>
          <CardTitle>API Request</CardTitle>
          <CardDescription>
            Choose the method which the client can use
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>{data.method}</p>
        </CardContent>
        <Handle type="source" position={Position.Bottom} />
      </Card>
    </>
  );
}
