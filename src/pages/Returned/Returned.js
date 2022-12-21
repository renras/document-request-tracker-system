import SignedInLayout from "../../components/Layouts/SignedInLayout/SignedInLayout";
import AdminDocumentsTable from "../../components/AdminDocumentsTable/AdminDocumentsTable";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
import useFetchDocuments from "../../hooks/useFetchDocuments";

const Returned = () => {
  const {
    data: returnedDocuments,
    loading,
    error,
  } = useFetchDocuments("RETURNED");

  if (loading) return <Loader />;
  if (error) return <Error />;

  return (
    <SignedInLayout>
      <div className="px-4">
        <h1 className="h2">Returned</h1>
        <AdminDocumentsTable documents={returnedDocuments} />
      </div>
    </SignedInLayout>
  );
};

export default Returned;
