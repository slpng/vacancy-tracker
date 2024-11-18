"use client";

import { useModal } from "@/contexts/ModalContext";
import { MouseEvent, MouseEventHandler } from "react";

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
          <button aria-label="Close" rel="prev" onClick={handleClose}></button>
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
          <button type="submit">Add</button>
        </form>
      </article>
    </dialog>
  );
}
