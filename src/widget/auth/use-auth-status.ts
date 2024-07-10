import { ClientError } from "graphql-request";
import { useAccount } from "wagmi";

import { useSectionsQuery } from "shared/graphql";
import { useGetSnapQuery } from "shared/snap/rq";

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
  const sectionsQuery = useSectionsQuery(
    {},
    {
      staleTime: Infinity,
      retry: false,
      enabled: isBackendNeeded,
    }
  );

  const isUnauth =
    sectionsQuery.isPending ||
    (sectionsQuery.error instanceof ClientError &&
      sectionsQuery.error.response.status === 401);

  const isMetamaskAuth = isMetamaskNeeded
    ? Boolean(chain && isConnected)
    : true;
  const isSnapAuth = isSnapNeeded
    ? snapQuery.data && snapQuery.isSuccess
    : true;
  const isBackendAuth = isBackendNeeded ? !isUnauth : true;

  const isAuth = isMetamaskAuth && isSnapAuth && isBackendAuth;

  return { isMetamaskAuth, isSnapAuth, isBackendAuth, isAuth };
};
