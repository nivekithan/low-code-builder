import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { db } from "./db";
import path from "node:path";

export async function migrateDb() {
  return migrate(db, {
    migrationsFolder: path.resolve(process.cwd(), "migrations"),
  });
}
