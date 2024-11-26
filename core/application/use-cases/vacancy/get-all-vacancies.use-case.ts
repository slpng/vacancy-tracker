import { IVacancyRepository } from "~/core/application/repositories/vacancy.repository.interface";

export const getAllVacanciesUseCase = (repository: IVacancyRepository) => {
    return async () => {
        const vacancies = await repository.getAllVacancies();

        return vacancies;
    };
};
