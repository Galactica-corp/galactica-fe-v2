import { PropsWithChildren } from "react";
import { NavLink, NavLinkProps } from "react-router-dom";

import { IconName } from "shared/ui/icon";

import { Item } from "./item";

type Props = {
  iconName: IconName;
} & NavLinkProps;

export const Link = ({
  iconName,
  children,
  ...props
}: PropsWithChildren<Props>) => {
  return (
    <NavLink {...props}>
      {({ isActive }) => {
        return (
          <Item iconName={iconName} isActive={isActive}>
            {children}
          </Item>
        );
      }}
    </NavLink>
  );
};
