import { ToastContainer } from "react-toastify";

import { RqProvider } from "shared/providers/rq";
import { WagmiProvider } from "shared/providers/wagmi";
import { useSyncSession } from "shared/stores";
import { CloseButton } from "shared/ui/toast";

import { AppRoutes } from "./routes";

import "react-toastify/dist/ReactToastify.min.css";

import "./index.css";

export const App = () => {
  useSyncSession();

  return (
    <WagmiProvider>
      <RqProvider>
        <AppRoutes />
        <ToastContainer
          closeButton={CloseButton}
          icon={false}
          position="bottom-right"
        />
      </RqProvider>
    </WagmiProvider>
  );
};
