import SignedInLayout from "../../components/Layouts/SignedInLayout/SignedInLayout";
import { useState } from "react";
import { doc, getDoc, collection } from "firebase/firestore";
import { db, auth } from "../../firebase-config";
import moment from "moment/moment";
import { AiFillEye } from "react-icons/ai";
import DocumentModal from "../../components/DocumentModal/DocumentModal";
import { useCollection, useDocumentData } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";

const TrackDocument = () => {
  const [search, setSearch] = useState("");
  const [document, setDocument] = useState(null);
  const [documentId, setDocumentId] = useState(null);
  const [author, setAuthor] = useState(null);
  const [isViewingDocument, setIsViewingDocument] = useState(null);
  const [user, userLoading, userError] = useAuthState(auth);
  const [profile, profileLoading, profileError] = useDocumentData(
    user?.uid ? doc(db, "users", user.uid) : null
  );
  const [documents, documentsLoading, documentsError] = useCollection(
    profile?.role === "ADMIN" ? collection(db, "documents") : null
  );

  const handleTrackDocument = async () => {
    if (profile.role === "ADMIN") {
      return;
    }

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

  if (documentsLoading || userLoading || profileLoading) return <Loader />;
  if (documentsError || userError || profileError) return <Error />;

  const documentsData = documents?.docs
    .map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    })
    .filter((doc) => doc.id !== "data")
    .filter((doc) => {
      if (search) {
        return doc.id === search;
      }

      return doc;
    });

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
              <th scope="col">Fee</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {profile?.role !== "ADMIN" && document && documentId && author && (
              <tr>
                <td className="align-middle">{documentId}</td>
                <td className="align-middle">{document.documentType}</td>
                <td className="align-middle">{document.status}</td>
                <td className="align-middle">
                  {document.claimingDate
                    ? moment(document.claimingDate?.toDate()).format(
                        "MMMM DD, YYYY"
                      )
                    : "---"}
                </td>
                <td className="align-middle">{document.fee}</td>
                <td className="align-middle">
                  <button
                    className="btn btn-light"
                    onClick={() => setIsViewingDocument(document)}
                  >
                    <AiFillEye />
                  </button>
                </td>
              </tr>
            )}

            {profile?.role === "ADMIN" &&
              documentsData?.map((document) => (
                <tr key={document.id}>
                  <td className="align-middle">{document.id}</td>
                  <td className="align-middle">{document.documentType}</td>
                  <td className="align-middle">{document.status}</td>
                  <td className="align-middle">
                    {document.claimingDate
                      ? moment(document.claimingDate?.toDate()).format(
                          "MMMM DD, YYYY"
                        )
                      : "---"}
                  </td>
                  <td className="align-middle">{document.fee}</td>
                  <td className="align-middle">
                    <button
                      className="btn btn-light"
                      onClick={() => setIsViewingDocument(document)}
                    >
                      <AiFillEye />
                    </button>
                  </td>
                </tr>
              ))}
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
