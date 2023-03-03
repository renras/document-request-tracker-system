import SignedInLayout from "../../components/Layouts/SignedInLayout/SignedInLayout";
import AdminDocumentsTable from "../../components/AdminDocumentsTable/AdminDocumentsTable";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
import useFetchDocuments from "../../hooks/useFetchDocuments";
import { auth } from "../../firebase-config";
import updateRequestType from "../../services/updateRequestType";
import { useAuthState } from "react-firebase-hooks/auth";

const ForRelease = () => {
  const {
    data: forReleaseDocuments,
    loading,
    error,
  } = useFetchDocuments("FOR RELEASE");
  const [user, userLoading, userError] = useAuthState(auth);

  if (loading || userLoading) return <Loader />;
  if (error || userError) return <Error />;

  const handleAcceptDocument = async (id, recipientId) => {
    try {
      await updateRequestType(
        id,
        "RELEASED",
        user.uid,
        recipientId,
        "has released your request"
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
        "RELEASED",
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
        <h1 className="h2">For Release</h1>
        <AdminDocumentsTable
          documents={forReleaseDocuments}
          onAccept={(id, recipientId) => handleAcceptDocument(id, recipientId)}
          onReject={(id, recipientId) => handleRejectDocument(id, recipientId)}
          statusName="Release"
        />
      </div>
    </SignedInLayout>
  );
};

export default ForRelease;
