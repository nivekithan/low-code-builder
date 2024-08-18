import { Handle, NodeProps, Position, useReactFlow } from "@xyflow/react";
import { GetNodeComponent } from "..";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type ApiResponseNode = GetNodeComponent<"apiResponse">;

export function ApiResponseNode({ data, id }: NodeProps<ApiResponseNode>) {
  const reactflow = useReactFlow();

  function updateText(newText: string) {
    reactflow.updateNodeData(id, { text: newText });
  }

  return (
    <>
      <Handle type="target" position={Position.Top} />
      <Card>
        <CardHeader>
          <CardTitle>API Response</CardTitle>
          <CardDescription>
            Response to API request with text message
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Label>Text:</Label>
          <Input
            type="text"
            value={data.text}
            onChange={(e) => {
              updateText(e.currentTarget.value);
            }}
          />
        </CardContent>
      </Card>
    </>
  );
}
