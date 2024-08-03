import { trpcClient } from "@/lib/trpc";
import { useTypedLoaderData } from "@/lib/utils";
import { EmptyProjects } from "./emptyProjects";
import { ActionFunctionArgs, redirect } from "react-router-dom";
import { parseWithZod } from "@conform-to/zod";
import { z } from "zod";
import { FORM_ACTIONS } from "./constant";

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

const CreateProjectSchema = z.object({
  action: z.literal(FORM_ACTIONS.CREATE_NEW_PROJECT),
  name: z.string(),
  directory: z.string(),
});

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const submission = parseWithZod(formData, { schema: CreateProjectSchema });

  if (submission.status !== "success") {
    throw new Error("Unimplemented error handling");
  }

  const data = submission.value;

  switch (data.action) {
    case FORM_ACTIONS.CREATE_NEW_PROJECT: {
      const result = await trpcClient.projects.create.mutate({
        name: data.name,
        path: data.directory,
      });

      return redirect(`/projects/${result.id}`);
    }
  }
  return null;
}
