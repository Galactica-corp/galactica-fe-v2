import { Outlet } from "react-router-dom";

import { useSessionStorage } from "@uidotdev/usehooks";
import { useAccount, useAccountEffect } from "wagmi";
import { AuthLevel, Auth as AuthWidget } from "widget/auth";

import { useGetSnapQuery } from "shared/snap/rq";

type Props = {
  level: AuthLevel;
};

export const Auth = ({ level }: Props) => {
  const { isConnected } = useAccount();
  const { data, isPending } = useGetSnapQuery();
  const [holdAnimation, setHoldAnimation] = useSessionStorage(
    "hold-passport-animation",
    !isConnected
  );

  useAccountEffect({
    onDisconnect() {
      setHoldAnimation(true);
    },
  });

  const onComplete = () => {
    setHoldAnimation(false);
  };

  if (isPending && isConnected && !holdAnimation) {
    return null;
  }

  if (level === "metamask" && isConnected && !holdAnimation) return <Outlet />;
  if (level === "snap" && isConnected && data && !holdAnimation)
    return <Outlet />;

  return (
    <div className="flex grow items-center py-9">
      <AuthWidget className="m-auto" level={level} onComplete={onComplete} />
    </div>
  );
};
