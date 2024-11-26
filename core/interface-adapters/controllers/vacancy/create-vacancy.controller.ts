import { IVacancyRepository } from "~/core/application/repositories/vacancy.repository.interface";
import { createVacancyUseCase } from "~/core/application/use-cases/vacancy/create-vacancy.use-case";
import { vacancyPresenter } from "~/core/interface-adapters/presenters/vacancy";
import { validateVacancyInsert } from "~/core/interface-adapters/utils";

export const createVacancyController = (repository: IVacancyRepository) => {
    const useCase = createVacancyUseCase(repository);

    return async (input: object) => {
        const { insertData } = validateVacancyInsert(input);

        const created = await useCase(insertData);

        return vacancyPresenter(created);
    };
};
