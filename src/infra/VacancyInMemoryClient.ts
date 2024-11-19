import { IVacancyApiClient, Vacancy } from "@/domain/IVacancyApiClient";

interface InMemoryVacancy {
    id: string;
    data: Vacancy;
}

export const VacancyInMemoryClient = (): IVacancyApiClient => {
    const vacancies: InMemoryVacancy[] = [];
    let count = 0;

    return {
        createVacancy: async (vacancy: Vacancy) => {
            vacancies.push({
                id: String(count++),
                data: vacancy,
            });
            return { success: true };
        },
        editVacancy: async (id: string, vacancy: Vacancy) => {
            const index = vacancies.findIndex(
                (vacancy: InMemoryVacancy) => vacancy.id === id
            );
            if (index === -1) {
                return { success: false };
            }

            vacancies[index] = {
                id,
                data: vacancy,
            };
            return { success: true };
        },
        removeVacancy: async (id: string) => {
            const index = vacancies.findIndex(
                (vacancy: InMemoryVacancy) => vacancy.id === id
            );
            if (index === -1) {
                return { success: false };
            }

            vacancies.splice(index, 1);

            return { success: true };
        },
        getVacancy: async (id: string) => {
            const found = vacancies.find((vacancy) => vacancy.id === id);
            if (!found) {
                return { success: false };
            }

            return {
                success: true,
                vacancy: found.data,
            };
        },
        getAllVacancies: async () => {
            return vacancies.map((inMemoryVacancy) => {
                // eslint-disable-next-line
                const { id, ...vacancy } = inMemoryVacancy;
                return vacancy.data;
            });
        },
    };
};
