import { z } from "zod";
import { procedure, router } from "./trpc";
import {
  createProject,
  getProject,
  listProjects,
} from "../lib/models/projects";
import { ClientApiRoute, CustomNodes } from "common/types";
import { Edge } from "@xyflow/react";
import { compileApiRoute } from "!/lib/compiler/compiler";
import { getAllApi, saveApi } from "!/lib/models/api";

export const projectsRouter = router({
  create: procedure
    .input(z.object({ name: z.string(), path: z.string() }))
    .mutation(async (opts) => {
      const { path, name } = opts.input;

      const baseApiRoute = generateBaseProject();

      const codeProject = await compileApiRoute({
        apiRoutes: [baseApiRoute],
        name: name,
      });

      await codeProject.write(path);

      const createdProject = await createProject({ name, path });

      await saveApi({ apiRoute: baseApiRoute, projectId: createdProject.id });

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

      const [project, apiRoutes] = await Promise.all([
        getProject(projectId),
        getAllApi(projectId),
      ]);

      if (!project) {
        return null;
      }

      return { ...project, apiRoutes };
    }),
});

function generateBaseProject(): ClientApiRoute {
  return {
    customNodes: initialNodes,
    edges: initialEdges,
    route: "__index",
  };
}

const initialNodes: CustomNodes[] = [
  {
    id: "1", // required
    type: "apiRequest",
    position: { x: 0, y: 0 }, // required
    data: {
      method: "GET",
    },
  },
  {
    id: "2",
    type: "apiResponse",
    position: { x: 0, y: 450 },
    data: { text: "Hello World!" },
  },
];

const initialEdges: Edge[] = [
  { id: "1-2", source: "1", target: "2", type: "default" },
];
