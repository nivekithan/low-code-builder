import { AstExpression } from "common/types";
import { Graph } from "../lexer/lexer";
import { BackendProject } from "./defination";
import ts from "typescript";
import { cloneNode } from "ts-clone-node";

export function parseGraph({ apiRequestNode, graph }: Graph) {
  const connectedNodes = graph.get(apiRequestNode);

  if (!connectedNodes || connectedNodes.length === 0) {
    throw new Error("No connected nodes found");
  }

  if (connectedNodes.length > 1) {
    throw new Error("Multiple connected nodes found");
  }

  const firstNode = connectedNodes[0];

  if (firstNode.type !== "apiResponse") {
    throw new Error("First connected node is not an API response node");
  }

  const definition: BackendProject["routes"][number]["definition"] = {
    type: "apiRequest",
    data: {
      method: apiRequestNode.data.method,
      definedHeaders: apiRequestNode.data.definedHeaders,
    },
    meta: {
      id: apiRequestNode.id,
      position: apiRequestNode.position,
    },
    next: {
      type: "apiResponse",
      data: {
        text: generateTsExpressionFromAstExpression(firstNode.data.text),
      },
      meta: {
        id: firstNode.id,
        position: firstNode.position,
      },
      next: null,
    },
  };

  return definition;
}

function generateTsExpressionFromAstExpression(astExpression: AstExpression) {
  const jsLiteral = astExpression.value;

  const file = ts.createSourceFile(
    "demo.js",
    jsLiteral,
    ts.ScriptTarget.ESNext,
    true,
    ts.ScriptKind.JS
  );

  if (file.statements.length !== 1) {
    throw new Error(
      "Invalid expression. JS Literal should contain only one statement"
    );
  }

  const statement = file.statements[0];

  const isExpressionStatement = ts.isExpressionStatement(statement);

  if (!isExpressionStatement) {
    throw new Error("Invalid expression. JS Literal should be an expression");
  }

  const expression = cloneNode(statement.expression);

  return expression;
}
