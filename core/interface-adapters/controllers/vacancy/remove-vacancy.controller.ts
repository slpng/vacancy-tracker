import { IVacancyRepository } from "@vacancy-tracker/core/application/repositories/vacancy.repository.interface";
import { removeVacancyUseCase } from "@vacancy-tracker/core/application/use-cases/vacancy/remove-vacancy.use-case";
import { InputParseError } from "@vacancy-tracker/core/entities/errors/common";
import { z } from "zod";

const inputSchema = z.object({
    id: z.string(),
});

export const removeVacancyController = (repository: IVacancyRepository) => {
    const useCase = removeVacancyUseCase(repository);

    return async (input: object) => {
        const { data: inputData, error: inputError } =
            inputSchema.safeParse(input);

        if (inputError) {
            throw new InputParseError("Invalid input data", {
                cause: inputError,
            });
        }

        await useCase(inputData.id);
    };
};
