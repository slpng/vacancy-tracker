import { IVacancyRepository } from "@/application/repositories/vacancy.repository.interface";
import { VacancyInsert } from "@/entities/models/vacancy";

export const createVacancyUseCase = (repository: IVacancyRepository) => {
    return async (insertVacancy: VacancyInsert) => {
        const created = await repository.createVacancy(insertVacancy);

        return created;
    };
};
