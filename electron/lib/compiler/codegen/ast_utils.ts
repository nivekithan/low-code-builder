import { factory } from "typescript";

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
      factory.createIdentifier(importIdentifier),
      undefined
    ),
    factory.createStringLiteral(filePath),
    undefined
  );

  return importDeclaration;
}
