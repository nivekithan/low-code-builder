import { QueryClient } from "@tanstack/react-query";
import { createTRPCReact } from "@trpc/react-query";
import { ipcLink } from "electron-trpc/renderer";
import type { ClientApiRouter } from "electron/api/index.ts";
import { createTRPCProxyClient } from "@trpc/client";

export const trpc = createTRPCReact<ClientApiRouter>();

export const vanilaTrpcClient = createTRPCProxyClient<ClientApiRouter>({
  links: [ipcLink()],
});

export const trpcClientProvider = trpc.createClient({ links: [ipcLink()] });

export const queryClientProvider = new QueryClient();
