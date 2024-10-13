import { outputFile } from "fs-extra";
import path from "node:path";
import posixPath from "node:path/posix";
import { BackendProject } from "../parser/defination";
import ts, { factory } from "typescript";
import {
  convertApiRequestDefinitionToAst,
  getUniqueRouteDefinationName,
} from "./processNodeDefinition";
import { API_ROUTES_DIR } from "./constants";
import TOML from "smol-toml";
import { ClientApiRequestMethod } from "common/types";
import iLibSourceCode from "./ilib/lib.ts.txt?raw";

export class CodeFile {
  #sourceCode: string;
  #path: string;

  constructor({ path, sourceCode }: { sourceCode: string; path: string }) {
    this.#sourceCode = sourceCode;
    this.#path = path;
  }

  async write(cwd: string) {
    const filePath = path.resolve(cwd, this.#path);

    await outputFile(filePath, this.#sourceCode);
  }

  log() {
    console.group(this.#path);

    console.log(this.#sourceCode);

    console.groupEnd();
  }
}

export class CodeGenProject {
  #files: CodeFile[];

  constructor(files: CodeFile[]) {
    this.#files = files;
  }

  async write(cwd: string) {
    await Promise.all(this.#files.map((codeFile) => codeFile.write(cwd)));
  }

  async addFile(codeFile: CodeFile) {
    this.#files.push(codeFile);
  }

  log() {
    for (const file of this.#files) {
      file.log();
    }
  }
}

export function convertBackendProject(backendProject: BackendProject) {
  const allRoutesWithMethods: {
    route: string;
    method: ClientApiRequestMethod;
  }[] = [];
  const project = new CodeGenProject([]);

  for (const apiRoutes of backendProject.routes) {
    const apiMethod = apiRoutes.definition.data.method;
    const routePath = apiRoutes.route;

    allRoutesWithMethods.push({ method: apiMethod, route: routePath });

    const routeStatements = convertApiRequestDefinitionToAst(
      apiRoutes.definition,
      routePath
    );

    const sourceFile = generateSourceFile(routeStatements);
    const codeFile = generateCodeFile(sourceFile, routePath);

    project.addFile(codeFile);
  }

  const apiRegisterFile = generateApiRouterRegisterFile(allRoutesWithMethods);
  project.addFile(apiRegisterFile);

  const packageJsonFile = generatePackageJson({
    name: backendProject.name,
    dependencies: {
      hono: "4.5.3",
    },
    devDependencies: {
      "@cloudflare/workers-types": "4.20240529.0",
      wrangler: "3.57.2",
    },
    scripts: {
      dev: "wrangler dev index.js",
      deploy: "wrangler deploy --minify index.js",
    },
  });
  project.addFile(packageJsonFile);

  const wranglerTomlFile = generateWranglerTomlFile({
    compatibility_date: "2024-05-24",
    name: backendProject.name,
  });

  project.addFile(wranglerTomlFile);

  const ilibFile = generateILibFile();

  project.addFile(ilibFile);

  return project;
}

type WranglerTomlInputs = {
  name: string;
  compatibility_date: string;
};

function generateWranglerTomlFile(inputs: WranglerTomlInputs) {
  const sourceCode = TOML.stringify(inputs);

  return new CodeFile({
    path: "wrangler.toml",
    sourceCode,
  });
}

type PackageJsonInputs = {
  name: string;
  scripts: {
    dev: string;
    deploy: string;
  };
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
};

function generateILibFile() {
  return new CodeFile({ path: "ilib.ts", sourceCode: iLibSourceCode });
}

function generatePackageJson(inputs: PackageJsonInputs) {
  const sourceCode = JSON.stringify(inputs, null, 2);

  return new CodeFile({
    path: "package.json",
    sourceCode: sourceCode,
  });
}

function generateApiRouterRegisterFile(
  routes: { route: string; method: ClientApiRequestMethod }[]
) {
  const importDeclartionStatements: ts.Statement[] = [
    // Import hono
    factory.createImportDeclaration(
      undefined,
      factory.createImportClause(
        false,
        undefined,
        factory.createNamedImports([
          factory.createImportSpecifier(
            false,
            undefined,
            factory.createIdentifier("Hono")
          ),
        ])
      ),
      factory.createStringLiteral("hono"),
      undefined
    ),
  ];

  const routesRegisterStatements: ts.Statement[] = [
    factory.createVariableStatement(
      undefined,
      factory.createVariableDeclarationList(
        [
          factory.createVariableDeclaration(
            factory.createIdentifier("app"),
            undefined,
            undefined,
            factory.createNewExpression(
              factory.createIdentifier("Hono"),
              undefined,
              []
            )
          ),
        ],
        ts.NodeFlags.Const
      )
    ),
  ];

  for (const route of routes) {
    const routeDefinitionName = getUniqueRouteDefinationName({
      method: route.method,
      route: route.route,
    });

    importDeclartionStatements.push(
      factory.createImportDeclaration(
        undefined,
        factory.createImportClause(
          false,
          undefined,
          factory.createNamedImports([
            factory.createImportSpecifier(
              false,
              undefined,
              factory.createIdentifier(routeDefinitionName)
            ),
          ])
        ),
        factory.createStringLiteral(
          getModuleSpecifierPathForRoute(route.route)
        ),
        undefined
      )
    );

    routesRegisterStatements.push(
      factory.createExpressionStatement(
        factory.createCallExpression(
          factory.createPropertyAccessExpression(
            factory.createIdentifier("app"),
            factory.createIdentifier(route.method.toLocaleLowerCase())
          ),
          undefined,
          [
            factory.createStringLiteral(
              convertApiRouteToHonoRoute(route.route)
            ),
            factory.createIdentifier(routeDefinitionName),
          ]
        )
      )
    );
  }

  const combinedStatements = importDeclartionStatements
    .concat(routesRegisterStatements)
    .concat([
      factory.createExportAssignment(
        undefined,
        undefined,
        factory.createIdentifier("app")
      ),
    ]);

  const sourceFile = generateSourceFile(combinedStatements);

  const soureCode = getSourceCode(sourceFile);

  return new CodeFile({
    path: "index.js",
    sourceCode: soureCode,
  });
}

function generateCodeFile(sourceFile: ts.SourceFile, route: string) {
  const outputCode = getSourceCode(sourceFile);
  return new CodeFile({
    path: getFilePathForRoute(route),
    sourceCode: outputCode,
  });
}

function getSourceCode(sourceFile: ts.SourceFile) {
  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });

  const outputCode = printer.printFile(sourceFile);

  return outputCode;
}

function getModuleSpecifierPathForRoute(route: string) {
  const joinedPath = posixPath.join(API_ROUTES_DIR, `${route}`);

  return `./${joinedPath}`;
}

function getFilePathForRoute(route: string) {
  return path.join(API_ROUTES_DIR, `${route}.js`);
}

function convertApiRouteToHonoRoute(route: string) {
  if (route === "__index") {
    return "/";
  }

  throw new Error(`Route ${route} is not supported to convert to hono route`);
}

function generateSourceFile(statements: ts.Statement[]) {
  return factory.createSourceFile(
    statements,
    factory.createToken(ts.SyntaxKind.EndOfFileToken),
    ts.NodeFlags.JavaScriptFile
  );
}
