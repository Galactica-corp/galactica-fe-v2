import { createContext, useContext } from "react";

import invariant from "invariant";

export type ModalContextType = {
  isOpen: boolean;
  onAnimationEnd: () => void;
  onChange: (isOpen: boolean) => void;
};

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined
);

export const useModalContext = () => {
  const ctx = useContext(ModalContext);

  invariant(ctx, "useModalContext must be used within ModalContext");

  return ctx;
};
