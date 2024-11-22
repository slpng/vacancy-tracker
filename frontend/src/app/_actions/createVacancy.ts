import { repository } from "@/app/_repository";
import { InputParseError } from "@/core/entities/errors/common";
import { VacancyRepositoryInMemory } from "@/core/infrastructure/vacancy.repository.in-memory";
import { createVacancyController } from "@/core/interface-adapters/controllers/vacancy/create-vacancy.controller";

const controller = createVacancyController(repository);

export const createVacancy = async (
    prevState: { message: string },
    formData: FormData
) => {
    const data = Object.fromEntries(formData.entries());

    try {
        const created = await controller(data);

        return {
            message: JSON.stringify(created),
        };
    } catch (err) {
        if (err instanceof InputParseError) {
            return {
                message: JSON.stringify({
                    message: err.message,
                    cause: err.cause,
                }),
            };
        }
        return {
            message: "Unknown error",
        };
    }
};
