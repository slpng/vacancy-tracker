import { IVacancyRepository } from "@vacancy-tracker/core/application/repositories/vacancy.repository.interface";
import { VacancyInsert } from "@vacancy-tracker/core/entities/models/vacancy";

export const createVacancyUseCase = (repository: IVacancyRepository) => {
    return async (insertVacancy: VacancyInsert) => {
        const created = await repository.createVacancy(insertVacancy);

        return created;
    };
};
