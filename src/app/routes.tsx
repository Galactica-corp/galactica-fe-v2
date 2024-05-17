import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { DataGuardiansPage } from "pages/data-guardians";
// import { HomePage } from "pages/home";
import { KYCGuardiansPage } from "pages/kyc-guardians";
import { MyCertificatesPage } from "pages/my-certificates";
import { PassportPage } from "pages/passport";
import { Layout } from "pages/ui/layout";

import { AuthGuard } from "./guards/auth";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        element: <AuthGuard />,
        children: [
          {
            path: "/",
            element: <PassportPage />,
          },
          {
            path: "/kyc-guardians",
            element: <KYCGuardiansPage />,
          },
          { path: "/data-guardians", element: <DataGuardiansPage /> },
          { path: "/my-certificates", element: <MyCertificatesPage /> },
        ],
      },
    ],
  },
]);

export const AppRoutes = () => {
  return <RouterProvider router={router} />;
};
