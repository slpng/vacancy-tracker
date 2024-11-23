"use server";

import { ModalType } from "@/app/_contexts/ModalContext";
import { repository } from "@/app/_repository";
import { InputParseError } from "@/core/entities/errors/common";
import { createVacancyController } from "@/core/interface-adapters/controllers/vacancy/create-vacancy.controller";
import { editVacancyController } from "@/core/interface-adapters/controllers/vacancy/edit-vacancy.controller";
import { revalidatePath } from "next/cache";

export type ActionState = { success: boolean; message: string };

export const createVacancy = async (
    prevState: ActionState,
    payload: { formData: FormData; modalType: ModalType }
): Promise<ActionState> => {
    const data = Object.fromEntries(payload.formData.entries());
    let controller;

    if (payload.modalType === "create") {
        controller = createVacancyController(repository);
    } else if (payload.modalType === "edit") {
        controller = editVacancyController(repository);
    } else {
        return {
            success: false,
            message: "Invalid modal type",
        };
    }

    try {
        const created = await controller(data);

        revalidatePath("/", "page");

        return {
            success: true,
            message: JSON.stringify(created),
        };
    } catch (err) {
        if (err instanceof InputParseError) {
            return {
                success: false,
                message: JSON.stringify({
                    message: err.message,
                    cause: err.cause,
                }),
            };
        }
        return {
            success: false,
            message: "Unknown error",
        };
    }
};
