import SignedInLayout from "../../components/Layouts/SignedInLayout/SignedInLayout";
import { DOCUMENT_TYPES } from "../Documents/CreateDocumentModal/documentTypes";

const Reports = () => {
  const documentTypes = DOCUMENT_TYPES.filter(
    (document) => document.label !== "Choose document type"
  );
  return (
    <SignedInLayout>
      <div className="px-4">
        <h1 className="h2 mt-5">Reports</h1>
        <table className="table mt-5">
          <thead>
            <tr className="table-success">
              <th scope="col">Document Type</th>
              <th scope="col">No. of Requests</th>
              <th scope="col">No. of Completed</th>
            </tr>
          </thead>
          <tbody>
            {documentTypes.map((document) => (
              <tr key={document}>
                <td>{document.label}</td>
                <td>0</td>
                <td>0</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SignedInLayout>
  );
};

export default Reports;
