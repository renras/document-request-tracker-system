import SignedInLayout from "../../components/Layouts/SignedInLayout/SignedInLayout";
import AdminDocumentsTable from "../../components/AdminDocumentsTable/AdminDocumentsTable";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
import useFetchDocuments from "../../hooks/useFetchDocuments";

const Incoming = () => {
  const {
    data: incomingDocuments,
    loading,
    error,
  } = useFetchDocuments("INCOMING");

  if (loading) return <Loader />;
  if (error) return <Error />;

  return (
    <SignedInLayout>
      <div className="px-4">
        <h1 className="h2">Incoming</h1>
        <AdminDocumentsTable documents={incomingDocuments} />
      </div>
    </SignedInLayout>
  );
};

export default Incoming;
