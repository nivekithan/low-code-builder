import { Handle, NodeProps, Position, useReactFlow } from "@xyflow/react";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  FixedCard,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import type { CustomEdges, GetNodeComponent, CustomNodes } from "common/types";
import { JavascriptEditorInput } from "../components/JavascriptEditor";

type ApiResponseNode = GetNodeComponent<"apiResponse">;

export function ApiResponseNode({ data, id }: NodeProps<ApiResponseNode>) {
  const reactflow = useReactFlow<CustomNodes, CustomEdges>();

  function updateText(newText: string) {
    reactflow.updateNodeData(id, {
      text: { type: "astExpression", value: newText },
    });
  }

  return (
    <>
      <Handle type="target" position={Position.Top} />
      <FixedCard>
        <CardHeader>
          <CardTitle>API Response</CardTitle>
          <CardDescription>
            Response to API request with text message
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Label>Text:</Label>
          <JavascriptEditorInput
            defaultValue={data.text.value}
            onChange={(value) => updateText(value ?? "")}
          />
        </CardContent>
      </FixedCard>
    </>
  );
}
