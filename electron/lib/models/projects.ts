import { projectsTable } from "../schema";
import { db } from "../utils/db";

export async function createProject({
  name,
  path,
}: {
  name: string;
  path: string;
}) {
  const result = await db
    .insert(projectsTable)
    .values({ path: path, name: name })
    .returning();

  if (result.length === 0) {
    throw new Error("Failed to create project");
  }

  return result[0];
}

export async function listProjects() {
  const projects = await db.select().from(projectsTable);

  return projects;
}
