import { IVacancyRepository } from "~/core/application/repositories/vacancy.repository.interface";
import { NotFoundError } from "~/core/entities/errors/common";
import { Vacancy, VacancyInsert } from "~/core/entities/models/vacancy";

export const VacancyRepositoryInMemory = (): IVacancyRepository => {
    const vacancies: Vacancy[] = [
        {
            id: "0",
            company: "Blizzard Entertainment",
            position: "CEO",
            minSalary: 50000,
            maxSalary: 100000,
            status: "pending",
            note: "easiest job offer in my life",
        },
        {
            id: "1",
            company: "Google",
            position: "CEO",
            minSalary: 100000,
            maxSalary: 200000,
            status: "pending",
            note: "no way they hire me",
        },
    ];

    let count = vacancies.length;

    return {
        createVacancy: async (vacancy: VacancyInsert) => {
            const created = {
                id: String(count++),
                ...vacancy,
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

            const updated = {
                id,
                ...vacancy,
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
