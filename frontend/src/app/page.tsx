import Modal from "@/app/_components/Modal";
import ModalButton from "@/app/_components/ModalButton";
import { ModalProvider } from "@/app/_contexts/ModalContext";
import { repository } from "@/app/_repository";
import { getAllVacanciesController } from "@/core/interface-adapters/controllers/vacancy/get-all-vacancies.controller";

const getAllVacancies = async () => {
    const controller = getAllVacanciesController(repository);

    const vacancies = await controller();

    return vacancies;
};

export default async function Home() {
    const vacancies = await getAllVacancies();
    console.log(vacancies);

    return (
        <main className="container">
            <h1>Vacancy Tracker</h1>
            <ModalProvider>
                <ModalButton modalType="create">Create vacancy</ModalButton>
                <Modal />
                <div className="overflow-auto">
                    <table className="striped">
                        <thead>
                            <tr>
                                <th>Company</th>
                                <th>Position</th>
                                <th>Salary</th>
                                <th>Status</th>
                                <th>Note</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {vacancies.map(
                                ({
                                    id,
                                    company,
                                    position,
                                    minSalary,
                                    maxSalary,
                                    status,
                                    note,
                                }) => (
                                    <tr key={id}>
                                        <th>{company}</th>
                                        <th>{position}</th>
                                        <th>{`${minSalary}-${maxSalary}`}</th>
                                        <th>{status}</th>
                                        <th>{note}</th>
                                        <th>
                                            <ModalButton
                                                modalType="edit"
                                                modalData={{
                                                    company,
                                                    position,
                                                    minSalary,
                                                    maxSalary,
                                                    status,
                                                    note,
                                                }}
                                            >
                                                ✏️
                                            </ModalButton>
                                        </th>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </div>
            </ModalProvider>
        </main>
    );
}
