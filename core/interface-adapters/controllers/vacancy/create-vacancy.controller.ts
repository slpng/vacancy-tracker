import { IVacancyRepository } from "@vacancy-tracker/core/application/repositories/vacancy.repository.interface";
import { createVacancyUseCase } from "@vacancy-tracker/core/application/use-cases/vacancy/create-vacancy.use-case";
import {
    insertVacancySchema,
    VacancyInsert,
} from "@vacancy-tracker/core/entities/models/vacancy";
import { vacancyPresenter } from "@vacancy-tracker/core/interface-adapters/presenters/vacancy";
import { parseControllerInput } from "@vacancy-tracker/core/interface-adapters/utils";

export const createVacancyController = (repository: IVacancyRepository) => {
    const useCase = createVacancyUseCase(repository);

    return async (input: VacancyInsert) => {
        const parsed = parseControllerInput<typeof insertVacancySchema>(
            input,
            insertVacancySchema
        );

        const created = await useCase(parsed);

        return vacancyPresenter(created);
    };
};
