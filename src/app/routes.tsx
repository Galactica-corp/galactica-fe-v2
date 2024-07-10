import { Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { DataGuardiansPage } from "pages/data-guardians";
import { DevPage } from "pages/dev";
import { ErrorPage } from "pages/error";
import { KYCGuardiansPage } from "pages/kyc-guardians";
import { MyCertificatesPage } from "pages/my-certificates";
import { MySBTsPage } from "pages/my-sbts";
import { PassportPage } from "pages/passport";
import { SkillTreePage } from "pages/skill-tree";
import { Layout } from "pages/ui";

import { AuthGuard } from "./guards/auth";

const router = createBrowserRouter([
  {
    element: <Layout isDrawer />,
    // Global error-boundary
    errorElement: <ErrorPage />,
    children: [
      {
        element: <AuthGuard isMetamaskNeeded />,
        children: [
          {
            path: "/",
            element: <PassportPage />,
          },
          {
            path: "/dev",
            element: <DevPage />,
          },
        ],
      },
      {
        element: <AuthGuard isBackendNeeded isMetamaskNeeded isSnapNeeded />,
        children: [{ path: "/skill-tree", element: <SkillTreePage /> }],
      },
      { path: "*", element: <div>Not found</div> },
    ],
  },
  {
    element: <Layout />,
    // Global error-boundary
    errorElement: <ErrorPage />,
    children: [
      { path: "/data-guardians", element: <DataGuardiansPage /> },
      { path: "/kyc-guardians", element: <KYCGuardiansPage /> },
      {
        element: <AuthGuard isMetamaskNeeded />,
        children: [{ path: "/my-sbts", element: <MySBTsPage /> }],
      },
      {
        element: <AuthGuard isMetamaskNeeded isSnapNeeded />,
        children: [
          { path: "/my-certificates", element: <MyCertificatesPage /> },
        ],
      },
      { path: "*", element: <div>Not found</div> },
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
