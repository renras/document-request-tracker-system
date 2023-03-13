import SignedInLayout from "../../components/Layouts/SignedInLayout/SignedInLayout";
import { useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import moment from "moment/moment";
import { AiFillEye } from "react-icons/ai";
import DocumentModal from "../../components/DocumentModal/DocumentModal";

const TrackDocument = () => {
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
        <table
          className="table mt-3 "
          style={{ fontFamily: "Roboto, sans-serif" }}
        >
          <thead>
            <tr className="table-success">
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
      </div>
      {isViewingDocument && (
        <DocumentModal
          request={isViewingDocument}
          isOpen={isViewingDocument ? true : false}
          onClose={() => setIsViewingDocument(null)}
        />
      )}
    </SignedInLayout>
  );
};

export default TrackDocument;
