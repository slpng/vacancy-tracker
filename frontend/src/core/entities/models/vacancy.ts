import { z } from "zod";

export const selectVacancySchema = z.object({
    id: z.string(),
    company: z.string(),
    position: z.string(),
    minSalary: z.coerce.number(),
    maxSalary: z.coerce.number(),
    status: z.string(),
    note: z.string(),
});

export type Vacancy = z.infer<typeof selectVacancySchema>;

export const insertVacancySchema = selectVacancySchema.omit({
    id: true,
});

export type VacancyInsert = z.infer<typeof insertVacancySchema>;
