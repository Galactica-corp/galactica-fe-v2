import { useAccount } from "wagmi";

import { useGetSnapQuery } from "shared/snap/rq";

export const useAuthStatus = () => {
  const { chain, isConnected } = useAccount();
  const { data, isSuccess } = useGetSnapQuery();

  const isMetamaskAuth = Boolean(chain && isConnected);
  const isSnapAuth = isMetamaskAuth && Boolean(data && isSuccess);

  return { isSnapAuth, isMetamaskAuth };
};
