import { z } from "zod";
import { procedure, router } from "./trpc";

export const projectsRouter = router({
  list: procedure.input(z.object({ name: z.string() })).query(() => {
    console.log("Running list projects");
    return {
      data: "No projects",
    };
  }),
});
