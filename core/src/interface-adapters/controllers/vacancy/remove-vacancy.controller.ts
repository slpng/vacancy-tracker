import { IVacancyRepository } from "@vacancy-tracker/core/application/repositories/vacancy.repository.interface";
import { removeVacancyUseCase } from "@vacancy-tracker/core/application/use-cases/vacancy/remove-vacancy.use-case";
import { InputParseError } from "@vacancy-tracker/core/entities/errors/common";
import { parseControllerInput } from "@vacancy-tracker/core/interface-adapters/utils";
import { z } from "zod";

const inputSchema = z.object({
    id: z.string(),
});

export const removeVacancyController = (repository: IVacancyRepository) => {
    const useCase = removeVacancyUseCase(repository);

    return async (input: z.infer<typeof inputSchema>) => {
        const { id } = parseControllerInput(input, inputSchema);

        await useCase(id);
    };
};
