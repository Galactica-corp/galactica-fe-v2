import { PropsWithChildren, useState } from "react";

import { Content } from "./content";
import { CollapseCtx } from "./context";
import { Trigger } from "./trigger";

type Props = {
  defaultIsOpen?: boolean;
  keepMount?: boolean;
};

export const Collapse = ({
  children,
  defaultIsOpen = false,
  keepMount = false,
}: PropsWithChildren<Props>) => {
  const [isOpen, setIsOpen] = useState(defaultIsOpen);

  return (
    <CollapseCtx.Provider
      value={{ isOpen: isOpen, keepMount, setIsOpen: setIsOpen }}
    >
      {children}
    </CollapseCtx.Provider>
  );
};

Collapse.Content = Content;
Collapse.Trigger = Trigger;
