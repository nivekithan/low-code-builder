import { trpcClient } from "@/lib/trpc";
import { useTypedLoaderData } from "@/lib/utils";
import { EmptyProjects } from "./emptyProjects";

export async function loader() {
  console.log("Loading...");
  const result = await trpcClient.projects.list.query();

  console.log(result);

  return { projects: result };
}

export default function Index() {
  const { projects } = useTypedLoaderData<typeof loader>();

  if (projects.length === 0) {
    return <EmptyProjects />;
  }

  return null;
}

export async function action() {
  return null;
}
