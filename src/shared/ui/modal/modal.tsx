import { ReactNode, useState } from "react";

import { AnimatePresence } from "framer-motion";

import { Content } from "./content";
import { ModalContext, ModalContextType } from "./context";
import { Overlay } from "./overlay";

export type ModalProps = {
  children?: ((props: ModalContextType) => ReactNode) | ReactNode;
  onClose: (isOpen: false) => void;
};

export const Modal = (props: ModalProps) => {
  const { children, onClose } = props;

  const [isOpen, setIsOpen] = useState(true);

  const handleChange = () => {
    setIsOpen(false);
  };

  const ctx = { isOpen, onChange: handleChange };

  return (
    <ModalContext.Provider value={ctx}>
      <AnimatePresence onExitComplete={() => onClose?.(false)}>
        {isOpen &&
          (typeof children === "function" ? children?.(ctx) : children)}
      </AnimatePresence>
    </ModalContext.Provider>
  );
};

Modal.Overlay = Overlay;
Modal.Content = Content;
