import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./electron/lib/schema.ts",
  dialect: "sqlite",
  out: "./migrations",
});
