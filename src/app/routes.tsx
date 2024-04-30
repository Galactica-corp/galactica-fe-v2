import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { HomePage } from "pages/home";

export const AppRoutes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
  ]);

  return <RouterProvider router={router} />;
};
