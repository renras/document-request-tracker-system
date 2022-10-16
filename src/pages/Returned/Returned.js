import SignedInLayout from "../../components/Layouts/SignedInLayout/SignedInLayout";
import AdminDocumentsTable from "../../components/AdminDocumentsTable/AdminDocumentsTable";
import { collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../firebase-config";

const Returned = () => {
  const [documentsData, documentsDataLoading, documentsDataError] =
    useCollection(collection(db, "documents"));
  const [usersData, usersDataLoading, usersDataError] = useCollection(
    collection(db, "users")
  );

  if ((usersDataLoading, documentsDataLoading)) return <div>Loading...</div>;
  if ((usersDataError, documentsDataError))
    return <div>Failed to load page...</div>;

  const users = usersData.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });

  const documents = documentsData.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    author: users.find((user) => user.id === doc.data().authorId),
  }));

  const returnedDocuments = documents.filter(
    (document) => document.status === "RETURNED"
  );

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
