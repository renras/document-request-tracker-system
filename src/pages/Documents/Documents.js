import SignedInLayout from "../../components/Layouts/SignedInLayout/SignedInLayout";
import CreateDocumentModal from "./CreateDocumentModal/CreateDocumentModal";
import { collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db, auth } from "../../firebase-config";
import { format } from "date-fns";
import { useAuthState } from "react-firebase-hooks/auth";
import Loader from "../../components/Loader/Loader";

const columns = ["Tracking ID", "Document Type", "Purpose"];

const Documents = () => {
  const [documentsData, documentsDataLoading, documentsDataError] =
    useCollection(collection(db, "documents"));
  const [userData, userDataLoading, userDataError] = useAuthState(auth);

  const loading = true;

  if (documentsDataLoading || userDataLoading || loading) return <Loader />;
  if (userDataError || documentsDataError)
    return <div>Failed to load page...</div>;

  const documents = documentsData.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    createdAt: format(doc.data().createdAt.toDate(), "MMMM dd, yyyy"),
  }));

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
            {documents.map((document) => {
              const { id, documentType, purpose } = document;

              return (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{documentType}</td>
                  <td>{purpose}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* modal */}
      {userData?.uid && <CreateDocumentModal userId={userData.uid} />}
    </SignedInLayout>
  );
};

export default Documents;
