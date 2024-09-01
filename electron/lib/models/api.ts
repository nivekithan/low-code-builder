import { ClientApiRoute } from "common/types";
import { db } from "../utils/db";
import { apiTable } from "../schema";
import { eq } from "drizzle-orm";

export async function saveApi({
  apiRoute,
  projectId,
}: {
  projectId: number;
  apiRoute: ClientApiRoute;
}) {
  const result = await db
    .insert(apiTable)
    .values({
      projectId,
      route: apiRoute.route,
      definition: { customNodes: apiRoute.customNodes, edges: apiRoute.edges },
    })
    .onConflictDoUpdate({
      target: [apiTable.projectId, apiTable.route],
      set: {
        definition: {
          customNodes: apiRoute.customNodes,
          edges: apiRoute.edges,
        },
      },
    })
    .returning();

  if (result.length === 0) {
    throw new Error("Failed to save API");
  }

  return result[0];
}

export async function getAllApi(projectId: number) {
  const result = await db
    .select()
    .from(apiTable)
    .where(eq(apiTable.projectId, projectId));

  return result;
}
