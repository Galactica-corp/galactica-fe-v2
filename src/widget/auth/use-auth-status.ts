import { useAccount } from "wagmi";

import { useGetSnapQuery } from "shared/snap/rq";
import { useSessionStore } from "shared/stores";

type Params = {
  isMetamaskNeeded?: boolean;
  isSnapNeeded?: boolean;
};
export const useAuthStatus = ({ isMetamaskNeeded, isSnapNeeded }: Params) => {
  const { chain, isConnected } = useAccount();
  const snapQuery = useGetSnapQuery();

  const [sessionId] = useSessionStore();

  const isMetamaskAuth = isMetamaskNeeded
    ? Boolean(chain && isConnected && sessionId)
    : true;
  const isSnapAuth = isSnapNeeded
    ? snapQuery.data && snapQuery.isSuccess
    : true;

  const isWrongChain = isConnected && !chain;

  const isAuth = isMetamaskAuth && isSnapAuth && !isWrongChain;

  return { isMetamaskAuth, isSnapAuth, isAuth, isWrongChain };
};
