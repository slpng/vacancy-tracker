"use client";

import React, { FC, ReactNode } from "react";
import { useModal } from "@/app/_contexts/ModalContext";

interface Props {
    children: ReactNode;
}

const ModalButton: FC<Props> = ({ children, ...props }) => {
    const { handleOpen } = useModal();

    return (
        <button onClick={handleOpen} {...props}>
            {children}
        </button>
    );
};

export default ModalButton;
