import { IVacancyRepository } from "@/core/application/repositories/vacancy.repository.interface";
import { VacancyInsert } from "@/core/entities/models/vacancy";

export const createVacancyUseCase = (repository: IVacancyRepository) => {
    return async (insertVacancy: VacancyInsert) => {
        const vacancy = await repository.createVacancy(insertVacancy);

        return vacancy;
    };
};
