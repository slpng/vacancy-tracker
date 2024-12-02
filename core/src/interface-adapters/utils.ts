import { InputParseError } from "@vacancy-tracker/core/entities/errors/common";
import { z, ZodObject, ZodRawShape } from "zod";

export const parseControllerInput = <T extends ZodObject<ZodRawShape>>(
    input: unknown,
    inputSchema: T
): z.infer<T> => {
    const { data, error } = inputSchema.safeParse(input);

    if (error) {
        throw new InputParseError("Invalid controller input", {
            cause: error,
        });
    }

    return data;
};
