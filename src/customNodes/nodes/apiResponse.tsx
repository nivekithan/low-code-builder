import { Handle, NodeProps, Position, useReactFlow } from "@xyflow/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { type CustomNodes, type GetNodeComponent } from "common/types";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { JavascriptEditor } from "../components/JavascriptEditor";
import { LinkIcon } from "lucide-react";

type ApiResponseNode = GetNodeComponent<"apiResponse">;

export function ApiResponseNode({ data, id }: NodeProps<ApiResponseNode>) {
  const reactflow = useReactFlow<CustomNodes, Edge>();

  function updateText(newText: string) {
    reactflow.updateNodeData(id, {
      text: { type: "astExpression", value: newText },
    });
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
          <div className="flex gap-x-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  className="w-full flex gap-x-2"
                  variant="outline"
                >
                  <LinkIcon size={14} />
                  Editor
                </Button>
              </PopoverTrigger>
              <PopoverContent side="right" avoidCollisions className="p-0">
                <JavascriptEditor
                  defaultValue={data.text.value}
                  onChange={(value) => updateText(value ?? "")}
                />
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
