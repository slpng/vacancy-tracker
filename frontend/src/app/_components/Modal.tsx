"use client";

import { ActionState, createVacancy } from "@/app/_actions/createVacancy";
import { useModal } from "@/app/_contexts/ModalContext";
import { useDidUpdate } from "@/app/_hooks/useDidUpdate";
import {
    FC,
    MouseEvent,
    MouseEventHandler,
    ReactNode,
    useActionState,
    useState,
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
    const { modalType, modalData, handleChange, handleClose } = useModal();
    const handleClickOverlay: MouseEventHandler<HTMLDialogElement> = (
        event: MouseEvent<HTMLDialogElement>
    ) => {
        if (event.target === event.currentTarget && handleClose) {
            setMessage("");
            handleClose(event);
        }
    };

    const [message, setMessage] = useState<string>("");
    const [actionState, formAction] = useActionState<ActionState, FormData>(
        (prevState, formData: FormData) =>
            createVacancy(prevState, { modalType, formData }),
        { success: false, message: "" }
    );

    useDidUpdate(() => {
        if (actionState.success) {
            setMessage("");
            handleClose();
        } else {
            setMessage(actionState.message);
        }
    }, [actionState]);

    return (
        <dialog
            onClick={handleClickOverlay}
            open={modalType === "create" || modalType === "edit"}
        >
            <article>
                <header>
                    <button
                        aria-label="Close"
                        rel="prev"
                        onClick={(event: MouseEvent) => {
                            setMessage("");
                            handleClose(event);
                        }}
                    />
                    <p>
                        {modalType === "create" ? (
                            <strong>📝 Create vacancy</strong>
                        ) : modalType === "edit" ? (
                            <strong>✏️ Edit vacancy</strong>
                        ) : null}
                    </p>
                </header>
                <form action={formAction}>
                    <fieldset>
                        <label>
                            Company
                            <input
                                name="company"
                                placeholder="Company"
                                value={modalData.company}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Position
                            <input
                                name="position"
                                placeholder="Position"
                                value={modalData.position}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Expected Salary
                            <div className="grid">
                                <input
                                    name="minSalary"
                                    placeholder="Min Salary"
                                    value={modalData.minSalary}
                                    onChange={handleChange}
                                />
                                <input
                                    name="maxSalary"
                                    placeholder="Max Salary"
                                    value={modalData.maxSalary}
                                    onChange={handleChange}
                                />
                            </div>
                        </label>
                        <label>
                            Status
                            <select
                                name="status"
                                aria-label="Select"
                                value={modalData.status}
                                onChange={handleChange}
                                required
                            >
                                <option value="pending">Pending</option>
                                <option value="invited">
                                    Interview invite
                                </option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </label>
                        <label>
                            Note
                            <textarea
                                name="note"
                                placeholder="Note"
                                value={modalData.note}
                                onChange={handleChange}
                            ></textarea>
                        </label>
                    </fieldset>
                    <SubmitButton>
                        {modalType === "create"
                            ? "Create"
                            : modalType === "edit"
                            ? "Update"
                            : null}
                    </SubmitButton>
                    <input
                        type="text"
                        style={{
                            display: "none",
                        }}
                        name="id"
                        value={modalData.id}
                        readOnly
                    />
                    <small className="pico-color-red-500">{message}</small>
                </form>
            </article>
        </dialog>
    );
}
