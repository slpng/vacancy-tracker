export interface Vacancy {
    company: string;
    position: string;
    minSalary: number;
    maxSalary: number;
    status: string;
    note?: string;
}

interface Status {
    success: boolean;
}

export interface IVacancyApiClient {
    createVacancy: (vacancy: Vacancy) => Promise<Status>;
    removeVacancy: (id: string) => Promise<Status>;
    editVacancy: (id: string, vacancy: Vacancy) => Promise<Status>;
    getVacancy: (id: string) => Promise<Status & { vacancy?: Vacancy }>;
    getAllVacancies: () => Promise<Vacancy[]>;
}
