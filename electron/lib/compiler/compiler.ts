import { ClientProject } from "common/types";
import { tokeniseNodesAndEdges } from "./lexer/lexer";
import { parseGraph } from "./parser/parser";
import { BackendProject } from "./parser/defination";
import { convertBackendProject } from "./codegen/codegen";

export async function compileApiRoute(project: ClientProject) {
  try {
    const apiRouteDefinition = project.apiRoutes.map((apiRoute) => {
      const graph = tokeniseNodesAndEdges(apiRoute.customNodes, apiRoute.edges);

      const nodeDef = parseGraph(graph);

      return { definition: nodeDef, route: apiRoute.route };
    });

    const backendProject: BackendProject = {
      name: project.name,
      routes: apiRouteDefinition,
    };

    const codeProject = convertBackendProject(backendProject);

    return codeProject;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
