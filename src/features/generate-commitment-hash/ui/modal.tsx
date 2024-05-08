import { useState } from "react";

import { Modal as M } from "shared/ui/modal";

type Props = {
  onClose: () => void;
};

export const Modal = ({ onClose }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        Hello world
      </button>
      <M isOpen={isOpen} onClose={setIsOpen}>
        <M.Overlay>
          <M.Content>Hello world</M.Content>
        </M.Overlay>
      </M>
    </>
  );
};
