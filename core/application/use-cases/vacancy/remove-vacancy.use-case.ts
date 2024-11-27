import { IVacancyRepository } from "@/application/repositories/vacancy.repository.interface";

export const removeVacancyUseCase = (repository: IVacancyRepository) => {
    return async (id: string) => {
        await repository.removeVacancy(id);
    };
};
