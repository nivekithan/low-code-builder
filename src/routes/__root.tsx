import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactFlowProvider } from "@xyflow/react";

export const Route = createRootRoute({
  component: () => (
    <>
      <ReactFlowProvider>
        <Outlet />
      </ReactFlowProvider>
      <TanStackRouterDevtools />
      <ReactQueryDevtools />
    </>
  ),
});
