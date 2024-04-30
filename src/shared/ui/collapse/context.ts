import { Dispatch, SetStateAction, createContext, useContext } from "react";

import invariant from "tiny-invariant";

export type CollapseContext = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export const CollapseCtx = createContext<CollapseContext | undefined>(
  undefined
);

export const useCollapseCtx = () => {
  const ctx = useContext(CollapseCtx);
  invariant(ctx, "useCollapseCtx must be used within CollapseCtx.Provider");

  return ctx;
};
