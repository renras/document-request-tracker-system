import SignedInLayout from "../../components/Layouts/SignedInLayout/SignedInLayout";

const Documents = () => {
  return (
    <SignedInLayout>
      <div className="px-5">
        <h1 className="h2">Documents</h1>

        <div className="d-flex">
          <button className="btn btn-dark mt-5 ms-auto">
            Create a Document
          </button>
        </div>
        <table className="table mt-3">
          <thead>
            <tr>
              <th scope="col">Tracking number</th>
              <th scope="col">Document</th>
              <th scope="col">Type</th>
              <th scope="col">Date Created</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1143-1145-1482</td>
              <td>Request for Diploma</td>
              <td>Diploma with EDUFIED NEW RATE</td>
              <td>January 7, 1996</td>
            </tr>
          </tbody>
        </table>
      </div>
    </SignedInLayout>
  );
};

export default Documents;
