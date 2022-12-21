import SignedInLayout from "../../components/Layouts/SignedInLayout/SignedInLayout";
import AdminDocumentsTable from "../../components/AdminDocumentsTable/AdminDocumentsTable";
import { collection, query, doc, getDoc, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../firebase-config";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
import { useState, useEffect } from "react";

const Incoming = () => {
  const documentsRef = collection(db, "documents");
  const q = query(documentsRef, where("status", "==", "INCOMING"));
  const [documentsData, documentsDataLoading, documentsDataError] =
    useCollection(q);
  const [incomingDocumentsLoading, setIncomingDocumentsLoading] =
    useState(false);
  const [incomingDocuments, setIncomingDocuments] = useState([]);
  const [incomingDocumentsError, setIncomingDocumentsError] = useState(null);

  useEffect(() => {
    if (!documentsData) return;

    (async () => {
      try {
        const newDocuments = await Promise.all(
          documentsData.docs.map(async (document) => {
            const docRef = doc(db, "users", document.data().authorId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
              return {
                id: document.id,
                ...document.data(),
                author: docSnap.data(),
              };
            } else {
              return {
                id: document.id,
                ...document.data(),
                author: null,
              };
            }
          })
        );

        setIncomingDocuments(newDocuments);
      } catch (e) {
        console.error(e);
        setIncomingDocumentsError("Failed to fetch authors in documents");
      } finally {
        setIncomingDocumentsLoading(false);
      }
    })();
  }, [documentsData]);

  if (documentsDataLoading || incomingDocumentsLoading) return <Loader />;
  if (documentsDataError || incomingDocumentsError) return <Error />;

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
