import { trpcClient } from "@/lib/trpc";
import { useTypedLoaderData } from "@/lib/utils";
import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { z } from "zod";

const ParamsSchema = z.object({ projectId: z.coerce.number() });

export async function loader({ params }: LoaderFunctionArgs) {
  const { projectId } = ParamsSchema.parse(params);

  const project = await trpcClient.projects.get.query({ projectId });

  if (!project) {
    throw redirect("/");
  }

  return project;
}

export default function ProjectIdPage() {
  const project = useTypedLoaderData<typeof loader>();

  return <pre>{JSON.stringify(project, null, 2)}</pre>;
}
