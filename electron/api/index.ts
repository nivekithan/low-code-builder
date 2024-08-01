import { directoryRouter } from "./directory";
import { projectsRouter } from "./projects";
import { router } from "./trpc";

export const ApiRouter = router({
  projects: projectsRouter,
  _directory: directoryRouter,
});

export type ClientApiRouter = typeof ApiRouter;
