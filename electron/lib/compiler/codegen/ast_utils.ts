import ts, { factory } from "typescript";

export function $importEverythingFromFile({
  filePath,
  importIdentifier,
}: {
  filePath: string;
  importIdentifier: string;
}) {
  const importDeclaration = factory.createImportDeclaration(
    undefined,
    factory.createImportClause(
      false,
      undefined,
      factory.createNamespaceImport(factory.createIdentifier(importIdentifier))
    ),
    factory.createStringLiteral(filePath),
    undefined
  );

  return importDeclaration;
}

/**
 *
 * Source code AST:
 *
 * ```ts
 *
 * const variableName = <expression>
 *
 * ```
 */
export function $constVariable(
  variableName: string,
  expression: ts.Expression
) {
  const ast = factory.createVariableStatement(
    undefined,
    factory.createVariableDeclarationList(
      [
        factory.createVariableDeclaration(
          factory.createIdentifier(variableName),
          undefined,
          undefined,
          expression
        ),
      ],
      ts.NodeFlags.Const
    )
  );

  return ast;
}
