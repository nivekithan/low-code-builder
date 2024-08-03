import { z } from "zod";
import { procedure, router } from "./trpc";
import {
  createProject,
  getProject,
  listProjects,
} from "../lib/models/projects";
import { generateBaseProject } from "!/lib/codegen/templates/baseProject";

export const projectsRouter = router({
  create: procedure
    .input(z.object({ name: z.string(), path: z.string() }))
    .mutation(async (opts) => {
      const { path, name } = opts.input;

      const baseProject = generateBaseProject(name);

      await baseProject.write(path);
      const createdProject = await createProject({ name, path });

      return createdProject;
    }),

  list: procedure.query(async () => {
    const projects = await listProjects();

    return projects;
  }),

  get: procedure
    .input(z.object({ projectId: z.number() }))
    .query(async (opts) => {
      const { projectId } = opts.input;

      const project = await getProject(projectId);

      return project;
    }),
});
