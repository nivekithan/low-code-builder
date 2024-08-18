import { Handle, NodeProps, Position, useReactFlow } from "@xyflow/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GetNodeComponent } from "..";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

type ApiRequestNode = GetNodeComponent<"apiRequest">;

type MethodType = ApiRequestNode["data"]["method"];

const methods: MethodType[] = ["GET", "POST", "PUT", "DELETE"];

export function ApiRequestNode({ data, id }: NodeProps<ApiRequestNode>) {
  const reactflow = useReactFlow();

  function updateNodeData(data: Partial<ApiRequestNode["data"]>) {
    reactflow.updateNodeData(id, data);
  }
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>API Request</CardTitle>
          <CardDescription>
            Choose the method which the client can use
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Label>Method:</Label>
          <Select
            value={data.method}
            onValueChange={(newValue: MethodType) => {
              updateNodeData({ method: newValue });
            }}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {methods.map((method) => {
                return (
                  <SelectItem key={method} value={method}>
                    {method}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </CardContent>
        <Handle type="source" position={Position.Bottom} />
      </Card>
    </>
  );
}
