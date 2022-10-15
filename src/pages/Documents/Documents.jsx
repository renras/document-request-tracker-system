import SignedInLayout from "../../components/Layouts/SignedInLayout/SignedInLayout";
import CreateDocumentModal from "./CreateDocumentModal/CreateDocumentModal";

const documents = [
  {
    id: "1143-1145-1482",
    title: "Request for Diploma",
    type: "Diploma with EDUFIED NEW RATE",
    dateCreated: "January 7, 1996",
    status: "INCOMING",
  },
];

const columns = ["Tracking Number", "Document", "Type", "Date Created"];

const Documents = () => {
  return (
    <SignedInLayout>
      <div className="px-5">
        <h1 className="h2">Documents</h1>

        <div className="d-flex">
          <button
            className="btn btn-dark mt-5 ms-auto"
            data-bs-toggle="modal"
            data-bs-target="#create-document-modal"
          >
            Create a Document
          </button>
        </div>
        <table className="table mt-3">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th scope="col" key={index}>
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {documents.map((document) => {
              const { id, title, type, dateCreated } = document;

              return (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{title}</td>
                  <td>{type}</td>
                  <td>{dateCreated}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* modal */}
      <CreateDocumentModal />
    </SignedInLayout>
  );
};

export default Documents;
