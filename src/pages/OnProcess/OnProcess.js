import SignedInLayout from "../../components/Layouts/SignedInLayout/SignedInLayout";
import AdminDocumentsTable from "../../components/AdminDocumentsTable/AdminDocumentsTable";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
import useFetchDocuments from "../../hooks/useFetchDocuments";

const OnProcess = () => {
  const {
    data: incomingDocuments,
    loading,
    error,
  } = useFetchDocuments("ON PROCESS");

  if (loading) return <Loader />;
  if (error) return <Error />;

  return (
    <SignedInLayout>
      <div className="px-4">
        <h1 className="h2">On Process</h1>
        <AdminDocumentsTable documents={incomingDocuments} />
      </div>
    </SignedInLayout>
  );
};

export default OnProcess;
