import ts, { factory } from "typescript";
import { ApiRequestNodeDef } from "../../parser/defination";
import { $constVariable, $importEverythingFromFile } from "../ast_utils";
import { HONO_CONTEXT_IDEN, ILIB_IDEN } from "../constants";
import { getUniqueRouteDefinationName } from "../routes";
import { generateStatementsFromNodesDef } from "./utils";
import { $callValidateHeaders } from "../ilib/callILib";

export function convertApiRequestDefinitionToAst(
  apiDefinition: ApiRequestNodeDef,
  route: string
) {
  const definitionName = getUniqueRouteDefinationName({
    method: apiDefinition.data.method,
    route,
  });

  const nextStatements = apiDefinition.next
    ? generateStatementsFromNodesDef(apiDefinition.next)
    : [];

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
        $handleErrorsInAPIRoutes([
          $generateOutputVariable(apiDefinition),
          ...nextStatements,
          // ),
        ]),
        true
      )
    ),
  ];

  return statements;
}

/**
 *
 * Source CODE AST
 *
 * ```ts
 * const request = { method: c.req.method, headers: ilib.validateHeaders(c, [""]) }
 * ```
 */
function $generateOutputVariable(nodeDef: ApiRequestNodeDef) {
  const varName = nodeDef.data.outputVariableName;

  const ast = $constVariable(
    varName,
    factory.createObjectLiteralExpression(
      [
        factory.createPropertyAssignment(
          factory.createIdentifier("method"),
          factory.createPropertyAccessExpression(
            factory.createPropertyAccessExpression(
              factory.createIdentifier(HONO_CONTEXT_IDEN),
              factory.createIdentifier("req")
            ),
            factory.createIdentifier("method")
          )
        ),
        factory.createPropertyAssignment(
          factory.createIdentifier("headers"),
          $callValidateHeaders(
            factory.createArrayLiteralExpression(
              nodeDef.data.definedHeaders.map((header) => {
                return factory.createStringLiteral(header.value);
              }),
              false
            )
          )
        ),
      ],
      false
    )
  );

  return ast;
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
