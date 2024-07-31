import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { trpcClient } from "@/lib/trpc";

const ReactRouter = createBrowserRouter([
  {
    path: "/",
    index: true,
    element: <h1>Hello World</h1>,
    loader: async () => {
      console.log("Loading...");
      const result = await trpcClient.projects.list.query({
        name: "Nivekithan",
      });

      console.log(result);

      return null;
    },
  },
]);

export function App() {
  return <RouterProvider router={ReactRouter} />;
}
