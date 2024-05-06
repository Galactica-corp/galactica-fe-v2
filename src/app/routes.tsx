import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { AuthPage } from "pages/auth";
import { HomePage } from "pages/home";
import { PassportPage } from "pages/passport";
import { Layout } from "pages/ui/layout";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/my-passports",
        element: <PassportPage />,
      },
    ],
  },
  { element: <Layout />, children: [{ path: "/auth", element: <AuthPage /> }] },
]);

export const AppRoutes = () => {
  return <RouterProvider router={router} />;
};
