import SignedInLayout from "../../components/Layouts/SignedInLayout/SignedInLayout";
import AdminDocumentsTable from "../../components/AdminDocumentsTable/AdminDocumentsTable";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
import useFetchDocuments from "../../hooks/useFetchDocuments";

const ForRelease = () => {
  const {
    data: forReleaseDocuments,
    loading,
    error,
  } = useFetchDocuments("FOR RELEASE");

  if (loading) return <Loader />;
  if (error) return <Error />;

  return (
    <SignedInLayout>
      <div className="px-4">
        <h1 className="h2">For Release</h1>
        <AdminDocumentsTable documents={forReleaseDocuments} isRejectable />
      </div>
    </SignedInLayout>
  );
};

export default ForRelease;
