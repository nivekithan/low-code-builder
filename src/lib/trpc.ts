import { createTRPCProxyClient } from "@trpc/client";
import { ipcLink } from "electron-trpc/renderer";
import { ClientApiRouter } from "electron/api/index.ts";

export const trpcClient = createTRPCProxyClient<ClientApiRouter>({
  links: [ipcLink()],
});
