import SignedInLayout from "../../components/Layouts/SignedInLayout/SignedInLayout";
import AdminDocumentsTable from "../../components/AdminDocumentsTable/AdminDocumentsTable";
import { collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../firebase-config";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";

const Incoming = () => {
  const [documentsData, documentsDataLoading, documentsDataError] =
    useCollection(collection(db, "documents"));
  const [usersData, usersDataLoading, usersDataError] = useCollection(
    collection(db, "users")
  );

  if ((usersDataLoading, documentsDataLoading)) return <Loader />;
  if ((usersDataError, documentsDataError)) return <Error />;

  const users = usersData.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });

  const documents = documentsData.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    author: users.find((user) => user.id === doc.data().authorId),
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
