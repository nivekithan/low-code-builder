import ts, { factory } from "typescript";
import { ApiRequestNodeDef } from "../../parser/defination";
import { $importEverythingFromFile } from "../ast_utils";
import { HONO_CONTEXT_IDEN, ILIB_IDEN } from "../constants";
import { getUniqueRouteDefinationName } from "../routes";
import { generateStatementsFromNodesDef } from "./utils";

export function convertApiRequestDefinitionToAst(
  apiDefinition: ApiRequestNodeDef,
  route: string
) {
  const definitionName = getUniqueRouteDefinationName({
    method: apiDefinition.data.method,
    route,
  });

  const statements = [
    $importEverythingFromFile({
      filePath: `../${ILIB_IDEN}`,
      importIdentifier: ILIB_IDEN,
    }),
    factory.createFunctionDeclaration(
      [
        factory.createToken(ts.SyntaxKind.ExportKeyword),
        factory.createToken(ts.SyntaxKind.AsyncKeyword),
      ],
      undefined,
      factory.createIdentifier(definitionName),
      undefined,
      [
        factory.createParameterDeclaration(
          undefined,
          undefined,
          factory.createIdentifier(HONO_CONTEXT_IDEN),
          undefined,
          undefined,
          undefined
        ),
      ],
      undefined,
      factory.createBlock(
        $handleErrorsInAPIRoutes(
          apiDefinition.next
            ? generateStatementsFromNodesDef(apiDefinition.next)
            : []
        ),
        true
      )
    ),
  ];

  return statements;
}

/**
 *
 * Source code for AST:
 *
 * ```ts
 * try {
 *
 * } catch (err) {
 *  if (err instanceof Response) {
 *     return err;
 *  }
 *  throw err;
 * }
 */
function $handleErrorsInAPIRoutes(statementsInsideTryBlock: ts.Statement[]) {
  const ast = [
    factory.createTryStatement(
      factory.createBlock(statementsInsideTryBlock, true),
      factory.createCatchClause(
        factory.createVariableDeclaration(
          factory.createIdentifier("err"),
          undefined,
          undefined,
          undefined
        ),
        factory.createBlock(
          [
            factory.createIfStatement(
              factory.createBinaryExpression(
                factory.createIdentifier("err"),
                factory.createToken(ts.SyntaxKind.InstanceOfKeyword),
                factory.createIdentifier("Response")
              ),
              factory.createBlock(
                [
                  factory.createReturnStatement(
                    factory.createIdentifier("err")
                  ),
                ],
                true
              ),
              undefined
            ),
            factory.createThrowStatement(factory.createIdentifier("err")),
          ],
          true
        )
      ),
      undefined
    ),
  ];

  return ast;
}
