import { IVacancyRepository } from "@vacancy-tracker/core/application/repositories/vacancy.repository.interface";
import {
    InputParseError,
    NotFoundError,
} from "@vacancy-tracker/core/entities/errors/common";
import {
    selectVacancySchema,
    VacancyInsert,
} from "@vacancy-tracker/core/entities/models/vacancy";
import { MongoClient, ObjectId } from "mongodb";
import { z } from "zod";

const schema = z
    .object({
        _id: z.instanceof(ObjectId),
    })
    .merge(selectVacancySchema.omit({ id: true }));

type Schema = z.infer<typeof schema>;

export const VacancyRepositoryMongoDB = async ({
    url,
    dbName,
    collectionName,
}: {
    url: string;
    dbName: string;
    collectionName: string;
}): Promise<IVacancyRepository> => {
    const client = new MongoClient(url);
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection<Schema>(collectionName);

    return {
        createVacancy: async (vacancy: VacancyInsert) => {
            const _id = new ObjectId();
            const created = _id.getTimestamp();

            const { data, error } = schema.safeParse({
                ...vacancy,
                created,
                modified: created,
                _id,
            });
            if (error) {
                throw new InputParseError("Invalid database input");
            }

            const { insertedId } = await collection.insertOne(data);

            const { _id: _, ...inserted } = data;
            return {
                ...inserted,
                id: insertedId.toString(),
            };
        },
        removeVacancy: async (id: string) => {
            const { acknowledged } = await collection.deleteOne({
                _id: new ObjectId(id),
            });
            if (!acknowledged) {
                throw new NotFoundError("Vacancy doesn't exist");
            }
        },
        editVacancy: async (id: string, vacancy: VacancyInsert) => {
            const { data } = schema.partial().safeParse(vacancy);

            // returns document before edit
            const result = await collection.findOneAndUpdate(
                { _id: new ObjectId(id) },
                {
                    $set: data,
                    $currentDate: {
                        modified: true,
                    },
                }
            );
            if (!result) {
                throw new NotFoundError("Vacancy doesn't exist");
            }

            const { _id, ...inserted } = result;
            return {
                ...inserted,
                id: _id.toString(),
            };
        },
        getVacancy: async (id: string) => {
            const document = await collection.findOne({
                _id: new ObjectId(id),
            });
            if (!document) {
                throw new NotFoundError("Vacancy doesn't exist");
            }

            const { _id, ...found } = document;
            return {
                ...found,
                id: _id.toString(),
            };
        },
        getAllVacancies: async () => {
            const cursor = collection.find({});
            const vacancies = await cursor.toArray();

            return vacancies.map(({ _id, ...vacancy }) => ({
                ...vacancy,
                id: _id.toString(),
            }));
        },
    };
};
