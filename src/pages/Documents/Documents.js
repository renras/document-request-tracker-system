import SignedInLayout from "../../components/Layouts/SignedInLayout/SignedInLayout";
import CreateDocumentModal from "./CreateDocumentModal/CreateDocumentModal";
import useFetchUserDocuments from "../../hooks/useFetchUserDocuments";
import { auth } from "../../firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
import { AiFillEye } from "react-icons/ai";
import DocumentModal from "../../components/DocumentModal/DocumentModal";
const columns = ["Tracking ID", "Document Type", "Purpose", "Action"];
import useFetchProfile from "../../hooks/useFetchProfile";
import { useState } from "react";

const Documents = () => {
  const [user, userLoading, userError] = useAuthState(auth);
  const [isViewingDocument, setIsViewingDocument] = useState(null);

  const {
    data: documentsData,
    loading: documentsDataLoading,
    error: documentsDataError,
  } = useFetchUserDocuments(user ? user : null);
  const {
    data: profile,
    loading: profileLoading,
    error: profileError,
  } = useFetchProfile(user ? user : null);

  if (documentsDataLoading || userLoading || profileLoading) return <Loader />;
  if (userError || documentsDataError || profileError) return <Error />;

  return (
    <SignedInLayout>
      <div className="px-5">
        <h1 className="h2">Request Documents</h1>
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
            {documentsData?.map((document) => {
              const { id, documentType, purpose } = document;

              return (
                <tr key={id}>
                  <td className="align-middle">{id}</td>
                  <td className="align-middle">{documentType}</td>
                  <td className="align-middle">{purpose}</td>
                  <td className="align-middle">
                    <button
                      className="btn btn-light"
                      onClick={() => setIsViewingDocument(document)}
                    >
                      <AiFillEye />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* create document modal */}
      {profile && (
        <CreateDocumentModal profile={{ ...profile, id: user.uid }} />
      )}
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

export default Documents;
