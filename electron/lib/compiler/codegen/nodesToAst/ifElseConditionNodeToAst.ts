import { IfElseConditionNodeDef } from "../../parser/defination";
import { $constVariable, $ifElseCondition } from "../ast_utils";
import { generateStatementsFromNodesDef } from "./utils";

export function generateIfElseConditionNodeToAst(
  nodeDef: IfElseConditionNodeDef
) {
  const conditionStatement = $constVariable(
    nodeDef.data.outputVariableName,
    nodeDef.data.condition
  );

  const ifStatements = nodeDef.onTrue
    ? generateStatementsFromNodesDef(nodeDef.onTrue)
    : [];
  const elseStatements = nodeDef.onFalse
    ? generateStatementsFromNodesDef(nodeDef.onFalse)
    : [];

  const ifElseConditionBlock = $ifElseCondition(
    nodeDef.data.outputVariableName,
    ifStatements,
    elseStatements
  );

  return [conditionStatement, ifElseConditionBlock];
}
