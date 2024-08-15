import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/text";
import { CustomNodes } from "@/customNodes";
import { trpc } from "@/lib/trpc";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Controls,
  Edge,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
  ReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useState } from "react";

export const Route = createFileRoute("/projects/$projectId")({
  component: Component,
});

function Component() {
  const { projectId } = Route.useParams();
  const [project] = trpc.projects.get.useSuspenseQuery({
    projectId: parseInt(projectId),
  });

  const navigate = useNavigate();

  if (!project) {
    throw navigate({ to: "/" });
  }

  return (
    <div className="flex">
      <SideBar />
      <Editor />
    </div>
  );
}

const initialNodes: CustomNodes[] = [
  {
    id: "1", // required
    type: "apiRequest",
    position: { x: 0, y: 0 }, // required
    data: {
      method: "GET",
    },
  },
];

const initialEdges: Edge[] = [
  { id: "1-2", source: "1", target: "2", label: "to the", type: "step" },
];

function Editor() {
  const [nodes, setNodes] = useState(initialNodes);

  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange: OnNodesChange<CustomNodes> = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange: OnEdgesChange<Edge> = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect: OnConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  return (
    <div className="flex-1 p-4 min-h-screen">
      <ReactFlow
        nodes={nodes}
        colorMode="dark"
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={CustomNodes}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

function SideBar() {
  return (
    <div className="p-4 border-r h-screen min-w-[220px] flex flex-col gap-y-4">
      <div>
        <Heading className="text-xl">API Routes</Heading>
      </div>
      <div>
        <Button asChild variant="secondary">
          <Link className="text-lg">index</Link>
        </Button>
      </div>
    </div>
  );
}
