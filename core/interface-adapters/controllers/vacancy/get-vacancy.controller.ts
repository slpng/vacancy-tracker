import { IVacancyRepository } from "@/application/repositories/vacancy.repository.interface";
import { getVacancyUseCase } from "@/application/use-cases/vacancy/get-vacancy.use-case";
import { vacancyPresenter } from "@/interface-adapters/presenters/vacancy";

export const getVacancyController = (repository: IVacancyRepository) => {
    const useCase = getVacancyUseCase(repository);

    return async (id: string) => {
        const vacancy = await useCase(id);

        return vacancyPresenter(vacancy);
    };
};
