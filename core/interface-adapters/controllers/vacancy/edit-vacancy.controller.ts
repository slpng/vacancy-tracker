import { validateVacancyInsert } from "@/interface-adapters/utils";
import { IVacancyRepository } from "@vacancy-tracker/core/application/repositories/vacancy.repository.interface";
import { editVacancyUseCase } from "@vacancy-tracker/core/application/use-cases/vacancy/edit-vacancy.use-case";
import { vacancyPresenter } from "@vacancy-tracker/core/interface-adapters/presenters/vacancy";

export const editVacancyController = (repository: IVacancyRepository) => {
    const useCase = editVacancyUseCase(repository);

    return async (input: object) => {
        const { id, insertData } = validateVacancyInsert(input);

        const updated = await useCase(id, insertData);

        return vacancyPresenter(updated);
    };
};
