import { InlineEditableInput } from "@/components/ui/inlineEditable";
import { useNodesData, useReactFlow } from "@xyflow/react";
import { CustomNodes } from "common/types";
import { useState } from "react";

export function OutputVariableNameEditor({ nodeId }: { nodeId: string }) {
  const reactflow = useReactFlow();
  const nodesData = useNodesData<CustomNodes>(nodeId);
  const variableName = nodesData
    ? "outputVariableName" in nodesData.data
      ? nodesData.data.outputVariableName
      : null
    : null;

  const [localVariableName, setLocalVariableName] = useState(
    variableName || ""
  );

  if (!nodesData) {
    throw new Error(`Invalid nodeId: ${nodeId}`);
  }

  if (variableName === null) {
    throw new Error(`Node with id: ${nodeId} does not have outputVariableName`);
  }

  function onUpdateOutputVariableName(e: React.ChangeEvent<HTMLInputElement>) {
    setLocalVariableName(e.currentTarget.value);
    const newValue = e.currentTarget.value;
    if (!isValidJSVariableName(newValue)) {
      console.error(`Invalid variable name: ${newValue}`);
      return;
    }

    reactflow.updateNodeData(nodeId, { outputVariableName: newValue });
  }

  return (
    <InlineEditableInput
      value={localVariableName}
      onChange={onUpdateOutputVariableName}
    />
  );
}

function isValidJSVariableName(name: string) {
  return /^[a-zA-Z_][0-9a-zA-Z_]*$/.test(name);
}
