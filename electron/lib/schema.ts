import { ClientApiRoute } from "common/types";
import {
  sqliteTable,
  integer,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

export const projectsTable = sqliteTable("project", {
  id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
  name: text("name").unique().notNull(),
  path: text("path").unique().notNull(),
});

export const apiTable = sqliteTable(
  "api",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    projectId: integer("project_id")
      .notNull()
      .references(() => projectsTable.id, { onDelete: "cascade" }),
    route: text("route").notNull(),
    definition: text("definition", { mode: "json" })
      .notNull()
      .$type<Omit<ClientApiRoute, "route">>(),
  },
  (table) => {
    return {
      unique_route_for_project: uniqueIndex("unique_route_for_project").on(
        table.projectId,
        table.route
      ),
    };
  }
);
