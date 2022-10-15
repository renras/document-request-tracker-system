import SignedInLayout from "../../components/Layouts/SignedInLayout/SignedInLayout";
import AdminDocumentsTable from "../../components/AdminDocumentsTable/AdminDocumentsTable";

import { collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../firebase-config";

const Incoming = () => {
  const [documentsData, loading, error] = useCollection(
    collection(db, "documents")
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Failed to load page...</div>;

  const documents = documentsData.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const incomingDocuments = documents.filter(
    (document) => document.status === "INCOMING"
  );

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
