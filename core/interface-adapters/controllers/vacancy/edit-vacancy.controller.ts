import { IVacancyRepository } from "@/application/repositories/vacancy.repository.interface";
import { editVacancyUseCase } from "@/application/use-cases/vacancy/edit-vacancy.use-case";
import { vacancyPresenter } from "@/interface-adapters/presenters/vacancy";
import { validateVacancyInsert } from "@/interface-adapters/utils";

export const editVacancyController = (repository: IVacancyRepository) => {
    const useCase = editVacancyUseCase(repository);

    return async (input: object) => {
        const { id, insertData } = validateVacancyInsert(input);

        const updated = await useCase(id, insertData);

        return vacancyPresenter(updated);
    };
};
