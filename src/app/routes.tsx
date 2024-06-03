import { Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { DataGuardiansPage } from "pages/data-guardians";
import { ErrorPage } from "pages/error";
// import { HomePage } from "pages/home";
import { KYCGuardiansPage } from "pages/kyc-guardians";
import { MyCertificatesPage } from "pages/my-certificates";
import { MySBTsPage } from "pages/my-sbts";
import { PassportPage } from "pages/passport";
import { Layout } from "pages/ui/layout";

import { AuthGuard } from "./guards/auth";

const router = createBrowserRouter([
  {
    element: <Layout />,
    // Global error-boundary
    errorElement: <ErrorPage />,
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
          { path: "/my-sbts", element: <MySBTsPage /> },
          { path: "/my-certificates", element: <MyCertificatesPage /> },
          // { path: "*", element: <div>Not found</div> },
        ],
      },
    ],
  },
]);

export const AppRoutes = () => {
  return (
    <Suspense>
      <RouterProvider router={router} />
    </Suspense>
  );
};
