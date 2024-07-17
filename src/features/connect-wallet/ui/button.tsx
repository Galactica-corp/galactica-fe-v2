import { ComponentProps, ReactNode } from "react";

import { useLocalStorage } from "@uidotdev/usehooks";
import { twMerge } from "tailwind-merge";
import {
  ConnectorAlreadyConnectedError,
  useAccount,
  useChainId,
  useConnect,
  useDisconnect,
  useSwitchChain,
} from "wagmi";

import { useAuthMutation } from "shared/api";
import { useCompleteNonVerifiableQuestMutation } from "shared/graphql";
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
  const mutation = useInstallSnapMutation();
  const [sessionId] = useSessionStore();

  const { switchChain, isPending: isSwitchChainPending } = useSwitchChain();
  const { disconnect, isPending: isDisconnectPending } = useDisconnect();
  const { connectAsync, connectors } = useConnect();
  const authMutation = useAuthMutation();
  const completeMutation = useCompleteNonVerifiableQuestMutation();
  const [isJoinCompleted, setIsJoinCompleted] = useLocalStorage(
    "is-join-completed",
    false
  );

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

    if (!isJoinCompleted) {
      completeMutation.mutate(
        {
          params: {
            quest: "join",
            section: "onboarding",
          },
        },
        {
          onSuccess: () => {
            setIsJoinCompleted(true);
          },
        }
      );
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

  if (isDisconnected || isConnecting || !sessionId) {
    return (
      <Button
        {...btnProps}
        isLoading={
          isConnecting || authMutation.isPending || completeMutation.isPending
        }
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
