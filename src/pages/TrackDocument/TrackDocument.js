import SignedInLayout from "../../components/Layouts/SignedInLayout/SignedInLayout";
import { useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase-config";

const TrackDocument = () => {
  const [search, setSearch] = useState("");
  const [document, setDocument] = useState(null);
  const [documentId, setDocumentId] = useState(null);
  const [author, setAuthor] = useState(null);

  const handleTrackDocument = async () => {
    try {
      const docRef = doc(db, "documents", search);
      const docSnap = await getDoc(docRef);

      const userRef = doc(db, "users", docSnap.data().authorId);
      const userSnap = await getDoc(userRef);

      setDocument(docSnap.data());
      setDocumentId(docSnap.id);
      setAuthor(userSnap.data());
    } catch (error) {
      setDocument(null);
      setAuthor(null);
    }
  };

  return (
    <SignedInLayout>
      <div className="px-4">
        <h1 className="h2 mt-5">Track a document</h1>
        <div className="d-flex gap-3 mt-5">
          <input
            type="text"
            className="form-control"
            style={{ maxWidth: "384px " }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="btn btn-success"
            onClick={() => handleTrackDocument()}
          >
            Track
          </button>
        </div>
        <table className="table mt-3 ">
          <thead>
            <tr className="table-success">
              <th scope="col">Tracking ID</th>
              <th scope="col">Form Type</th>
              <th scope="col">Document Type</th>
              <th scope="col">Status</th>
              <th scope="col">Purpose</th>
              <th scope="col">Requested By</th>
            </tr>
          </thead>
          <tbody>
            {document && documentId && author && (
              <tr>
                <td>{documentId}</td>
                <td>{document.formType}</td>
                <td>{document.documentType}</td>
                <td>{document.status}</td>
                <td>{document.purpose}</td>
                <td>{author.fullName}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </SignedInLayout>
  );
};

export default TrackDocument;
