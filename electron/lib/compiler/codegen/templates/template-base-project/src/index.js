import { Hono } from "hono";
import { GET_ROOT_HANDLER } from "./routes/root";

const app = new Hono();

app.get("/", GET_ROOT_HANDLER);

export default app;
