import { ComponentProps, ReactNode } from "react";

import { twMerge } from "tailwind-merge";
import {
  ConnectorAlreadyConnectedError,
  useAccount,
  useChainId,
  useConnect,
  useDisconnect,
  useSwitchChain,
} from "wagmi";

import { useAuthMutation, useCompleteQuestMutation } from "shared/api";
import { useGetSnapQuery, useInstallSnapMutation } from "shared/snap/rq";
import { useSessionStore } from "shared/stores";
import { ClassName } from "shared/types";
import { Button, ButtonProps } from "shared/ui/button";
import { catchError } from "shared/ui/toast";
import { sleep } from "shared/utils";
import { shortAddress } from "shared/web3/utils";

type Props = {
  connectContent?: ReactNode;
  installMetamaskContent?: ReactNode;
  installSnapContent?: ReactNode;
  switchChainContent?: ReactNode;
} & ButtonProps &
  ClassName;

export function ConnectButton({
  className,
  installMetamaskContent = "Install Metamask",
  connectContent = "Connect MetaMask",
  switchChainContent = "Switch to Galactica",
  installSnapContent = "Install MetaMask snap",
  ...props
}: Props) {
  const { address, isDisconnected, isConnecting, connector, chain } =
    useAccount();
  const chainId = useChainId();

  const snapQuery = useGetSnapQuery();
  const installSnapMutation = useInstallSnapMutation();
  const [sessionId] = useSessionStore();

  const { switchChain, isPending: isSwitchChainPending } = useSwitchChain();
  const { disconnect, isPending: isDisconnectPending } = useDisconnect();
  const { connectAsync, connectors } = useConnect();
  const authMutation = useAuthMutation();
  const completeMutation = useCompleteQuestMutation();

  const handleConnect = async () => {
    const metamaskConnector = connectors.find(
      (connector) => connector.name === "MetaMask"
    );
    const flaskConnector = connectors.find((connector) => {
      return connector.name === "MetaMask Flask";
    });

    const connector = metamaskConnector ?? flaskConnector;

    try {
      connector ? await connectAsync({ connector }) : undefined;
    } catch (error) {
      if (!(error instanceof ConnectorAlreadyConnectedError)) {
        catchError(error);
      }
    }

    try {
      if (!sessionId) await authMutation.mutateAsync({ connector });
    } catch (error) {
      catchError(error);
    }
  };

  const btnProps: ComponentProps<typeof Button> = {
    className: twMerge("w-[18.75rem] gap-x-1.5 whitespace-nowrap", className),
    isLoading: isConnecting,
    ...props,
  };

  if (
    !connectors.some(
      (connector) =>
        connector.name === "MetaMask" ||
        (import.meta.env.DEV && connector.name === "MetaMask Flask")
    )
  ) {
    return (
      <Button
        as="a"
        href="https://metamask.io/download"
        target="_blank"
        {...btnProps}
      >
        {installMetamaskContent}
      </Button>
    );
  }

  if (isDisconnected || isConnecting || !sessionId) {
    return (
      <Button
        {...btnProps}
        isLoading={isConnecting || authMutation.isPending}
        onClick={handleConnect}
      >
        {connectContent}
      </Button>
    );
  }

  if (!chain) {
    return (
      <Button
        {...btnProps}
        isLoading={isSwitchChainPending}
        onClick={() => switchChain({ connector: connector, chainId })}
      >
        {switchChainContent}
      </Button>
    );
  }

  if (snapQuery.isSuccess && !snapQuery.data) {
    return (
      <Button
        {...btnProps}
        isLoading={installSnapMutation.isPending}
        onClick={() => {
          installSnapMutation.mutate(
            {},
            {
              onSuccess: () => {
                completeMutation.mutate({
                  quest: "install-snap",
                  section: "1-onboarding",
                });
              },
            }
          );
        }}
      >
        {installSnapContent}
      </Button>
    );
  }

  return (
    <Button
      {...btnProps}
      isLoading={isDisconnectPending}
      onClick={() => disconnect()}
    >
      {shortAddress(address, 4, 4)}
    </Button>
  );
}
