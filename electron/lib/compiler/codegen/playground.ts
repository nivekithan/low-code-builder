import path from "node:path";
import { BackendProject, NodeMeta } from "../parser/defination";
import { convertBackendProject } from "./codegen";

const EMPTY_META: NodeMeta = {
  id: "",
  position: {
    x: 0,
    y: 0,
  },
};

function main() {
  const backendProject: BackendProject = {
    name: "demo",
    routes: [
      {
        route: "__index",
        definition: {
          type: "apiRequest",
          data: { method: "GET" },
          meta: EMPTY_META,
          next: {
            type: "apiResponse",
            data: { text: "Hello from no code builder!" },
            meta: EMPTY_META,
            next: null,
          },
        },
      },
    ],
  };

  const project = convertBackendProject(backendProject);

  project.log();

  project.write(path.join(process.cwd(), "local", "playground"));
}

main();
