import SignedOutLayout from "../../components/Layouts/SignedOutLayout/SignedOutLayout";
import { useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import moment from "moment/moment";
import { AiFillEye } from "react-icons/ai";
import DocumentModal from "../../components/DocumentModal/DocumentModal";

const SignedOutTrackRequest = () => {
  const [search, setSearch] = useState("");
  const [document, setDocument] = useState(null);
  const [documentId, setDocumentId] = useState(null);
  const [author, setAuthor] = useState(null);
  const [isViewingDocument, setIsViewingDocument] = useState(null);

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
            <th scope="col">Document Type</th>
            <th scope="col">Status</th>
            <th scope="col">Claiming Date</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {document && documentId && author && (
            <tr>
              <td>{documentId}</td>
              <td>{document.documentType}</td>
              <td>{document.status}</td>
              <td>
                {document.claimingDate
                  ? moment(document.claimingDate?.toDate()).format(
                      "MMMM DD, YYYY"
                    )
                  : "---"}
              </td>
              <td>
                <button
                  className="btn btn-light"
                  onClick={() => setIsViewingDocument(document)}
                >
                  <AiFillEye />
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {isViewingDocument && (
        <DocumentModal
          request={isViewingDocument}
          isOpen={isViewingDocument ? true : false}
          onClose={() => setIsViewingDocument(null)}
        />
      )}
    </SignedOutLayout>
  );
};

export default SignedOutTrackRequest;
