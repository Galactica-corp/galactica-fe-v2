import { Outlet } from "react-router-dom";

import { useSessionStorage } from "@uidotdev/usehooks";
import { useAccount, useAccountEffect } from "wagmi";
import { Auth as AuthWidget, useAuthStatus } from "widget/auth";

import { useGetSnapQuery } from "shared/snap/rq";
import { useSessionStore } from "shared/stores";

type Props = {
  isMetamaskNeeded?: boolean;
  isSnapNeeded?: boolean;
};

export const Auth = ({ isMetamaskNeeded, isSnapNeeded }: Props) => {
  const { isConnected } = useAccount();
  const { isPending } = useGetSnapQuery();
  const { isAuth } = useAuthStatus({
    isMetamaskNeeded,
    isSnapNeeded,
  });

  const [_, setSessionId] = useSessionStore();
  const [holdAnimation, setHoldAnimation] = useSessionStorage(
    "hold-passport-animation",
    !isAuth
  );

  useAccountEffect({
    onDisconnect() {
      setSessionId(undefined);
      setHoldAnimation(true);
    },
  });

  const onComplete = () => {
    setHoldAnimation(false);
  };

  if (isPending && isConnected && !holdAnimation) {
    return null;
  }

  if (isAuth && !holdAnimation) return <Outlet />;

  return (
    <div className="flex grow items-center py-9">
      <AuthWidget
        className="m-auto"
        isMetamaskNeeded={isMetamaskNeeded}
        isSnapNeeded={isSnapNeeded}
        onComplete={onComplete}
      />
    </div>
  );
};
