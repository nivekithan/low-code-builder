import {
  useNodesInitialized,
  useReactFlow,
  useStore,
  Position,
  ReactFlowState,
} from "@xyflow/react";
import { useEffect } from "react";
import { Direction } from "./algorithms";
import { elkLayoutAlgorithm } from "./algorithms/elk";

const nodeCountSelector = (state: ReactFlowState) => state.nodeLookup.size;

function useAutoLayout() {
  const { setNodes, setEdges, getNodes, getEdges } = useReactFlow();
  const nodesInitialized = useNodesInitialized();
  // Here we are storing a map of the nodes and edges in the flow. By using a
  // custom equality function as the second argument to `useStore`, we can make
  // sure the layout algorithm only runs when something has changed that should
  // actually trigger a layout change.

  const nodeCount = useStore(nodeCountSelector);

  useEffect(() => {
    // Only run the layout if there are nodes and they have been initialized with
    // their dimensions
    if (!nodesInitialized || nodeCount === 0) {
      return;
    }

    // The callback passed to `useEffect` cannot be `async` itself, so instead we
    // create an async function here and call it immediately afterwards.
    const runLayout = async () => {
      // Pass in a clone of the nodes and edges so that we don't mutate the
      // original elements.
      const nodes = getNodes().map((node) => ({ ...node }));
      const edges = getEdges().map((edge) => ({ ...edge }));

      const { nodes: nextNodes, edges: nextEdges } = await elkLayoutAlgorithm(
        nodes,
        edges
      );

      for (const node of nextNodes) {
        node.style = { ...node.style, opacity: 1 };
        node.sourcePosition = getSourceHandlePosition("TB");
        node.targetPosition = getTargetHandlePosition("TB");
      }

      for (const edge of edges) {
        edge.style = { ...edge.style, opacity: 1 };
      }

      setNodes(nextNodes);
      setEdges(nextEdges);
    };

    runLayout();
  }, [nodesInitialized, nodeCount, setNodes, setEdges, getNodes, getEdges]);
}

export default useAutoLayout;

export function getSourceHandlePosition(direction: Direction) {
  switch (direction) {
    case "TB":
      return Position.Bottom;
    case "BT":
      return Position.Top;
    case "LR":
      return Position.Right;
    case "RL":
      return Position.Left;
  }
}

export function getTargetHandlePosition(direction: Direction) {
  switch (direction) {
    case "TB":
      return Position.Top;
    case "BT":
      return Position.Bottom;
    case "LR":
      return Position.Left;
    case "RL":
      return Position.Right;
  }
}
