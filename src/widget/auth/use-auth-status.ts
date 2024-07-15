import { useAccount } from "wagmi";

import { useGetSnapQuery } from "shared/snap/rq";
import { useSessionStore } from "shared/stores";

type Params = {
  isBackendNeeded?: boolean;
  isMetamaskNeeded?: boolean;
  isSnapNeeded?: boolean;
};
export const useAuthStatus = ({
  isBackendNeeded,
  isMetamaskNeeded,
  isSnapNeeded,
}: Params) => {
  const { chain, isConnected } = useAccount();
  const snapQuery = useGetSnapQuery();

  const [sessionId] = useSessionStore();

  const isMetamaskAuth = isMetamaskNeeded
    ? Boolean(chain && isConnected)
    : true;
  const isSnapAuth = isSnapNeeded
    ? snapQuery.data && snapQuery.isSuccess
    : true;
  const isBackendAuth = isBackendNeeded ? Boolean(sessionId) : true;

  const isWrongChain = isConnected && !chain;

  const isAuth = isMetamaskAuth && isSnapAuth && isBackendAuth && !isWrongChain;

  return { isMetamaskAuth, isSnapAuth, isBackendAuth, isAuth, isWrongChain };
};
