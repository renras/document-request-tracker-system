import SignedInLayout from "../../components/Layouts/SignedInLayout/SignedInLayout";
import AdminDocumentsTable from "../../components/AdminDocumentsTable/AdminDocumentsTable";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
import useFetchDocuments from "../../hooks/useFetchDocuments";

const Released = () => {
  const {
    data: rejectedDocuments,
    loading,
    error,
  } = useFetchDocuments("REJECTED");

  if (loading) return <Loader />;
  if (error) return <Error />;

  return (
    <SignedInLayout>
      <div className="px-4"> style={{ fontFamily: "Roboto, sans-serif" }}
        <h1 className="h2">Rejected</h1>
        <AdminDocumentsTable documents={rejectedDocuments} />
      </div>
    </SignedInLayout>
  );
};

export default Released;
