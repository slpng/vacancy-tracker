import { InputParseError } from "~/core/entities/errors/common";
import {
    insertVacancySchema,
    VacancyInsert,
} from "~/core/entities/models/vacancy";
import { z } from "zod";

const inputSchema = z.object({
    id: z.string(),
    company: z.string().min(1),
    position: z.string().min(1),
    minSalary: z.string().min(1),
    maxSalary: z.string().min(1),
    status: z.string().min(1),
    note: z.string(),
});

export const validateVacancyInsert = (
    input: object
): { id: string; insertData: VacancyInsert } => {
    const { data: inputData, error: inputError } = inputSchema.safeParse(input);

    if (inputError) {
        throw new InputParseError("Invalid input data", {
            cause: inputError,
        });
    }

    const { data: insertData, error: insertError } =
        insertVacancySchema.safeParse(inputData);

    if (insertError) {
        throw new InputParseError("Invalid insert data", {
            cause: insertError,
        });
    }

    return { id: inputData.id, insertData };
};
