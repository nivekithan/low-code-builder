import ts, { factory } from "typescript";
import {
  ApiRequestMethod,
  ApiRequestNodeDef,
  ApiResponseNodeDef,
  NodesDef,
} from "../../nodes/defination";
import { HONO_CONTEXT_IDEN } from "./constants";

export function generateStatementsFromNodesDef(nodesDef: NodesDef) {
  switch (nodesDef.type) {
    case "apiRequest":
      throw new Error("Api Request cannout be converted to statements");
    case "apiResponse":
      return [generateApiResponseDef(nodesDef)];
    default:
      // @ts-expect-error If we handle all cases then default block will
      // never run
      throw new Error(`${nodesDef.type} is not valid node type`);
  }
}

function generateApiResponseDef(nodeDef: ApiResponseNodeDef) {
  return factory.createReturnStatement(
    factory.createCallExpression(
      factory.createPropertyAccessExpression(
        factory.createIdentifier(HONO_CONTEXT_IDEN),
        factory.createIdentifier("text")
      ),
      undefined,
      [factory.createStringLiteral(nodeDef.data.text)]
    )
  );
}

export function convertApiRequestDefinitionToAst(
  apiDefinition: ApiRequestNodeDef,
  route: string
) {
  const definitionName = getUniqueRouteDefinationName({
    method: apiDefinition.data.method,
    route,
  });

  const statements = [
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
        apiDefinition.next
          ? generateStatementsFromNodesDef(apiDefinition.next)
          : [],
        true
      )
    ),
  ];

  return statements;
}

export function getUniqueRouteDefinationName({
  method,
  route,
}: {
  route: string;
  method: ApiRequestMethod;
}) {
  return `${method}_${route.toLocaleUpperCase()}`;
}
