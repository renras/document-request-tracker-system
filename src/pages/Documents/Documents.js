import SignedInLayout from "../../components/Layouts/SignedInLayout/SignedInLayout";
import CreateDocumentModal from "./CreateDocumentModal/CreateDocumentModal";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../../firebase-config";
import { format } from "date-fns";
import { useAuthState } from "react-firebase-hooks/auth";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
import { AiFillEye } from "react-icons/ai";
import DocumentModal from "../../components/DocumentModal/DocumentModal";
import { useEffect, useState } from "react";

const columns = ["Tracking ID", "Document Type", "Purpose", "Action"];

const Documents = () => {
  const [user, userLoading, userError] = useAuthState(auth);
  const [documentsDataLoading, setDocumentsDataLoading] = useState(true);
  const [documentsDataError, setDocumentsDataError] = useState(null);
  const [documentsData, setDocumentsData] = useState([]);

  useEffect(() => {
    if (!user?.uid) return;

    (async () => {
      try {
        const documentsRef = collection(db, "documents");
        const q = query(documentsRef, where("authorId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const documents = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          createdAt: format(doc.data().createdAt.toDate(), "MMMM dd, yyyy"),
        }));
        setDocumentsData(documents);
      } catch (e) {
        console.error(e);
        setDocumentsDataError("Failed to fetch documents");
      } finally {
        setDocumentsDataLoading(false);
      }
    })();
  }, [user?.uid]);

  if (documentsDataLoading || userLoading) return <Loader />;
  if (userError || documentsDataError) return <Error />;

  return (
    <SignedInLayout>
      <div className="px-5">
        <h1 className="h2">Documents</h1>
        <div className="d-flex">
          <button
            className="btn btn-success mt-5 ms-auto"
            data-bs-toggle="modal"
            data-bs-target="#create-document-modal"
          >
            Create a Request
          </button>
        </div>
        <table className="table mt-3">
          <thead>
            <tr className="table-success">
              {columns.map((column, index) => (
                <th scope="col" key={index}>
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {documentsData.map((document) => {
              const { id, documentType, purpose } = document;

              return (
                <tr key={id}>
                  <td className="align-middle">{id}</td>
                  <td className="align-middle">{documentType}</td>
                  <td className="align-middle">{purpose}</td>
                  <td className="align-middle">
                    <button
                      className="btn btn-light"
                      data-bs-toggle="modal"
                      data-bs-target="#view-document-modal"
                    >
                      <AiFillEye />
                    </button>
                    <DocumentModal request={document} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* create document modal */}
      {user?.uid && <CreateDocumentModal userId={user.uid} />}
    </SignedInLayout>
  );
};

export default Documents;
