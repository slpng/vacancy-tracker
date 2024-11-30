import Koa from "koa";
import { bodyParser } from "@koa/bodyparser";

import { VacancyRepositoryInMemory } from "@vacancy-tracker/core/infrastructure/vacancy.repository.in-memory";
import { VacancyRepositoryMongoDB } from "@vacancy-tracker/core/infrastructure/vacancy.repository.mongodb";
import { createRouter } from "@vacancy-tracker/api/routes";

const main = async () => {
    const repository = await VacancyRepositoryMongoDB();
    const app = new Koa();
    const router = createRouter(repository);

    app.use(bodyParser());
    app.use(router.routes()).use(router.allowedMethods());

    const port = 3001;
    app.listen(port, () => {
        console.log(`Listening on http://localhost:${port}`);
    });
};

main();
