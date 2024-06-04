import { useLocalStorage } from "@uidotdev/usehooks";
import { AnimationProps, motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { useAccount, useDisconnect } from "wagmi";

import { Avatar, Profile } from "entities/profile";
import { ConnectWalletButton } from "features/connect-wallet";
import { useGetSnapQuery } from "shared/snap/rq";
import { Icon, IconName } from "shared/ui/icon";
import { Logo } from "shared/ui/logo";

import { Link } from "./link";

type TLink = {
  disabled: boolean;
  iconName: IconName;
  text: string;
  to: string;
};

export const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useLocalStorage(
    "is-sidebar-expanded",
    false
  );
  const { disconnect } = useDisconnect();
  const { isConnected } = useAccount();
  const query = useGetSnapQuery();

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
    {
      iconName: "scan",
      to: "/data-guardians",
      text: "Data Guardians",
      disabled: false,
    },
  ];

  return (
    <motion.aside
      animate={isExpanded ? "expanded" : "collapsed"}
      className={twMerge(
        "flex max-w-80 grow select-none flex-col overflow-hidden border-r border-r-catskillWhite py-8 grid-in-sidebar"
      )}
      initial={false}
      variants={sidebarVariants}
    >
      <Logo
        className="block h-8 pl-6"
        isSmall={!isExpanded}
        onClick={() => {
          setIsExpanded(!isExpanded);
        }}
      />
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
      {(!isConnected || (query.isSuccess && !query.data)) && (
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
            className={
              "relative h-9 w-full gap-1.5 overflow-hidden whitespace-nowrap p-0 text-sm font-semibold"
            }
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
            theme="basketBallOrange-transparent"
          />
        </div>
      )}

      <div className="mt-auto flex border-t border-t-catskillWhite pl-6 pr-4 pt-6">
        {isExpanded ? (
          <Profile
            action={
              <Icon
                className="cursor-pointer transition-colors hover:brightness-150"
                name="logout"
                onClick={() => disconnect()}
              />
            }
            className="grow"
          />
        ) : (
          <Avatar />
        )}
      </div>
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
