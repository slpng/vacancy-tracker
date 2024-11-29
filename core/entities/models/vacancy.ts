import { z } from "zod";

export const selectVacancySchema = z.object({
    id: z.string(),
    company: z.string().min(1),
    position: z.string().min(1),
    minSalary: z.coerce.number().positive(),
    maxSalary: z.coerce.number().positive(),
    status: z.enum(["PENDING", "INVITED", "REJECTED"]),
    note: z.string().max(255).optional(),
});

export type Vacancy = z.infer<typeof selectVacancySchema>;

export const insertVacancySchema = selectVacancySchema.omit({
    id: true,
});

export type VacancyInsert = z.infer<typeof insertVacancySchema>;
