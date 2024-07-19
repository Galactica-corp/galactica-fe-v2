import { Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { DevPage } from "pages/dev";
import { ErrorPage } from "pages/error";
import { KYCGuardiansPage } from "pages/kyc-guardians";
import { MyCertificatesPage } from "pages/my-certificates";
import { MySBTsPage } from "pages/my-sbts";
import { PassportPage } from "pages/passport";
import { SkillTreePage } from "pages/skill-tree";
import { Layout } from "pages/ui";
import { RqProvider } from "shared/providers/rq";
import { WagmiProvider } from "shared/providers/wagmi";

import { AuthGuard } from "./guards/auth";
import { Root } from "./root";

import "react-toastify/dist/ReactToastify.min.css";

import "./index.css";

const router = createBrowserRouter([
  {
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <Layout isDrawer />,
        children: [
          {
            element: <AuthGuard isMetamaskNeeded isSnapNeeded />,
            children: [
              {
                path: "/",
                element: <PassportPage />,
              },
              {
                path: "/dev",
                element: <DevPage />,
              },
              { path: "/skill-tree", element: <SkillTreePage /> },
            ],
          },
          { path: "*", element: <div>Not found</div> },
        ],
      },
      {
        element: <Layout />,
        children: [
          // { path: "/data-guardians", element: <DataGuardiansPage /> },
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
    ],
  },
]);

export const App = () => {
  return (
    <WagmiProvider>
      <RqProvider>
        <Suspense>
          <RouterProvider router={router} />
        </Suspense>
      </RqProvider>
    </WagmiProvider>
  );
};
