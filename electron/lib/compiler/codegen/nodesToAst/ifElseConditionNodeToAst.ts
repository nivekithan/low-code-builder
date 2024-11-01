import { IfElseConditionNodeDef } from "../../parser/defination";
import { $constVariable } from "../ast_utils";
import { generateStatementsFromNodesDef } from "./utils";

export function generateIfElseConditionNodeToAst(
  nodeDef: IfElseConditionNodeDef
) {
  const conditionStatement = $constVariable(
    nodeDef.data.outputVariableName,
    nodeDef.data.condition
  );

  const otherStatements = nodeDef.commonToBoth
    ? generateStatementsFromNodesDef(nodeDef.commonToBoth)
    : [];

  return [conditionStatement, ...otherStatements];
}
