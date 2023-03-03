import SignedInLayout from "../../components/Layouts/SignedInLayout/SignedInLayout";
import AdminDocumentsTable from "../../components/AdminDocumentsTable/AdminDocumentsTable";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
import useFetchDocuments from "../../hooks/useFetchDocuments";
import { auth } from "../../firebase-config";
import updateRequestType from "../../services/updateRequestType";
import { useAuthState } from "react-firebase-hooks/auth";

const OnProcess = () => {
  const {
    data: incomingDocuments,
    loading,
    error,
  } = useFetchDocuments("ON PROCESS");
  const [user, userLoading, userError] = useAuthState(auth);

  if (loading || userLoading) return <Loader />;
  if (error || userError) return <Error />;

  const handleAcceptDocument = async (id, recipientId) => {
    try {
      await updateRequestType(
        id,
        "FOR RELEASE",
        user.uid,
        recipientId,
        "has accepted your request"
      );
    } catch (e) {
      console.error(e);
      alert("Failed to update document status. Please try again later.");
    }
  };

  const handleRejectDocument = async (id, recipientId) => {
    try {
      await updateRequestType(
        id,
        "FOR RELEASE",
        user.uid,
        recipientId,
        "has rejected your request"
      );
    } catch (e) {
      console.error(e);
      alert("Failed to update document status. Please try again later.");
    }
  };

  return (
    <SignedInLayout>
      <div className="px-4">
        <h1 className="h2">On Process</h1>
        <AdminDocumentsTable
          documents={incomingDocuments}
          onAccept={(id, recipientId) => handleAcceptDocument(id, recipientId)}
          onReject={(id, recipientId) => handleRejectDocument(id, recipientId)}
          statusName="For Release"
        />
      </div>
    </SignedInLayout>
  );
};

export default OnProcess;
