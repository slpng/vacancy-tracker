"use server";

import { ModalType } from "@/app/_contexts/ModalContext";
import { revalidatePath } from "next/cache";

export type ActionState = { success: boolean; message: string };

export const createVacancy = async (
    prevState: ActionState,
    payload: { formData: FormData; modalType: ModalType }
): Promise<ActionState> => {
    const data = Object.fromEntries(payload.formData.entries());
    let request;

    if (payload.modalType === "create") {
        request = new Request("http://localhost:3001/vacancies", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
    } else if (payload.modalType === "edit") {
        request = new Request(`http://localhost:3001/vacancies/${data.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
    } else {
        return {
            success: false,
            message: "Invalid modal type",
        };
    }

    const res = await fetch(request);
    const json = await res.json();
    if (!res.ok) {
        return {
            success: false,
            message: JSON.stringify(
                {
                    message: json.message,
                    cause: json.cause,
                },
                null,
                2
            ),
        };
    }

    revalidatePath("/", "page");

    return {
        success: true,
        message: JSON.stringify(json),
    };
};
