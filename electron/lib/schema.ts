import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const projectsTable = sqliteTable("project", {
  id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
  name: text("name").unique().notNull(),
  path: text("path").unique().notNull(),
});
