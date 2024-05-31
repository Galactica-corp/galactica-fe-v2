import { useLocalStorage } from "@uidotdev/usehooks";
import { AnimationProps, motion } from "framer-motion";
import { twJoin, twMerge } from "tailwind-merge";
import { useDisconnect } from "wagmi";

import { Avatar, Profile } from "entities/profile";
import { Collapse } from "shared/ui/collapse";
import { Icon, IconName } from "shared/ui/icon";
import { Logo } from "shared/ui/logo";

import { Item } from "./item";
import { Link } from "./link";

type TLink = {
  iconName: IconName;
  text: string;
  to: string;
};

const topGroupLinks: TLink[] = [
  {
    iconName: "shieldZap",
    to: "/validators",
    text: "Validators",
  },
  {
    iconName: "faceId",
    to: "/kyc-guardians",
    text: "KYC Guardians",
  },
  {
    iconName: "scan",
    to: "/data-guardians",
    text: "Data Guardians",
  },
];

export const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useLocalStorage(
    "is-sidebar-expanded",
    false
  );
  const { disconnect } = useDisconnect();

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
        {topGroupLinks.map(({ text, iconName, to }) => {
          return (
            <Link iconName={iconName} key={iconName} to={to}>
              {isExpanded && text}
            </Link>
          );
        })}
        <Collapse>
          <Collapse.Trigger className="inline-flex">
            {({ isOpen }) => (
              <Item iconName="building">
                {isExpanded && (
                  <>
                    Governance
                    <Icon
                      className={twJoin(
                        "ml-auto size-5 text-mistBlue",
                        isOpen && "rotate-180"
                      )}
                      name="chevronDown"
                    />
                  </>
                )}
              </Item>
            )}
          </Collapse.Trigger>
          <Collapse.Content>
            Content <br /> <br /> CONTENT
          </Collapse.Content>
        </Collapse>
      </nav>

      <nav className="mt-auto flex flex-col gap-y-1 px-4">
        <Link iconName="stars" to="/my-passports">
          {isExpanded && "My passport"}
        </Link>
        <Link iconName="certificate" to="/my-certificates">
          {isExpanded && "My Certificates"}
        </Link>
        <Link iconName="passwordLock" to="/my-sbts">
          {isExpanded && "My SBTs"}
        </Link>
        <Link iconName="trophy" to="/my-achievements">
          {isExpanded && "My Achievements"}
        </Link>
        <Link iconName="lifebuoy" to="/Support">
          {isExpanded && "Support"}
        </Link>
      </nav>

      <div className="mt-6 flex border-t border-t-catskillWhite pl-6 pr-4 pt-6">
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
    width: "80px",
  },
};
