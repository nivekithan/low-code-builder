import { trpcClient } from "@/lib/trpc";
import { useTypedLoaderData } from "@/lib/utils";

export async function loader() {
  console.log("Loading...");
  const result = await trpcClient.projects.list.query();

  console.log(result);

  return { projects: result };
}

export default function Index() {
  const { projects } = useTypedLoaderData<typeof loader>();

  return <pre>{JSON.stringify(projects, null, 2)}</pre>;
}

export async function action() {
  return null;
}
