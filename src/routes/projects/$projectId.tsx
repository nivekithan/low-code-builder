import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/text";
import { CustomEdgeTypes, CustomNodeTypes } from "@/customNodes";
import { trpc } from "@/lib/trpc";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Controls,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
  ReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import type { ClientApiRoute, CustomEdges, CustomNodes } from "common/types";
import { useCallback, useEffect, useMemo, useState } from "react";
import debounce from "lodash.debounce";
import useAutoLayout from "@/features/editor/autolayout/useAutoLayout";

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

  const apiRouteToRender = project.apiRoutes[0];

  if (!apiRouteToRender) {
    return <div>No API route to render</div>;
  }

  return (
    <div className="flex">
      <SideBar />
      <div className="min-h-screen flex-1 flex flex-col">
        <NavigationBar name={project.name} />
        <div className="px-4 pb-4 flex-1">
          <Editor
            customNodes={apiRouteToRender.definition.customNodes}
            edges={apiRouteToRender.definition.edges}
          />
        </div>
      </div>
    </div>
  );
}

function Editor({
  customNodes: initialNodes,
  edges: initialEdges,
}: Omit<ClientApiRoute, "route">) {
  const { projectId } = Route.useParams();

  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  console.log({ nodes, edges });

  const { mutate: autosaveApi } = trpc.projects.autosaveApi.useMutation();

  const autosaveAfter300Ms = useMemo(() => {
    return debounce(
      ({
        customNodes,
        projectId,
        edges,
        route,
      }: {
        customNodes: CustomNodes[];
        edges: CustomEdges[];
        projectId: number;
        route: string;
      }) => {
        return autosaveApi({
          customNodes: customNodes,
          edges: edges,
          projectId: projectId,
          route: route,
        });
      }
    );
  }, [autosaveApi]);

  useEffect(() => {
    autosaveAfter300Ms({
      customNodes: nodes,
      edges: edges,
      projectId: parseInt(projectId),
      route: "__index",
    });
  }, [edges, nodes, projectId, autosaveAfter300Ms]);

  const onNodesChange: OnNodesChange<CustomNodes> = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange: OnEdgesChange<CustomEdges> = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect: OnConnect = useCallback(
    (params) =>
      setEdges((eds) => {
        const customEdge = { ...eds, type: "simple" as const };
        return addEdge(params, customEdge);
      }),
    []
  );

  useAutoLayout();

  return (
    <ReactFlow
      nodes={nodes}
      colorMode="dark"
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={CustomNodeTypes}
      edgeTypes={CustomEdgeTypes}
      fitView
    >
      <Background />
      <Controls />
    </ReactFlow>
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

function NavigationBar({ name }: { name: string }) {
  return (
    <div className="bg-background p-4 flex items-center justify-between">
      <Heading>{name}</Heading>
      <div className="flex gap-x-2">
        <Button type="button">Publish</Button>
      </div>
    </div>
  );
}
