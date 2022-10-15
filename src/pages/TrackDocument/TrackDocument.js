import SignedInLayout from "../../components/Layouts/SignedInLayout/SignedInLayout";

const TrackDocument = () => {
  return (
    <SignedInLayout>
      <div className="px-4">
        <h1 className="h2 mt-5">Track a document</h1>
        <div className="d-flex gap-2 mt-5">
          <input
            type="text"
            className="form-control"
            style={{ maxWidth: "384px " }}
          />
          <button className="btn btn-dark">Track</button>
        </div>
        <table className="table mt-3">
          <thead>
            <tr>
              <th scope="col">Tracking number</th>
              <th scope="col">Document</th>
              <th scope="col">Type</th>
              <th scope="col">Status</th>
              <th scope="col">Requested By</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1143-1145-1482</td>
              <td>Request for Diploma</td>
              <td>Diploma with EDUFIED NEW RATE</td>
              <td>Processing</td>
              <td>Nerd Onnasis</td>
            </tr>
          </tbody>
        </table>
      </div>
    </SignedInLayout>
  );
};

export default TrackDocument;
