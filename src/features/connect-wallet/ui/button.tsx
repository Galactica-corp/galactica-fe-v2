import { ComponentProps, ReactNode } from "react";

import { twMerge } from "tailwind-merge";
import { Address } from "viem";
import {
  Connector,
  useAccount,
  useChainId,
  useConnect,
  useDisconnect,
  useSwitchChain,
} from "wagmi";

import { useAuthMutation } from "shared/api";
import { useGetSnapQuery, useInstallSnapMutation } from "shared/snap/rq";
import { useSessionStore } from "shared/stores";
import { ClassName } from "shared/types";
import { Button, ButtonProps } from "shared/ui/button";
import { catchError } from "shared/ui/toast";
import { shortAddress } from "shared/web3/utils";

type Props = {
  connectContent?: ReactNode;
  installMetamaskContent?: ReactNode;
  installSnapContent?: ReactNode;
  onConnect?: (connector: Connector, address: Address) => Promise<void> | void;

  switchChainContent?: ReactNode;
} & ButtonProps &
  ClassName;

export function ConnectButton({
  className,
  installMetamaskContent = "Install Metamask",
  connectContent = "Connect MetaMask",
  switchChainContent = "Switch to Galactica",
  installSnapContent = "Install MetaMask snap",
  onConnect,
  ...props
}: Props) {
  const { address, isDisconnected, isConnecting, connector, chain } =
    useAccount();
  const chainId = useChainId();

  const snapQuery = useGetSnapQuery();
  const mutation = useInstallSnapMutation();
  const [sessionId] = useSessionStore();

  const { switchChain, isPending: isSwitchChainPending } = useSwitchChain();
  const { disconnect, isPending: isDisconnectPending } = useDisconnect();
  const { connectAsync, connectors } = useConnect();
  const authMutation = useAuthMutation();

  const handleConnect = async () => {
    const metamaskConnector = connectors.find(
      (connector) => connector.name === "MetaMask"
    );
    const flaskConnector = connectors.find((connector) => {
      return connector.name === "MetaMask Flask";
    });

    const connector = metamaskConnector ?? flaskConnector;

    try {
      const connectData = connector
        ? await connectAsync({ connector })
        : undefined;

      if (connector && connectData)
        onConnect?.(connector, connectData?.accounts[0]);
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
        connector.name === "MetaMask" || connector.name === "MetaMask Flask"
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

  if (isDisconnected || isConnecting) {
    return (
      <Button {...btnProps} isLoading={isConnecting} onClick={handleConnect}>
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
        isLoading={mutation.isPending}
        onClick={mutation.mutate}
      >
        {installSnapContent}
      </Button>
    );
  }

  if (!sessionId) {
    return (
      <Button
        {...btnProps}
        isLoading={authMutation.isPending}
        onClick={authMutation.mutate}
      >
        Log In
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
