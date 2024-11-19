import { VacancyService } from "@/domain/VacancyService";
import { VacancyInMemoryClient } from "@/infra/VacancyInMemoryClient";
import { beforeEach, expect, test } from "@jest/globals";

let vacancyService: ReturnType<typeof VacancyService>;

beforeEach(() => {
    vacancyService = VacancyService(VacancyInMemoryClient());
});

test("create vacancy", async () => {
    const formData = new FormData();
    formData.append("company", "Blizzard Entertainment");
    formData.append("position", "Junior++ (20 years exp) Developer");
    formData.append("minSalary", "8000");
    formData.append("maxSalary", "10000");
    formData.append("status", "Rejected");
    formData.append("note", "smol indie company");

    await expect(
        vacancyService.createVacancy({ message: "" }, formData)
    ).resolves.toStrictEqual({
        message:
            "Created vacancy 'Junior++ (20 years exp) Developer' at 'Blizzard Entertainment'",
    });
});
