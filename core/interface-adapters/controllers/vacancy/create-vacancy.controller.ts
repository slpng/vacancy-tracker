import { IVacancyRepository } from "@/application/repositories/vacancy.repository.interface";
import { createVacancyUseCase } from "@/application/use-cases/vacancy/create-vacancy.use-case";
import { vacancyPresenter } from "@/interface-adapters/presenters/vacancy";
import { validateVacancyInsert } from "@/interface-adapters/utils";

export const createVacancyController = (repository: IVacancyRepository) => {
    const useCase = createVacancyUseCase(repository);

    return async (input: object) => {
        const { insertData } = validateVacancyInsert(input);

        const created = await useCase(insertData);

        return vacancyPresenter(created);
    };
};
