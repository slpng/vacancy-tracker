"use client";

import React, { ButtonHTMLAttributes, FC, ReactNode } from "react";
import { ModalData, ModalType, useModal } from "@/app/_contexts/ModalContext";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    modalType: ModalType;
    modalData?: ModalData;
}

const ModalButton: FC<Props> = ({
    children,
    modalType,
    modalData,
    ...props
}) => {
    const { handleOpen } = useModal();

    return (
        <button onClick={handleOpen(modalType, modalData)} {...props}>
            {children}
        </button>
    );
};

export default ModalButton;
