import { PropsWithChildren } from "react";

import { AnimationProps, motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { useAccount, useDisconnect } from "wagmi";
import { useAuthStatus } from "widget/auth";

import { Avatar, Profile } from "entities/profile";
import { ConnectWalletButton } from "features/connect-wallet";
import { useSignOutMutation } from "shared/api";
import { useGetSnapQuery } from "shared/snap/rq";
import { useSessionStore } from "shared/stores";
import { ClassName } from "shared/types";
import { ErrorIcon, Icon, IconName } from "shared/ui/icon";
import { Logo } from "shared/ui/logo";

import { Link } from "./link";

type TLink = {
  disabled: boolean;
  iconName: IconName;
  text: string;
  to: string;
};

type Props = {
  drawer?: boolean;
  drawerRef?: React.LegacyRef<HTMLElement> | undefined;
  isExpanded: boolean;
} & ClassName;

export const Sidebar = ({
  isExpanded,
  drawer,
  className,
  drawerRef,
}: PropsWithChildren<Props>) => {
  const { disconnect } = useDisconnect();
  const { isConnected, address } = useAccount();
  const query = useGetSnapQuery();
  const signOutMutation = useSignOutMutation();
  const [sessionId] = useSessionStore();
  const { isAuth, isWrongChain } = useAuthStatus({
    isMetamaskNeeded: true,
    isSnapNeeded: true,
  });

  const links: TLink[] = [
    {
      iconName: "stars",
      to: "/",
      text: "My passport",
      disabled: !isConnected,
    },
    {
      iconName: "passwordLock",
      to: "my-sbts",
      text: "My SBTs",
      disabled: !isConnected,
    },
    {
      iconName: "certificate",
      to: "/my-certificates",
      text: "My Certificates",
      disabled: !isConnected || !query.data,
    },
    {
      iconName: "faceId",
      to: "/kyc-guardians",
      text: "KYC Guardians",
      disabled: false,
    },
    // {
    //   iconName: "scan",
    //   to: "/data-guardians",
    //   text: "Data Guardians",
    //   disabled: false,
    // },
    {
      iconName: "shieldZap",
      to: "/skill-tree",
      text: "Skill Tree",
      disabled: !isConnected || !sessionId,
    },
  ];

  return (
    <motion.aside
      animate={isExpanded ? "expanded" : "collapsed"}
      className={twMerge(
        "flex max-w-80 select-none flex-col overflow-hidden border-r border-r-catskillWhite bg-white py-8 grid-in-sidebar",
        drawer && "fixed inset-y-0 left-0 z-50",
        className
      )}
      initial={false}
      ref={drawerRef}
      variants={sidebarVariants}
    >
      <Logo className="block h-8 pl-6" isSmall={!isExpanded} />
      <nav className="mb-8 mt-6 flex flex-col gap-y-1 px-4">
        {links.map(({ text, iconName, to, disabled }) => {
          return (
            <Link
              disabled={disabled}
              iconName={iconName}
              key={iconName}
              to={to}
            >
              {isExpanded && text}
            </Link>
          );
        })}
      </nav>
      {!isAuth && (
        <div className="flex flex-col px-4">
          <p
            className={twMerge(
              "mb-2 whitespace-nowrap text-sm font-medium text-riverBed opacity-0",
              isExpanded && "opacity-100"
            )}
          >
            To unlock the pages
          </p>
          <ConnectWalletButton
            className={twMerge(
              "relative h-9 w-full gap-1.5 overflow-hidden whitespace-nowrap p-0 text-sm font-semibold",
              isWrongChain && "inner-border-grapefruit"
            )}
            connectContent={
              <>
                <Icon className="size-5" name="metamask" />
                {isExpanded && (
                  <motion.div animate={{ width: "auto" }} className="w-0">
                    Connect Metamask
                  </motion.div>
                )}
              </>
            }
            installMetamaskContent={
              <>
                <Icon className="size-5" name="metamask" />
                {isExpanded && (
                  <motion.div animate={{ width: "auto" }} className="w-0">
                    Install Metamask
                  </motion.div>
                )}
              </>
            }
            installSnapContent={
              <>
                <Icon name="galactica" />
                {isExpanded && (
                  <motion.div animate={{ width: "auto" }} className="w-0">
                    Install Metamask SNAP
                  </motion.div>
                )}
              </>
            }
            switchChainContent={
              <>
                <ErrorIcon className="size-4 before:size-8 after:size-6" />
                {isExpanded && (
                  <motion.div animate={{ width: "auto" }} className="ml-3 w-0">
                    Switch to Galactica
                  </motion.div>
                )}
              </>
            }
            theme="basketBallOrange-transparent"
          />
        </div>
      )}

      {isConnected && address && (
        <div className="mt-auto flex border-t border-t-catskillWhite pl-6 pr-4 pt-6">
          {isExpanded ? (
            <Profile
              action={
                <Icon
                  className="cursor-pointer transition-colors hover:brightness-150"
                  name="logout"
                  onClick={() => {
                    signOutMutation.mutate(undefined);
                    disconnect();
                  }}
                />
              }
              className="grow"
            />
          ) : (
            <Avatar className="flex size-10 shrink-0" />
          )}
        </div>
      )}
    </motion.aside>
  );
};

const sidebarVariants: AnimationProps["variants"] = {
  expanded: {
    width: "312px",
  },
  collapsed: {
    animationDelay: "1",
    width: "80px",
  },
};
