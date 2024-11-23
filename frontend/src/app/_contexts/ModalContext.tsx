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
    ChangeEvent,
} from "react";

export type ModalType = "create" | "edit" | "none";

export interface ModalData {
    id: string;
    company: string;
    position: string;
    minSalary: string;
    maxSalary: string;
    status: string;
    note: string;
}

const initialModalData: ModalData = {
    id: "",
    company: "",
    position: "",
    minSalary: "",
    maxSalary: "",
    status: "",
    note: "",
};

interface IModalContext {
    modalType: ModalType;
    modalData: ModalData;
    handleOpen: (
        modalType: ModalType,
        modalData?: ModalData
    ) => ((event: MouseEvent) => void) | undefined;
    handleClose: ((event: MouseEvent) => void) | undefined;
    handleChange: (
        event:
            | ChangeEvent<HTMLInputElement>
            | ChangeEvent<HTMLSelectElement>
            | ChangeEvent<HTMLTextAreaElement>
    ) => void;
}

const ModalContext = createContext<IModalContext>({
    modalType: "none",
    modalData: initialModalData,
    handleOpen: () => undefined,
    handleClose: () => undefined,
    handleChange: () => undefined,
});
const useModal = () => useContext(ModalContext);

interface Props {
    children: ReactNode;
}

const ModalProvider: FC<Props> = ({ children }) => {
    const htmlTag = document.querySelector("html");
    const [modalType, setModalType] = useState<ModalType>("none");
    const [modalData, setModalData] = useState<ModalData>(initialModalData);
    const modalAnimationDuration = 400;

    const handleOpen = useCallback(
        (modalType: ModalType, modalData?: ModalData) => {
            return (event: MouseEvent) => {
                event.preventDefault();
                if (htmlTag) {
                    setModalType(modalType);

                    if (modalType === "create") {
                        setModalData(initialModalData);
                    }
                    if (modalType === "edit") {
                        setModalData(modalData || initialModalData);
                    }

                    htmlTag.classList.add("modal-is-open", "modal-is-opening");
                    setTimeout(() => {
                        htmlTag.classList.remove("modal-is-opening");
                    }, modalAnimationDuration);
                }
            };
        },
        [htmlTag]
    );

    const handleClose = useCallback(
        (event: MouseEvent | KeyboardEvent) => {
            event.preventDefault();
            if (htmlTag) {
                htmlTag.classList.add("modal-is-closing");
                setTimeout(() => {
                    setModalType("none");
                    htmlTag.classList.remove(
                        "modal-is-open",
                        "modal-is-closing"
                    );
                }, modalAnimationDuration);
            }
        },
        [htmlTag]
    );

    const handleChange = useCallback(
        (
            event:
                | ChangeEvent<HTMLInputElement>
                | ChangeEvent<HTMLSelectElement>
                | ChangeEvent<HTMLTextAreaElement>
        ) => {
            setModalData({
                ...modalData,
                [event.target.name]: event.target.value,
            });
        },
        [modalData]
    );

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (modalType === "none") return;
            if (event.key === "Escape") {
                handleClose(event);
            }
        };
        window.addEventListener("keydown", handleEscape);
        return () => {
            window.removeEventListener("keydown", handleEscape);
        };
    }, [modalType, handleClose]);

    return (
        <ModalContext.Provider
            value={{
                modalType,
                modalData,
                handleOpen,
                handleClose,
                handleChange,
            }}
        >
            {children}
        </ModalContext.Provider>
    );
};

export { ModalProvider, useModal };
