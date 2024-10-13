import ts, { factory } from "typescript";
import { HONO_CONTEXT_IDEN, ILIB_IDEN } from "../constants";

/**
 *
 * Source code AST
 *
 * ```ts
 * // <expression> must be an array
 * ilib.validateHeaders(c, <expression>)
 * ```
 */
export function $callValidateHeaders(requiredHeaders: ts.Expression) {
  const ast = factory.createCallExpression(
    factory.createPropertyAccessExpression(
      factory.createIdentifier(ILIB_IDEN),
      factory.createIdentifier("validateHeaders")
    ),
    undefined,
    [factory.createIdentifier(HONO_CONTEXT_IDEN), requiredHeaders]
  );

  return ast;
}
