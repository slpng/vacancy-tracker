import { VacancyService } from "@/domain/VacancyService";
import { VacancyInMemoryClient } from "@/infra/VacancyInMemoryClient";
import { beforeEach, expect, test } from "@jest/globals";

let vacancyService: ReturnType<typeof VacancyService>;

beforeEach(() => {
    vacancyService = VacancyService(VacancyInMemoryClient());
});

test("create vacancy with valid data", async () => {
    const formData = new FormData();
    formData.append("company", "Blizzard Entertainment");
    formData.append("position", "Junior++ (20 years exp) Developer");
    formData.append("minSalary", "8000");
    formData.append("maxSalary", "10000");
    formData.append("status", "rejected");
    formData.append("note", "smol indie company");

    await expect(
        vacancyService.createVacancy({ message: undefined }, formData)
    ).resolves.toStrictEqual({
        message:
            "Created vacancy 'Junior++ (20 years exp) Developer' at 'Blizzard Entertainment'",
    });
});

test("create vacancy with invalid company name", async () => {
    const formData = new FormData();
    formData.append("company", "");
    formData.append("position", "Junior++ (20 years exp) Developer");
    formData.append("minSalary", "8000");
    formData.append("maxSalary", "10000");
    formData.append("status", "rejected");
    formData.append("note", "smol indie company");

    await expect(
        vacancyService.createVacancy({ message: undefined }, formData)
    ).resolves.toStrictEqual({
        message: "Company name must be at least 1 character long",
    });
});

test("create vacancy with invalid position name", async () => {
    const formData = new FormData();
    formData.append("company", "Blizzard Entertainment");
    formData.append("position", "");
    formData.append("minSalary", "6000");
    formData.append("maxSalary", "10000");
    formData.append("status", "rejected");
    formData.append("note", "smol indie company");

    await expect(
        vacancyService.createVacancy({ message: undefined }, formData)
    ).resolves.toStrictEqual({
        message: "Position name must be at least 1 character long",
    });
});

test("create vacancy with empty salary field", async () => {
    const formData = new FormData();
    formData.append("company", "Blizzard Entertainment");
    formData.append("position", "Junior++ (20 years exp) Developer");
    formData.append("minSalary", "");
    formData.append("maxSalary", "10000");
    formData.append("status", "rejected");
    formData.append("note", "smol indie company");

    await expect(
        vacancyService.createVacancy({ message: undefined }, formData)
    ).resolves.toStrictEqual({
        message: "Invalid min salary",
    });
});

test("create vacancy with invalid salary field", async () => {
    const formData = new FormData();
    formData.append("company", "Blizzard Entertainment");
    formData.append("position", "Junior++ (20 years exp) Developer");
    formData.append("minSalary", "asdasdasd");
    formData.append("maxSalary", "10000");
    formData.append("status", "rejected");
    formData.append("note", "smol indie company");

    await expect(
        vacancyService.createVacancy({ message: undefined }, formData)
    ).resolves.toStrictEqual({
        message: "Invalid min salary",
    });
});

test("create vacancy with invalid status", async () => {
    const formData = new FormData();
    formData.append("company", "Blizzard Entertainment");
    formData.append("position", "Junior++ (20 years exp) Developer");
    formData.append("minSalary", "6000");
    formData.append("maxSalary", "10000");
    formData.append("status", "asdasd");
    formData.append("note", "smol indie company");

    await expect(
        vacancyService.createVacancy({ message: undefined }, formData)
    ).resolves.toStrictEqual({
        message: "Invalid status",
    });
});

test("create vacancy with missing form data", async () => {
    const formData = new FormData();
    formData.append("company", "Blizzard Entertainment");
    formData.append("position", "Junior++ (20 years exp) Developer");
    formData.append("minSalary", "6000");
    formData.append("maxSalary", "10000");
    formData.append("status", "rejected");

    await expect(
        vacancyService.createVacancy({ message: undefined }, formData)
    ).resolves.toStrictEqual({
        message: "Invalid note",
    });
});
