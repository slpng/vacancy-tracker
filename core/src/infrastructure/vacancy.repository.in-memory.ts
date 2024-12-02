import { IVacancyRepository } from "@vacancy-tracker/core/application/repositories/vacancy.repository.interface";
import { NotFoundError } from "@vacancy-tracker/core/entities/errors/common";
import {
    Vacancy,
    VacancyInsert,
} from "@vacancy-tracker/core/entities/models/vacancy";

export const VacancyRepositoryInMemory = (): IVacancyRepository => {
    const vacancies: Vacancy[] = [
        {
            id: "0",
            company: "Blizzard Entertainment",
            position: "CEO",
            minSalary: 50000,
            maxSalary: 100000,
            status: "PENDING",
            note: "easiest job offer in my life",
            created: new Date(Date.now()),
            modified: new Date(Date.now()),
        },
        {
            id: "1",
            company: "Google",
            position: "CEO",
            minSalary: 100000,
            maxSalary: 200000,
            status: "PENDING",
            note: "no way they hire me",
            created: new Date(Date.now()),
            modified: new Date(Date.now()),
        },
    ];

    let count = vacancies.length;

    return {
        createVacancy: async (vacancy: VacancyInsert) => {
            const created = {
                id: String(count++),
                ...vacancy,
                created: new Date(Date.now()),
                modified: new Date(Date.now()),
            };
            vacancies.push(created);
            return created;
        },
        removeVacancy: async (id: string) => {
            const index = vacancies.findIndex(
                (vacancy: Vacancy) => vacancy.id === id
            );
            if (index === -1) {
                throw new NotFoundError("Vacancy doesn't exist");
            }
            vacancies.splice(index, 1);
        },
        editVacancy: async (id: string, vacancy: VacancyInsert) => {
            const index = vacancies.findIndex(
                (vacancy: Vacancy) => vacancy.id === id
            );
            if (index === -1) {
                throw new NotFoundError("Vacancy doesn't exist");
            }

            const updated: Vacancy = {
                ...vacancies[index],
                ...vacancy,
                modified: new Date(Date.now()),
            };

            vacancies[index] = updated;
            return updated;
        },
        getVacancy: async (id: string) => {
            const found = vacancies.find((vacancy) => vacancy.id === id);
            if (!found) {
                throw new NotFoundError("Vacancy doesn't exist");
            }

            return found;
        },
        getAllVacancies: async () => vacancies,
    };
};
