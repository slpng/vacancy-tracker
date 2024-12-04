"use server";

import { API_URL } from "@/env";
import { revalidatePath } from "next/cache";

export const removeVacancy = async (formData: FormData) => {
    const id = formData.get("id");

    await fetch(`${API_URL}/vacancies/${id}`, {
        method: "DELETE",
    });

    revalidatePath("/", "page");
};
