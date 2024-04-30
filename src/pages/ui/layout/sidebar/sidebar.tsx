import { twJoin } from "tailwind-merge";

import { Profile } from "entities/profile";
import { Collapse } from "shared/ui/collapse";
import { Icon } from "shared/ui/icon";
import { Logo } from "shared/ui/logo";

import { Item } from "./item";
import { Link } from "./link";

export const Sidebar = () => {
  return (
    <aside className="flex grow flex-col border-r border-r-athensGray px-4 py-8 grid-in-sidebar">
      <Logo />
      <div className="mb-8 mt-6 flex flex-col gap-y-1">
        <Link iconName="shieldZap" to="/validators">
          Validators
        </Link>
        <Link iconName="faceId" to="/kyc-guardians">
          KYC Guardians
        </Link>
        <Link iconName="scan" to="/data-guardians">
          Data Guardians
        </Link>
        <Collapse>
          <Collapse.Trigger>
            {({ isOpen }) => (
              <Item iconName="building">
                Governance
                <Icon
                  className={twJoin("ml-auto size-5", isOpen && "rotate-180")}
                  name="chevronDown"
                />
              </Item>
            )}
          </Collapse.Trigger>
          <Collapse.Content>Content</Collapse.Content>
        </Collapse>
      </div>

      <div className="mt-auto flex flex-col gap-y-1">
        <Link iconName="stars" to="/my-passports">
          My passport
        </Link>
        <Collapse>
          <Collapse.Trigger>
            {({ isOpen }) => (
              <Item iconName="certificate">
                My Certificates
                <Icon
                  className={twJoin("ml-auto size-5", isOpen && "rotate-180")}
                  name="chevronDown"
                />
              </Item>
            )}
          </Collapse.Trigger>
          <Collapse.Content>Certificates</Collapse.Content>
        </Collapse>
        <Collapse>
          <Collapse.Trigger>
            {({ isOpen }) => (
              <Item iconName="passwordLock">
                My SBTs
                <Icon
                  className={twJoin("ml-auto size-5", isOpen && "rotate-180")}
                  name="chevronDown"
                />
              </Item>
            )}
          </Collapse.Trigger>
          <Collapse.Content>My SBTs</Collapse.Content>
        </Collapse>
        <Link iconName="passwordLock" to="/my-achievements">
          My Achievements
        </Link>
        <Link iconName="lifebuoy" to="/Support">
          Support
        </Link>
      </div>

      <div className="mt-6 flex border-t border-t-athensGray pl-2 pt-6">
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
      </div>
    </aside>
  );
};
