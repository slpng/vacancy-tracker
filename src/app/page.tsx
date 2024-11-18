import Modal from "@/components/Modal";
import ModalButton from "@/components/ModalButton";
import { ModalProvider } from "@/contexts/ModalContext";

export default function Home() {
  return (
    <main className="container">
      <h1>Vacancy Tracker</h1>
      <ModalProvider>
        <ModalButton>Add</ModalButton>
        <Modal />
      </ModalProvider>
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
            <tr>
              <th>mock</th>
              <th>mock</th>
              <th>mock</th>
              <th>mock</th>
              <th>mock</th>
              <th>
                <a data-tooltip="Edit">✏️</a>
              </th>
            </tr>
            <tr>
              <th>mock</th>
              <th>mock</th>
              <th>mock</th>
              <th>mock</th>
              <th>mock</th>
              <th>✏️</th>
            </tr>
            <tr>
              <th>mock</th>
              <th>mock</th>
              <th>mock</th>
              <th>mock</th>
              <th>mock</th>
              <th>✏️</th>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}
