import { randomEdgeId } from "@/lib/utils";
import { useReactFlow, type Node, type Edge } from "@xyflow/react";
import type { CustomEdges, CustomNodes } from "common/types";
import { produce } from "immer";
import { useCallback } from "react";

export function useInsertNodes() {
  const { setNodes, setEdges, getNode } = useReactFlow<
    Node & CustomNodes,
    Edge & CustomEdges
  >();

  const insertNodes = useCallback(
    (parentBlockId: string, newNode: CustomNodes & Node) => {
      const parentNode = getNode(parentBlockId);

      if (!parentNode) {
        throw new Error(`There is no node with id ${parentBlockId}`);
      }

      setEdges((edges) => {
        const newEdges = produce(edges, (draftEdge) => {
          const edgesWhoseSourceIsParent = draftEdge.filter(
            (edge) => edge.source === parentBlockId
          );

          if (!edgesWhoseSourceIsParent.length) {
            throw new Error(`There is no edge with source ${parentBlockId}`);
          }

          if (edgesWhoseSourceIsParent.length > 1) {
            throw new Error(
              `There are multiple edges with source ${parentBlockId}`
            );
          }

          const edgeWhoseSourceIsParent = edgesWhoseSourceIsParent[0];

          const oldTarget = edgeWhoseSourceIsParent.target;

          edgeWhoseSourceIsParent.target = newNode.id;

          edges.push({
            id: randomEdgeId(),
            source: newNode.id,
            target: oldTarget,
            type: "simple",
          });
        });

        return newEdges;
      });

      setNodes((nodes) => nodes.concat([newNode]));
    },
    [getNode, setEdges, setNodes]
  );

  return insertNodes;
}
