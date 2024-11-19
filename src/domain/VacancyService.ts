import { IVacancyApiClient, Vacancy } from "@/domain/IVacancyApiClient";

const parseVacancy = (
    formData: FormData
): {
    message?: string;
    vacancy?: Vacancy;
} => {
    const company = formData.get("company")?.toString();
    const position = formData.get("position")?.toString();
    const minSalary = formData.get("minSalary")?.toString();
    const maxSalary = formData.get("maxSalary")?.toString();
    const status = formData.get("status")?.toString();
    const note = formData.get("note")?.toString();

    if (typeof company !== "string" || company.length < 1) {
        return {
            message: "Company name must be at least 1 character long",
        };
    }
    if (typeof position !== "string" || position.length < 1) {
        return {
            message: "Position name must be at least 1 character long",
        };
    }
    if (
        typeof minSalary !== "string" ||
        minSalary.length < 1 ||
        !/^\d+$/.test(minSalary)
    ) {
        return { message: "Invalid min salary" };
    }
    if (
        typeof maxSalary !== "string" ||
        maxSalary.length < 1 ||
        !/^\d+$/.test(maxSalary)
    ) {
        return { message: "Invalid max salary" };
    }
    if (
        typeof status !== "string" ||
        !["rejected", "pending", "invited"].includes(status)
    ) {
        return {
            message: "Invalid status",
        };
    }
    if (typeof note !== "string") {
        return { message: "Invalid note" };
    }

    return {
        vacancy: {
            company,
            position,
            minSalary: Number(minSalary),
            maxSalary: Number(maxSalary),
            status,
            note,
        },
    };
};

interface ActionState {
    message?: string;
}

export const VacancyService = (client: IVacancyApiClient) => {
    return {
        createVacancy: async (
            prevState: ActionState,
            formData: FormData
        ): Promise<ActionState> => {
            const parsed = parseVacancy(formData);
            const vacancy = parsed.vacancy;

            if (!vacancy) {
                return {
                    message: parsed.message,
                };
            }

            const responseStatus = await client.createVacancy(vacancy);
            if (!responseStatus.success) {
                return {
                    message: "Failed to create vacancy",
                };
            }

            return {
                message: `Created vacancy '${vacancy.position}' at '${vacancy.company}'`,
            };
        },
    };
};
