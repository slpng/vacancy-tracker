import Koa from "koa";
import { bodyParser } from "@koa/bodyparser";

import { createRouter } from "@vacancy-tracker/api/routes";
import "@vacancy-tracker/api/env";
import { VacancyRepositoryMongoDB } from "@vacancy-tracker/core";

const url = process.env.MONGO_URL;
const dbName = process.env.MONGO_DBNAME;
const collectionName = process.env.MONGO_COLLECTION;

if (
    typeof url !== "string" ||
    typeof dbName !== "string" ||
    typeof collectionName !== "string"
) {
    throw new Error("Insufficient environment variables");
}

const main = async () => {
    const repository = await VacancyRepositoryMongoDB({
        url,
        dbName,
        collectionName,
    });
    const app = new Koa();
    const router = createRouter(repository);

    app.use(bodyParser());
    app.use(router.routes()).use(router.allowedMethods());

    const port = 3001;
    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
};

main();
