import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Edge, ReactFlowState, useNodeId, useStoreApi } from "@xyflow/react";
import type { CustomNodes } from "common/types";
import { Variable as VariableIcon } from "lucide-react";
import { useMemo, useState } from "react";

export function Variables() {
  const [isOpen, setIsOpen] = useState(false);
  const nodeId = useNodeId();
  const storeApi = useStoreApi<CustomNodes, Edge>().getState();

  if (!nodeId) {
    throw new Error(`use Variables inside a customNode`);
  }

  const variables = useMemo(() => {
    return getAvaliableVariables({
      nodeId: nodeId,
      state: storeApi,
    });
  }, [nodeId, storeApi]);

  return (
    <div>
      <Popover open={isOpen} onOpenChange={(newState) => setIsOpen(newState)}>
        <PopoverTrigger>
          <Button type="button" size="icon" variant="outline">
            <VariableIcon className="size-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <SelectVariable variables={variables} />
        </PopoverContent>
      </Popover>
    </div>
  );
}

function SelectVariable({
  variables,
}: {
  variables: { id: string; type: string; data: unknown }[] | null;
}) {
  if (variables === null) {
    return null;
  }

  return <pre>{JSON.stringify(variables, null, 2)}</pre>;
}

export function getAvaliableVariables({
  nodeId,
  state,
}: {
  nodeId: string;
  state: ReactFlowState<CustomNodes, Edge>;
}) {
  const allSourceNodeIds = getAllSourceNodes({ nodeId, state });

  const sourceNodeData = allSourceNodeIds.map((nodeId) => {
    const node = state.nodeLookup.get(nodeId);

    if (!node) {
      throw new Error(`Node with id ${nodeId} not found`);
    }

    const nodeData = node.data;

    return { data: nodeData, type: node.type, id: nodeId };
  });

  console.log({ sourceNodeData });

  return sourceNodeData;
}

function getAllSourceNodes({
  nodeId,
  state,
}: {
  nodeId: string;
  state: ReactFlowState<CustomNodes, Edge>;
}): string[] {
  console.log({ nodeId });
  const sourceNode = getSourceNode({ nodeId, state });

  if (sourceNode === null) {
    return [];
  }

  const subSourceNodes = getAllSourceNodes({
    nodeId: sourceNode,
    state: state,
  });

  subSourceNodes.push(sourceNode);

  return subSourceNodes;
}

function getSourceNode({
  nodeId,
  state,
}: {
  nodeId: string;
  state: ReactFlowState<CustomNodes, Edge>;
}) {
  const connectionsMap = state.connectionLookup.get(`${nodeId}-target-${null}`);

  const connections = Array.from(connectionsMap?.values() ?? []);

  if (connections.length === 0) {
    return null;
  }

  if (connections.length > 1) {
    throw new Error("Multiple connections are not yet supported");
  }

  const sourceNodeId = connections[0].source;

  return sourceNodeId;
}
