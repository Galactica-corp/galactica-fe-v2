import { PropsWithChildren } from "react";
import { NavLink, NavLinkProps } from "react-router-dom";

import { ClassName } from "shared/types";
import { IconName } from "shared/ui/icon";

import { Item } from "./item";

type Props = {
  iconName: IconName;
} & Omit<NavLinkProps, "className"> &
  ClassName;

export const Link = ({
  iconName,
  children,
  className,
  ...props
}: PropsWithChildren<Props>) => {
  return (
    <NavLink {...props} className="inline-flex">
      {({ isActive }) => {
        return (
          <Item className={className} iconName={iconName} isActive={isActive}>
            {children}
          </Item>
        );
      }}
    </NavLink>
  );
};
