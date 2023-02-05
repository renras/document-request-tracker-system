import SignedInLayout from "../../components/Layouts/SignedInLayout/SignedInLayout";
import AdminDocumentsTable from "../../components/AdminDocumentsTable/AdminDocumentsTable";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
import useFetchDocuments from "../../hooks/useFetchDocuments";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase-config";

const ForRelease = () => {
  const {
    data: forReleaseDocuments,
    loading,
    error,
  } = useFetchDocuments("FOR RELEASE");

  if (loading) return <Loader />;
  if (error) return <Error />;

  const handleAcceptDocument = async (id) => {
    try {
      const docRef = doc(db, "documents", id);
      await updateDoc(docRef, {
        status: "RELEASED",
      });
    } catch (e) {
      console.error(e);
      alert("Failed to update document status. Please try again later.");
    }
  };

  const handleRejectDocument = async (id) => {
    try {
      const docRef = doc(db, "documents", id);
      await updateDoc(docRef, {
        status: "REJECTED",
      });
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
          onAccept={(id) => handleAcceptDocument(id)}
          onReject={(id) => handleRejectDocument(id)}
        />
      </div>
    </SignedInLayout>
  );
};

export default ForRelease;
