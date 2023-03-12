import SignedInLayout from "../../components/Layouts/SignedInLayout/SignedInLayout";
import AdminDocumentsTable from "../../components/AdminDocumentsTable/AdminDocumentsTable";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
import useFetchDocuments from "../../hooks/useFetchDocuments";

const Released = () => {
  const {
    data: releasedDocuments,
    loading,
    error,
  } = useFetchDocuments("RELEASED");

  if (loading) return <Loader />;
  if (error) return <Error />;

  return (
    <SignedInLayout>
      <div className="px-4" style={{ fontFamily: "Roboto, sans-serif" }}>
        <h1 className="h2">Released</h1>
        <AdminDocumentsTable documents={releasedDocuments} showClaimingDate />
      </div>
    </SignedInLayout>
  );
};

export default Released;
