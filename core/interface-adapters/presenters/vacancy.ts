import { Vacancy } from "@/entities/models/vacancy";

export const vacancyPresenter = (vacancy: Vacancy) => {
    return {
        id: vacancy.id,
        company: vacancy.company,
        position: vacancy.position,
        minSalary: String(vacancy.minSalary),
        maxSalary: String(vacancy.maxSalary),
        status: vacancy.status,
        note: vacancy.note || "",
    };
};
