import { PropsWithChildren } from "react";
import { NavLink, NavLinkProps } from "react-router-dom";

import { twJoin } from "tailwind-merge";

import { ClassName } from "shared/types";
import { IconName } from "shared/ui/icon";

import { Item } from "./item";

type Props = {
  disabled?: boolean;
  iconName: IconName;
} & Omit<NavLinkProps, "className"> &
  ClassName;

export const Link = ({
  iconName,
  children,
  className,
  disabled,
  ...props
}: PropsWithChildren<Props>) => {
  return (
    <NavLink
      {...props}
      className={twJoin(
        "inline-flex",
        disabled && "pointer-events-none opacity-50"
      )}
    >
      {({ isActive }) => {
        return (
          <Item
            className={className}
            iconName={iconName}
            isActive={isActive && !disabled}
          >
            {children}
          </Item>
        );
      }}
    </NavLink>
  );
};
