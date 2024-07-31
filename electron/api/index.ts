import { projectsRouter } from "./projects";
import { router } from "./trpc";

export const ApiRouter = router({
  projects: projectsRouter,
});

export type ClientApiRouter = typeof ApiRouter;
