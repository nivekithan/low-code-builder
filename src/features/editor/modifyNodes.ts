import { randomEdgeId } from "@/lib/utils";
import { useReactFlow, type Node, type Edge } from "@xyflow/react";
import type { CustomEdges, CustomNodes } from "common/types";
import { produce } from "immer";
import { useCallback, useMemo } from "react";

export function useModifyNodes() {
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

  const removeNodes = useCallback(
    (nodeId: string) => {
      const currentNode = getNode(nodeId);

      if (!currentNode) {
        throw new Error(`There is no node with id ${nodeId}`);
      }

      setEdges((edges) => {
        const newEdges = produce(edges, (draftEdges) => {
          const edgesWhoseTargetIsCurrent = draftEdges.filter(
            (edge) => edge.target === nodeId
          );

          if (edgesWhoseTargetIsCurrent.length > 1) {
            throw new Error(`There are multiple edges with target ${nodeId}`);
          }

          const edgesWhoseSourceIsCurrent = draftEdges.filter(
            (edge) => edge.source === nodeId
          );

          if (edgesWhoseSourceIsCurrent.length > 1) {
            throw new Error(`There are multiple edges with source ${nodeId}`);
          }

          const parentEdge = edgesWhoseTargetIsCurrent[0];
          const childEdge = edgesWhoseSourceIsCurrent[0];

          if (parentEdge && childEdge) {
            parentEdge.target = childEdge.target;
          }

          if (childEdge) {
            draftEdges.splice(draftEdges.indexOf(childEdge), 1);
          }

          if (parentEdge && !childEdge) {
            draftEdges.splice(draftEdges.indexOf(parentEdge), 1);
          }
        });

        return newEdges;
      });

      setNodes((nodes) => nodes.filter((node) => node.id !== nodeId));
    },
    [getNode, setEdges, setNodes]
  );

  const allModifiers = useMemo(
    () => ({ insertNodes, removeNodes }),
    [insertNodes, removeNodes]
  );

  return allModifiers;
}
