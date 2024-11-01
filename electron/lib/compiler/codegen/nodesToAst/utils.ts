import ts from "typescript";
import { NodesDef } from "../../parser/defination";
import { generateApiResponseDef } from "./apiResponseNodeToAst";
import { generateIfElseConditionNodeToAst } from "./ifElseConditionNodeToAst";

export function generateStatementsFromNodesDef(
  nodesDef: NodesDef
): ts.Statement[] {
  switch (nodesDef.type) {
    case "apiRequest":
      throw new Error("Api Request cannout be converted to statements");
    case "apiResponse":
      return [generateApiResponseDef(nodesDef)];
    case "ifElseCondition":
      return generateIfElseConditionNodeToAst(nodesDef);
    default:
      // @ts-expect-error If we handle all cases then default block will
      // never run
      throw new Error(`${nodesDef.type} is not valid node type`);
  }
}
