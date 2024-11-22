import { z } from "zod";

import { IVacancyRepository } from "@/core/application/repositories/vacancy.repository.interface";
import { createVacancyUseCase } from "@/core/application/use-cases/vacancy/create-vacancy.use-case";
import { insertVacancySchema } from "@/core/entities/models/vacancy";
import { InputParseError } from "@/core/entities/errors/common";
import { vacancyPresenter } from "@/core/interface-adapters/presenters/vacancy";

const inputSchema = z.object({
    company: z.string().min(1),
    position: z.string().min(1),
    minSalary: z.string().min(1),
    maxSalary: z.string().min(1),
    status: z.string().min(1),
    note: z.string(),
});

export const createVacancyController = (repository: IVacancyRepository) => {
    const useCase = createVacancyUseCase(repository);

    return async (input: object) => {
        const { data: inputData, error: inputError } =
            inputSchema.safeParse(input);

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

        const created = await useCase(insertData);

        return vacancyPresenter(created);
    };
};
