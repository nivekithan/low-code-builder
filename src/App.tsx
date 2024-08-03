import { createHashRouter, RouterProvider } from "react-router-dom";

import RootIndexPage, {
  loader as rootIndexLoader,
  action as rootIndexAction,
} from "./routes/_index/page";

import SingleProjectPage, {
  loader as singleProjectLoader,
} from "./routes/projects.$projectId/page";

const ReactRouter = createHashRouter([
  {
    path: "/",
    index: true,
    element: <RootIndexPage />,
    loader: rootIndexLoader,
    action: rootIndexAction,
  },
  {
    path: "/projects/:projectId",
    element: <SingleProjectPage />,
    loader: singleProjectLoader,
  },
]);

export function App() {
  return <RouterProvider router={ReactRouter} />;
}
