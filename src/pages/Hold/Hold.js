import SignedInLayout from "../../components/Layouts/SignedInLayout/SignedInLayout";
import AdminDocumentsTable from "../../components/AdminDocumentsTable/AdminDocumentsTable";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
import useFetchDocuments from "../../hooks/useFetchDocuments";

const Hold = () => {
  const { data: receivedDocuments, loading, error } = useFetchDocuments("HOLD");

  if (loading) return <Loader />;
  if (error) return <Error />;

  return (
    <SignedInLayout>
      <div className="px-4">
        <h1 className="h2">Hold</h1>
        <AdminDocumentsTable documents={receivedDocuments} />
      </div>
    </SignedInLayout>
  );
};

export default Hold;
