"use server";

import { revalidatePath } from "next/cache";

export const removeVacancy = async (formData: FormData) => {
    const id = formData.get("id");
    if (typeof id !== "string") {
    }

    const response = await fetch(`http://localhost:3001/vacancies/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
    }

    revalidatePath("/", "page");
};
