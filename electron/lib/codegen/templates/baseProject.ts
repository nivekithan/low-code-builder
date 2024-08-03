import ts, { NodeFlags } from "typescript";
import { CodeFile, CodeGenProject } from "../codegen";
import TOML from "smol-toml";

export function generateBaseProject(name: string) {
  const packageJson = createPackageJsonFile(name);
  const wranglerToml = createWranglerTomlFile(name);

  const baseProject = new CodeGenProject([packageJson, wranglerToml]);

  baseProject.log();

  return baseProject;
}
/**
 * This function generates ast for this code
 *
 * ```ts
 * import {Hono} from "hono";
 * import rootHandler from "./routes/root"
 *
 * const app = new Hono();
 *
 * app.get("/", rootHandler)
 *
 * export default app
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function createIndexJsFile() {
  const root = ts.factory.createSourceFile(
    [
      ts.factory.createImportDeclaration(
        undefined,
        ts.factory.createImportClause(
          false,
          undefined,
          ts.factory.createNamedImports([
            ts.factory.createImportSpecifier(
              false,
              undefined,
              ts.factory.createIdentifier("Hono")
            ),
          ])
        ),
        ts.factory.createStringLiteral("hono")
      ),

      ts.factory.createImportDeclaration(
        undefined,
        ts.factory.createImportClause(
          false,
          undefined,
          ts.factory.createNamedImports([
            ts.factory.createImportSpecifier(
              false,
              undefined,
              ts.factory.createIdentifier("GET_ROOT_HANDLER")
            ),
          ])
        ),
        ts.factory.createStringLiteral("./routes/root")
      ),

      ts.factory.createVariableStatement(
        undefined,
        ts.factory.createVariableDeclarationList([
          ts.factory.createVariableDeclaration(
            ts.factory.createIdentifier("app"),
            undefined,
            undefined,
            ts.factory.createNewExpression(
              ts.factory.createIdentifier("Hono"),
              undefined,
              []
            )
          ),
        ])
      ),

      ts.factory.createExpressionStatement(
        ts.factory.createCallExpression(
          ts.factory.createPropertyAccessExpression(
            ts.factory.createIdentifier("app"),
            ts.factory.createIdentifier("get")
          ),
          undefined,
          [
            ts.factory.createStringLiteral("/"),
            ts.factory.createIdentifier("GET_ROOT_HANDLER"),
          ]
        )
      ),

      ts.factory.createExportAssignment(
        undefined,
        undefined,
        ts.factory.createIdentifier("app")
      ),
    ],
    ts.factory.createToken(ts.SyntaxKind.EndOfFileToken),
    NodeFlags.JavaScriptFile
  );

  const nodeArray = ts.factory.createNodeArray([root]);

  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });

  const sourceFile = ts.createSourceFile(
    "index.js",
    "",
    ts.ScriptTarget.ESNext,
    true,
    ts.ScriptKind.JS
  );

  const outputCode = printer.printList(
    ts.ListFormat.MultiLine,
    nodeArray,
    sourceFile
  );

  const codeFile = new CodeFile({ path: "index.js", sourceCode: outputCode });

  return codeFile;
}

/**
 *
 */
export function createRootHandlerFile() {
  const root = ts.factory.createSourceFile(
    [
      ts.factory.createFunctionDeclaration(
        [
          ts.factory.createToken(ts.SyntaxKind.ExportKeyword),
          ts.factory.createToken(ts.SyntaxKind.AsyncKeyword),
        ],
        undefined,
        ts.factory.createIdentifier("GET_ROOT_HANDLER"),
        undefined,
        [
          ts.factory.createParameterDeclaration(
            undefined,
            undefined,
            ts.factory.createIdentifier("c")
          ),
        ],
        undefined,
        ts.factory.createBlock([
          ts.factory.createReturnStatement(
            ts.factory.createCallExpression(
              ts.factory.createPropertyAccessExpression(
                ts.factory.createIdentifier("c"),
                ts.factory.createIdentifier("text")
              ),
              undefined,
              [ts.factory.createStringLiteral("Hello World!")]
            )
          ),
        ])
      ),
    ],
    ts.factory.createToken(ts.SyntaxKind.EndOfFileToken),
    NodeFlags.JavaScriptFile
  );

  const nodeArray = ts.factory.createNodeArray([root]);

  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });

  const sourceFile = ts.createSourceFile(
    "root.js",
    "",
    ts.ScriptTarget.ESNext,
    true,
    ts.ScriptKind.JS
  );

  const outputCode = printer.printList(
    ts.ListFormat.MultiLine,
    nodeArray,
    sourceFile
  );

  const rootHandler = new CodeFile({
    path: "./routes/root.js",
    sourceCode: outputCode,
  });

  return rootHandler;
}

function createPackageJsonFile(name: string) {
  const sourceCode = JSON.stringify(
    {
      name: name,
      scripts: {
        dev: "wrangler dev src/index.ts",
        deploy: "wrangler deploy --minify src/index.js",
      },
      dependencies: {
        hono: "4.5.3",
      },
      devDependencies: {
        wrangler: "3.57.2",
      },
    },
    null,
    2
  );

  const codeFile = new CodeFile({
    path: "package.json",
    sourceCode: sourceCode,
  });

  return codeFile;
}

function createWranglerTomlFile(name: string) {
  const sourceCode = TOML.stringify({
    name: name,
    compatibility_date: "2024-08-02",
  });

  const codeFile = new CodeFile({
    path: "wrangler.toml",
    sourceCode: sourceCode,
  });

  return codeFile;
}
