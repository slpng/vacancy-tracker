"use client";

import { createVacancy } from "@/app/_actions/createVacancy";
import { useModal } from "@/app/_contexts/ModalContext";
import {
    FC,
    MouseEvent,
    MouseEventHandler,
    ReactNode,
    useActionState,
} from "react";
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

    const [actionState, formAction] = useActionState(createVacancy, {
        message: "",
    });

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
                <form action={formAction}>
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
                            Expected Salary
                            <div className="grid">
                                <input
                                    name="minSalary"
                                    placeholder="Min Salary"
                                />
                                <input
                                    name="maxSalary"
                                    placeholder="Max Salary"
                                />
                            </div>
                        </label>
                        <label>
                            Status
                            <select name="status" aria-label="Select" required>
                                <option value="pending">Pending</option>
                                <option value="invited">
                                    Interview invite
                                </option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </label>
                        <label>
                            Note
                            <textarea name="note" placeholder="Note"></textarea>
                        </label>
                    </fieldset>
                    <SubmitButton>Add</SubmitButton>
                    <small className="pico-color-red-500">
                        {actionState?.message}
                    </small>
                </form>
            </article>
        </dialog>
    );
}
