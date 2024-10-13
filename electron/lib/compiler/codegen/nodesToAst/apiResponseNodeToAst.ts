import { factory } from "typescript";
import { ApiResponseNodeDef } from "../../parser/defination";
import { HONO_CONTEXT_IDEN } from "../constants";

export function generateApiResponseDef(nodeDef: ApiResponseNodeDef) {
  return factory.createReturnStatement(
    factory.createCallExpression(
      factory.createPropertyAccessExpression(
        factory.createIdentifier(HONO_CONTEXT_IDEN),
        factory.createIdentifier("text")
      ),
      undefined,
      [nodeDef.data.text]
    )
  );
}
