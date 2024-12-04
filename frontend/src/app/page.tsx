import { removeVacancy } from "@/app/_actions/removeVacancy";
import Modal from "@/app/_components/Modal";
import ModalButton from "@/app/_components/ModalButton";
import { ModalProvider } from "@/app/_contexts/ModalContext";
import { API_URL } from "@/env";

const getAllVacancies = async (): Promise<
    {
        id: string;
        company: string;
        position: string;
        minSalary: string;
        maxSalary: string;
        status: "REJECTED" | "INVITED" | "PENDING";
        note: string;
    }[]
> => {
    const res = await fetch(`${API_URL}/vacancies`);
    if (!res.ok) {
        return [];
    }
    return await res.json();
};

export default async function Home() {
    const vacancies = await getAllVacancies();

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
                                <th colSpan={2}>Actions</th>
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
                                                    id,
                                                    company,
                                                    position,
                                                    minSalary,
                                                    maxSalary,
                                                    status,
                                                    note,
                                                }}
                                                className="outline"
                                                data-tooltip="Edit vacancy"
                                                style={{
                                                    padding: 0,
                                                    border: "none",
                                                }}
                                            >
                                                ✏️
                                            </ModalButton>
                                        </th>
                                        <th>
                                            <form action={removeVacancy}>
                                                <input
                                                    type="text"
                                                    style={{
                                                        display: "none",
                                                    }}
                                                    name="id"
                                                    defaultValue={id}
                                                />
                                                <button
                                                    data-tooltip="Remove vacancy"
                                                    className="outline"
                                                    style={{
                                                        padding: 0,
                                                        border: "none",
                                                    }}
                                                >
                                                    🗑️
                                                </button>
                                            </form>
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
