import { AstExpression, CustomNodes } from "common/types";
import { Graph } from "../lexer/lexer";
import { BackendProject, NodesDef } from "./defination";
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

  const processedNodes = processNodes(connectedNodes[0], graph);

  const definition: BackendProject["routes"][number]["definition"] = {
    type: "apiRequest",
    data: {
      method: apiRequestNode.data.method,
      definedHeaders: apiRequestNode.data.definedHeaders,
      outputVariableName: apiRequestNode.data.outputVariableName,
    },
    meta: {
      id: apiRequestNode.id,
      position: apiRequestNode.position,
    },
    next: processedNodes,
  };

  return definition;
}

function processNodes(
  node: CustomNodes,
  graph: WeakMap<CustomNodes, CustomNodes[]>
): NodesDef {
  if (node.type === "apiRequest") {
    throw new Error(`API Request node cannot be processed`);
  }

  if (node.type === "ifAndElseCondition") {
    const connectedNodes = graph.get(node);

    if (!connectedNodes) {
      throw new Error("No connected nodes found");
    }

    if (connectedNodes.length !== 1) {
      throw new Error(
        `Invalid connected nodes found: ${connectedNodes.length}`
      );
    }

    const nextNode = connectedNodes[0];

    const processedNode = processNodes(nextNode, graph);

    return {
      type: "ifElseCondition",
      commonToBoth: processedNode,
      data: {
        condition: generateTsExpressionFromAstExpression(node.data.condition),
        outputVariableName: node.data.outputVariableName,
      },
      meta: {
        id: node.id,
        position: node.position,
      },
      onFalse: null,
      onTrue: null,
    };
  } else if (node.type === "apiResponse") {
    return {
      type: "apiResponse",
      data: { text: generateTsExpressionFromAstExpression(node.data.text) },
      meta: {
        id: node.id,
        position: node.position,
      },
      next: null,
    };
  } else {
    // @ts-expect-error We should handle all the cases and this else block should never be reached
    throw new Error(`Invalid node type: ${node.type}`);
  }
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
