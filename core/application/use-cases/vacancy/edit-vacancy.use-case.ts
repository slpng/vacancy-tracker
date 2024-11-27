import { IVacancyRepository } from "@/application/repositories/vacancy.repository.interface";
import { VacancyInsert } from "@/entities/models/vacancy";

export const editVacancyUseCase = (repository: IVacancyRepository) => {
    return async (id: string, vacancy: VacancyInsert) => {
        const updated = await repository.editVacancy(id, vacancy);

        return updated;
    };
};
