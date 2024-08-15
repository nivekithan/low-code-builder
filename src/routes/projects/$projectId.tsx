import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/text";
import { trpc } from "@/lib/trpc";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Background, Controls, ReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useMemo } from "react";
import useResizeObserver from "use-resize-observer";

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

const DEFAULT_PADDING = 20;
function getDefaultNodes(width: number) {
  return [
    {
      id: "1", // required
      position: { x: width / 2, y: DEFAULT_PADDING }, // required
      data: { label: "Hello" }, // required
    },
  ];
}

function Editor() {
  const { height, width, ref: editorRef } = useResizeObserver<HTMLDivElement>();

  const nodes = useMemo(() => {
    if (!height || !width) return [];

    return getDefaultNodes(width);
  }, [height, width]);

  console.log({ height, width });

  return (
    <div className="flex-1 p-4 min-h-screen">
      <ReactFlow nodes={nodes} colorMode="dark" ref={editorRef}>
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
