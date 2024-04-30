import { useState } from "react";

import { AnimationProps, motion } from "framer-motion";
import { twJoin, twMerge } from "tailwind-merge";

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
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.aside
      animate={isExpanded ? "expanded" : "collapsed"}
      className={twMerge(
        "flex max-w-80 grow select-none flex-col overflow-hidden border-r border-r-athensGray py-8 grid-in-sidebar"
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
            <Link iconName={iconName} to={to}>
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
                        "ml-auto size-5 text-paleSky",
                        isOpen && "rotate-180"
                      )}
                      name="chevronDown"
                    />
                  </>
                )}
              </Item>
            )}
          </Collapse.Trigger>
          <Collapse.Content>Content</Collapse.Content>
        </Collapse>
      </nav>

      <nav className="mt-auto flex flex-col gap-y-1 px-4">
        <Link iconName="stars" to="/my-passports">
          {isExpanded && "My passport"}
        </Link>
        <Collapse>
          <Collapse.Trigger className="inline-flex">
            {({ isOpen }) => (
              <Item iconName="certificate">
                {isExpanded && (
                  <>
                    My Certificates
                    <Icon
                      className={twJoin(
                        "ml-auto size-5 text-paleSky",
                        isOpen && "rotate-180"
                      )}
                      name="chevronDown"
                    />
                  </>
                )}
              </Item>
            )}
          </Collapse.Trigger>
          <Collapse.Content>Certificates</Collapse.Content>
        </Collapse>
        <Collapse>
          <Collapse.Trigger className="inline-flex">
            {({ isOpen }) => (
              <Item iconName="passwordLock">
                {isExpanded && (
                  <>
                    My SBTs
                    <Icon
                      className={twJoin(
                        "ml-auto size-5 text-paleSky",
                        isOpen && "rotate-180"
                      )}
                      name="chevronDown"
                    />
                  </>
                )}
              </Item>
            )}
          </Collapse.Trigger>
          <Collapse.Content>My SBTs</Collapse.Content>
        </Collapse>
        <Link iconName="passwordLock" to="/my-achievements">
          {isExpanded && "My Achievements"}
        </Link>
        <Link iconName="lifebuoy" to="/Support">
          {isExpanded && "Support"}
        </Link>
      </nav>

      <div className="mt-6 flex border-t border-t-athensGray pl-6 pr-4 pt-6">
        {isExpanded ? (
          <Profile
            action={
              <Icon
                name="logout"
                onClick={() => {
                  console.log("click");
                }}
              />
            }
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
