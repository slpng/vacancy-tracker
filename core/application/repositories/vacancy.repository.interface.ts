import { Vacancy, VacancyInsert } from "~/core/entities/models/vacancy";

export interface IVacancyRepository {
    createVacancy: (vacancy: VacancyInsert) => Promise<Vacancy>;
    removeVacancy: (id: string) => Promise<void>;
    editVacancy: (id: string, vacancy: VacancyInsert) => Promise<Vacancy>;
    getVacancy: (id: string) => Promise<Vacancy>;
    getAllVacancies: () => Promise<Vacancy[]>;
}
