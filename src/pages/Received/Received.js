import SignedInLayout from "../../components/Layouts/SignedInLayout/SignedInLayout";
import AdminDocumentsTable from "../../components/AdminDocumentsTable/AdminDocumentsTable";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
import useFetchDocuments from "../../hooks/useFetchDocuments";

const Incoming = () => {
  const {
    data: receivedDocuments,
    loading,
    error,
  } = useFetchDocuments("RECEIVED");

  if (loading) return <Loader />;
  if (error) return <Error />;

  return (
    <SignedInLayout>
      <div className="px-4" style={{ fontFamily: "Roboto, sans-serif" }}>
        <h1 className="h2">Received</h1>
        <AdminDocumentsTable documents={receivedDocuments} />
      </div>
    </SignedInLayout>
  );
};

export default Incoming;
