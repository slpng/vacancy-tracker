"use client";

import { useModal } from "@/contexts/ModalContext";
import { FC, MouseEvent, MouseEventHandler, ReactNode } from "react";
import { useFormStatus } from "react-dom";

interface SubmitButtonProps {
    children: ReactNode;
}

const SubmitButton: FC<SubmitButtonProps> = ({ children }) => {
    const { pending } = useFormStatus();

    return (
        <button type="submit" aria-busy={pending} disabled={pending}>
            {children}
        </button>
    );
};

export default function Modal() {
    const { modalIsOpen, handleClose } = useModal();

    const handleClickOverlay: MouseEventHandler<HTMLDialogElement> = (
        event: MouseEvent<HTMLDialogElement>
    ) => {
        if (event.target === event.currentTarget && handleClose) {
            handleClose(event);
        }
    };

    return (
        <dialog onClick={handleClickOverlay} open={modalIsOpen}>
            <article>
                <header>
                    <button
                        aria-label="Close"
                        rel="prev"
                        onClick={handleClose}
                    />
                    <p>
                        <strong>📝 Details</strong>
                    </p>
                </header>
                <form>
                    <fieldset>
                        <label>
                            Company
                            <input name="company" placeholder="Company" />
                        </label>
                        <label>
                            Position
                            <input name="position" placeholder="Position" />
                        </label>
                        <label>
                            Salary
                            <input type="range" />
                        </label>
                        <label>
                            Status
                            <select name="select" aria-label="Select" required>
                                <option>Pending</option>
                                <option>Interview invite</option>
                                <option>Rejected</option>
                            </select>
                        </label>
                        <label>
                            Note
                            <textarea name="bio" placeholder="Note"></textarea>
                        </label>
                    </fieldset>
                    <SubmitButton>Add</SubmitButton>
                </form>
            </article>
        </dialog>
    );
}
