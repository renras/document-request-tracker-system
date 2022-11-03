import SignedOutLayout from "../../components/Layouts/SignedOutLayout/SignedOutLayout";
import { useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase-config";

const SignedOutTrackRequest = () => {
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
    <SignedOutLayout>
      <h1 className="h2 mt-5 text-light">Track a document</h1>
      <div className="d-flex gap-2 mt-5">
        <input
          type="text"
          className="form-control"
          style={{ maxWidth: "384px " }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn btn-light" onClick={() => handleTrackDocument()}>
          Track
        </button>
      </div>
      <table className="table mt-3 text-light">
        <thead>
          <tr>
            <th scope="col">Tracking ID</th>
            <th scope="col">Form Type</th>
            <th scope="col">Document Type</th>
            <th scope="col">Status</th>
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
              <td>{author.fullName}</td>
            </tr>
          )}
        </tbody>
      </table>
    </SignedOutLayout>
  );
};

export default SignedOutTrackRequest;
