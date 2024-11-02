import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  FixedCard,
} from "@/components/ui/card";
import { Handle, NodeProps, Position, useReactFlow } from "@xyflow/react";
import type { GetNodeComponent } from "common/types";
import { BadgeName } from "../components/badgeName";
import { OutputVariableNameEditor } from "../components/outputVariableNameEditor";
import { Field, Fieldset } from "@/components/ui/fieldset";
import { JavascriptEditorInput } from "../components/JavascriptEditor";
import { Label } from "@/components/ui/label";
import { AddChildrenNodes } from "../components/addChildrenNodes";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import { useModifyNodes } from "@/features/editor/modifyNodes";

type IfAndElseConditionNode = GetNodeComponent<"ifAndElseCondition">;

export function IfAndElseConditionNode({
  data,
  id,
}: NodeProps<IfAndElseConditionNode>) {
  const reactflow = useReactFlow();

  function updateCondition(data: Partial<IfAndElseConditionNode["data"]>) {
    reactflow.updateNodeData(id, data);
  }

  const { removeNodes } = useModifyNodes();

  return (
    <>
      <div className="relative">
        <FixedCard>
          <Handle type="target" position={Position.Top} />
          <CardHeader>
            <div className="flex justify-between items-center">
              <BadgeName>If/Else Condition</BadgeName>
              <Button
                variant="outline"
                size="xl"
                type="button"
                className="rounded-full size-7"
                onClick={() => removeNodes(id)}
              >
                <XIcon className="w-3 h-3" />
              </Button>
            </div>
            <CardTitle>
              <OutputVariableNameEditor nodeId={id} />
            </CardTitle>
            <CardDescription>Run code based on a condition</CardDescription>
          </CardHeader>
          <CardContent>
            <Fieldset>
              <Field>
                <Label>Condition:</Label>
                <JavascriptEditorInput
                  defaultValue={data.condition.value}
                  onChange={(newValue) =>
                    updateCondition({
                      condition: {
                        type: "astExpression",
                        value: newValue ?? "",
                      },
                    })
                  }
                />
              </Field>
            </Fieldset>
          </CardContent>
          <Handle type="source" position={Position.Bottom} />
        </FixedCard>
        <AddChildrenNodes nodeId={id} />
      </div>
    </>
  );
}
