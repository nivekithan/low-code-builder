import { createHashRouter, RouterProvider } from "react-router-dom";

import RootIndexPage, {
  loader as rootIndexLoader,
  action as rootIndexAction,
} from "./routes/_index/page";

const ReactRouter = createHashRouter([
  {
    path: "/",
    index: true,
    element: <RootIndexPage />,
    loader: rootIndexLoader,
    action: rootIndexAction,
  },
]);

export function App() {
  return <RouterProvider router={ReactRouter} />;
}
