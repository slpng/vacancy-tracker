import { IVacancyRepository } from "~/core/application/repositories/vacancy.repository.interface";
import { getVacancyUseCase } from "~/core/application/use-cases/vacancy/get-vacancy.use-case";
import { vacancyPresenter } from "~/core/interface-adapters/presenters/vacancy";

export const getVacancyController = (repository: IVacancyRepository) => {
    const useCase = getVacancyUseCase(repository);

    return async (id: string) => {
        const vacancy = await useCase(id);

        return vacancyPresenter(vacancy);
    };
};
