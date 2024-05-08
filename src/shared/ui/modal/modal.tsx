import { PropsWithChildren, useState } from "react";

import { AnimatePresence } from "framer-motion";

import { Content } from "./content";
import { ModalContext } from "./context";
import { Overlay } from "./overlay";

export type ModalProps = {
  isOpen: boolean;
  onClose: (isOpen: false) => void;
};

export const Modal = (props: PropsWithChildren<ModalProps>) => {
  const { isOpen, children, onClose } = props;

  const [isOpenState, setIsStateOpen] = useState(true);

  const handleChange = () => {
    setIsStateOpen(false);
  };

  const handleAnimationEnd = () => {
    if (isOpenState) return;
    console.log("animationEnd");
    onClose?.(false);
    setIsStateOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{
        isOpen: isOpenState,
        onChange: handleChange,
        onAnimationEnd: handleAnimationEnd,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

Modal.Overlay = Overlay;
Modal.Content = Content;
