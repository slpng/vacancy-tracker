"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  FC,
  ReactNode,
  MouseEvent,
  useCallback,
} from "react";

interface IModalContext {
  modalIsOpen: boolean;
  handleOpen: ((event: MouseEvent) => void) | undefined;
  handleClose: ((event: MouseEvent) => void) | undefined;
}

const ModalContext = createContext<IModalContext>({
  modalIsOpen: false,
  handleOpen: undefined,
  handleClose: undefined,
});
const useModal = () => useContext(ModalContext);

interface Props {
  children: ReactNode;
}

const ModalProvider: FC<Props> = ({ children }) => {
  const htmlTag = document.querySelector("html");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const modalAnimationDuration = 400;

  const handleOpen = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      if (htmlTag) {
        setModalIsOpen(true);
        htmlTag.classList.add("modal-is-open", "modal-is-opening");
        setTimeout(() => {
          htmlTag.classList.remove("modal-is-opening");
        }, modalAnimationDuration);
      }
    },
    [htmlTag]
  );

  const handleClose = useCallback(
    (event: MouseEvent | KeyboardEvent) => {
      event.preventDefault();
      if (htmlTag) {
        htmlTag.classList.add("modal-is-closing");
        setTimeout(() => {
          setModalIsOpen(false);
          htmlTag.classList.remove("modal-is-open", "modal-is-closing");
        }, modalAnimationDuration);
      }
    },
    [htmlTag]
  );

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (!modalIsOpen) return;
      if (event.key === "Escape") {
        handleClose(event);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [modalIsOpen, handleClose]);

  return (
    <ModalContext.Provider
      value={{
        modalIsOpen,
        handleOpen,
        handleClose,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export { ModalProvider, useModal };
