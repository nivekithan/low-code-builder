import {
  AstExpression,
  ClientApiRequestNode,
  ClientApiResponseNode,
  CLientIfElseConditionNode,
  NodePosition,
} from "common/types";
import ts from "typescript";

type ConvertAstExpressionToAst<T> = {
  [K in keyof T]: T[K] extends AstExpression ? ts.Expression : T[K];
};

export type NodeMeta = {
  position: NodePosition;
  id: string;
};

export type ApiRequestNodeDef = {
  type: "apiRequest";
  data: ClientApiRequestNode["data"];
  meta: NodeMeta;
  next: NodesDef | null;
};

export type IfElseConditionNodeDef = {
  type: "ifElseCondition";
  data: ConvertAstExpressionToAst<CLientIfElseConditionNode["data"]>;
  meta: NodeMeta;
  onTrue: NodesDef | null;
  onFalse: NodesDef | null;
  commonToBoth: NodesDef | null;
};

export type ApiResponseNodeDef = {
  type: "apiResponse";
  data: ConvertAstExpressionToAst<ClientApiResponseNode["data"]>;
  meta: NodeMeta;
  next: null;
};

export type NodesDef =
  | ApiRequestNodeDef
  | ApiResponseNodeDef
  | IfElseConditionNodeDef;

export type BackendProject = {
  routes: Array<{ route: string; definition: ApiRequestNodeDef }>;
  name: string;
};
