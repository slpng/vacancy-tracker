import { IVacancyRepository } from "@/core/application/repositories/vacancy.repository.interface";

export const getVacancyUseCase = (repository: IVacancyRepository) => {
    return async (id: string) => {
        const vacancy = await repository.getVacancy(id);

        return vacancy;
    };
};
