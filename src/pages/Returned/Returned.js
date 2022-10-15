import SignedInLayout from "../../components/Layouts/SignedInLayout/SignedInLayout";
import documentsData from "../../documents.json";
import AdminDocumentsTable from "../../components/AdminDocumentsTable/AdminDocumentsTable";

const Returned = () => {
  const documents = documentsData.data.filter(
    (document) => document.status === "RETURNED"
  );

  return (
    <SignedInLayout>
      <div className="px-4">
        <h1 className="h2">Returned</h1>
        <AdminDocumentsTable documents={documents} />
      </div>
    </SignedInLayout>
  );
};

export default Returned;
