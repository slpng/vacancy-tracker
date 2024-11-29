import { IVacancyRepository } from "@vacancy-tracker/core/application/repositories/vacancy.repository.interface";
import { editVacancyUseCase } from "@vacancy-tracker/core/application/use-cases/vacancy/edit-vacancy.use-case";
import { insertVacancySchema } from "@vacancy-tracker/core/entities/models/vacancy";
import { vacancyPresenter } from "@vacancy-tracker/core/interface-adapters/presenters/vacancy";
import { parseControllerInput } from "@vacancy-tracker/core/interface-adapters/utils";
import { z } from "zod";

const inputSchema = z.object({ id: z.string() }).merge(insertVacancySchema);

export const editVacancyController = (repository: IVacancyRepository) => {
    const useCase = editVacancyUseCase(repository);

    return async (input: z.infer<typeof inputSchema>) => {
        const { id, ...parsed } = parseControllerInput<typeof inputSchema>(
            input,
            inputSchema
        );

        const updated = await useCase(id, parsed);

        return vacancyPresenter(updated);
    };
};
