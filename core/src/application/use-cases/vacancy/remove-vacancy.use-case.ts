import { IVacancyRepository } from "@vacancy-tracker/core/application/repositories/vacancy.repository.interface";

export const removeVacancyUseCase = (repository: IVacancyRepository) => {
    return async (id: string) => {
        await repository.removeVacancy(id);
    };
};
