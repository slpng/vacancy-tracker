import { IVacancyRepository } from "~/core/application/repositories/vacancy.repository.interface";
import { getAllVacanciesUseCase } from "~/core/application/use-cases/vacancy/get-all-vacancies.use-case";
import { Vacancy } from "~/core/entities/models/vacancy";
import { vacancyPresenter } from "~/core/interface-adapters/presenters/vacancy";

const presenter = (vacancies: Vacancy[]) => {
    return vacancies.map((vacancy) => vacancyPresenter(vacancy));
};

export const getAllVacanciesController = (repository: IVacancyRepository) => {
    const useCase = getAllVacanciesUseCase(repository);

    return async () => {
        const vacancies = await useCase();

        return presenter(vacancies);
    };
};
