import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const projectsTable = sqliteTable("project", {
  id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
  name: text("name").unique().notNull(),
  path: text("path").unique().notNull(),
});

export const apiTable = sqliteTable("api", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  projectId: text("project_id")
    .notNull()
    .references(() => projectsTable.id, { onDelete: "cascade" }),
  route: text("route").notNull(),
  definition: text("definition", { mode: "json" }).notNull(),
});
