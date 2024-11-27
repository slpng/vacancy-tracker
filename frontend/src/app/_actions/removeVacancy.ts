"use server";

import { repository } from "@/app/_repository";
import { removeVacancyController } from "@vacancy-tracker/core/interface-adapters/controllers/vacancy/remove-vacancy.controller";
import { revalidatePath } from "next/cache";

const controller = removeVacancyController(repository);

export const removeVacancy = async (formData: FormData) => {
    const data = Object.fromEntries(formData.entries());

    try {
        await controller(data);
        revalidatePath("/", "page");
    } catch {}
};
