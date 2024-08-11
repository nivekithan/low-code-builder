import { EmptyProjects } from "../components/projects/emptyProjects";
import { ProjectList } from "../components/projects/projectList";
import { trpc } from "@/lib/trpc";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [projects] = trpc.projects.list.useSuspenseQuery();

  if (projects.length === 0) {
    return <EmptyProjects />;
  }

  return (
    <div className="p-4">
      <ProjectList projectLists={projects} />
    </div>
  );
}
