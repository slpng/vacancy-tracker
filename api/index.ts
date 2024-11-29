import Koa from "koa";
import Router from "koa-router";
import { bodyParser } from "@koa/bodyparser";

import { VacancyRepositoryInMemory } from "@vacancy-tracker/core/infrastructure/vacancy.repository.in-memory";
import { getAllVacanciesController } from "@vacancy-tracker/core/interface-adapters/controllers/vacancy/get-all-vacancies.controller";
import { createVacancyController } from "@vacancy-tracker/core/interface-adapters/controllers/vacancy/create-vacancy.controller";
import {
    InputParseError,
    NotFoundError,
} from "@vacancy-tracker/core/entities/errors/common";
import { editVacancyController } from "@vacancy-tracker/core/interface-adapters/controllers/vacancy/edit-vacancy.controller";
import { removeVacancyController } from "@vacancy-tracker/core/interface-adapters/controllers/vacancy/remove-vacancy.controller";
import { getVacancyController } from "@vacancy-tracker/core/interface-adapters/controllers/vacancy/get-vacancy.controller";

const repository = VacancyRepositoryInMemory();

const app = new Koa();
const router = new Router();

router.get("/vacancies", async (ctx) => {
    const controller = getAllVacanciesController(repository);
    const vacancies = await controller();
    ctx.body = vacancies;
});

router.get("/vacancies/:id", async (ctx) => {
    const controller = getVacancyController(repository);
    try {
        const vacancy = await controller({ id: ctx.params.id });
        ctx.body = vacancy;
    } catch (e) {
        if (e instanceof NotFoundError) {
            ctx.body = { message: e.message, cause: e.cause };
            return (ctx.status = 404);
        }
        ctx.body = "Unexpected error occured while getting vacancy";
        ctx.status = 500;
    }
});

router.post("/vacancies", async (ctx) => {
    const controller = createVacancyController(repository);
    try {
        const created = await controller(ctx.request.body);
        ctx.body = created;
    } catch (e) {
        if (e instanceof InputParseError) {
            ctx.body = { message: e.message, cause: e.cause };
            return (ctx.status = 400);
        }
        ctx.body = "Unexpected error occured while creating new vacancy";
        ctx.status = 500;
    }
});

router.patch("/vacancies/:id", async (ctx) => {
    const controller = editVacancyController(repository);
    try {
        const updated = await controller({
            id: ctx.params.id,
            ...ctx.request.body,
        });
        ctx.body = updated;
    } catch (e) {
        if (e instanceof InputParseError) {
            ctx.body = { message: e.message, cause: e.cause };
            return (ctx.status = 400);
        }
        if (e instanceof NotFoundError) {
            ctx.body = { message: e.message, cause: e.cause };
            return (ctx.status = 404);
        }
        ctx.body = "Unexpected error occured while editing vacancy";
        ctx.status = 500;
    }
});

router.delete("/vacancies/:id", async (ctx) => {
    const controller = removeVacancyController(repository);
    try {
        await controller({ id: ctx.params.id });
        ctx.status = 200;
    } catch (e) {
        if (e instanceof NotFoundError) {
            ctx.body = { message: e.message, cause: e.cause };
            return (ctx.status = 404);
        }
        ctx.body = "Unexpected error occured while deleting vacancy";
        ctx.status = 500;
    }
});

app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

const port = 3001;
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});
