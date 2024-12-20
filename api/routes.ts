import {
    createVacancyController,
    editVacancyController,
    getAllVacanciesController,
    getVacancyController,
    InputParseError,
    IVacancyRepository,
    NotFoundError,
    removeVacancyController,
} from "@vacancy-tracker/core";
import Router from "koa-router";

export const createRouter = (repository: IVacancyRepository) => {
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

    return router;
};
