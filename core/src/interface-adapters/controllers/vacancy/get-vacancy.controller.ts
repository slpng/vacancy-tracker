import { IVacancyRepository } from "@vacancy-tracker/core/application/repositories/vacancy.repository.interface";
import { getVacancyUseCase } from "@vacancy-tracker/core/application/use-cases/vacancy/get-vacancy.use-case";
import { vacancyPresenter } from "@vacancy-tracker/core/interface-adapters/presenters/vacancy";
import { parseControllerInput } from "@vacancy-tracker/core/interface-adapters/utils";
import { z } from "zod";

const inputSchema = z.object({
    id: z.string(),
});

export const getVacancyController = (repository: IVacancyRepository) => {
    const useCase = getVacancyUseCase(repository);

    return async (input: z.infer<typeof inputSchema>) => {
        const { id } = parseControllerInput<typeof inputSchema>(
            input,
            inputSchema
        );

        const vacancy = await useCase(id);

        return vacancyPresenter(vacancy);
    };
};
