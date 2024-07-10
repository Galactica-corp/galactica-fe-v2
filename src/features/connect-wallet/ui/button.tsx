import { ComponentProps, ReactNode } from "react";

import { ClientError } from "graphql-request";
import { twMerge } from "tailwind-merge";
import {
  useAccount,
  useChainId,
  useConnect,
  useDisconnect,
  useSwitchChain,
} from "wagmi";

import { useAuthMutation } from "shared/api";
import { useSectionsQuery } from "shared/graphql";
import { useGetSnapQuery, useInstallSnapMutation } from "shared/snap/rq";
import { ClassName } from "shared/types";
import { Button, ButtonProps } from "shared/ui/button";
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
  switchChainContent = "Switch chain",
  installSnapContent = "Install MetaMask snap",
  ...props
}: Props) {
  const { address, isDisconnected, isConnecting, connector, chain } =
    useAccount();
  const chainId = useChainId();

  const snapQuery = useGetSnapQuery();
  const sectionsQuery = useSectionsQuery({}, { staleTime: Infinity });
  const mutation = useInstallSnapMutation();

  const { switchChain, isPending: isSwitchChainPending } = useSwitchChain();
  const { disconnect, isPending: isDisconnectPending } = useDisconnect();
  const { connect, connectors } = useConnect();
  const authMutation = useAuthMutation();

  const handleConnect = () => {
    const metamaskConnector = connectors.find(
      (connector) => connector.name === "MetaMask"
    );
    const flaskConnector = connectors.find((connector) => {
      return connector.name === "MetaMask Flask";
    });

    const connector = metamaskConnector ?? flaskConnector;

    connector && connect({ connector });
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

  if (
    sectionsQuery.isPending ||
    (sectionsQuery.error instanceof ClientError &&
      sectionsQuery.error.response.status === 401)
  ) {
    return (
      <Button
        {...btnProps}
        isLoading={authMutation.isPending || sectionsQuery.isPending}
        onClick={authMutation.mutate}
      >
        Log In
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
