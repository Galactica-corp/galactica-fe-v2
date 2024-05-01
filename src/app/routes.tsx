import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { AuthPage } from "pages/auth";
import { HomePage } from "pages/home";
import { Layout } from "pages/ui/layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  { element: <Layout />, children: [{ path: "/auth", element: <AuthPage /> }] },
]);

export const AppRoutes = () => {
  return <RouterProvider router={router} />;
};
