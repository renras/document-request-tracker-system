import SignedInLayout from "../../components/Layouts/SignedInLayout/SignedInLayout";
import { useAuthState } from "react-firebase-hooks/auth";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
import { auth, db } from "../../firebase-config";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import Card from "./Card";

const Dashboard = () => {
  const [user, userLoading, userError] = useAuthState(auth);
  const [userDocuments, setUserDocuments] = useState([]);
  const [userDocumentsLoading, setUserDocumentsLoading] = useState(true);
  const [userDocumentsError, setUserDocumentsError] = useState(null);
  const columns = ["Type", "Count"];

  useEffect(() => {
    if (!user?.uid) return;
    (async () => {
      try {
        const documentsRef = collection(db, "documents");
        const q = query(documentsRef, where("authorId", "==", user.uid));

        const querySnapshot = await getDocs(q);
        const docs = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        setUserDocuments(docs);
      } catch (e) {
        console.error(e);
        setUserDocumentsError("Error fetching user documents");
      } finally {
        setUserDocumentsLoading(false);
      }
    })();
  }, [user?.uid, setUserDocuments]);

  if (userLoading || userDocumentsLoading) return <Loader />;
  if (userError || userDocumentsError) return <Error />;

  const onProcessingDocuments = userDocuments.filter(
    (doc) => doc.status === "ON PROCESS"
  );
  const releasedDocuments = userDocuments.filter(
    (doc) => doc.status === "RELEASED"
  );

  const onProcessedDocumentsDoughnutData = {
    datasets: [
      {
        label: ["Requested Documents", "On Processing Documents"],
        data: [userDocuments.length, onProcessingDocuments.length],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const releasedDocumentsDoughnutData = {
    datasets: [
      {
        label: ["Requested Documents", "Released Documents"],
        data: [userDocuments.length, releasedDocuments.length],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <SignedInLayout>
      <div className="px-5">
        <h1 className="h2">Dashboard</h1>
        <div className="mt-5">
          {/* doughnuts */}
          <div className="d-flex gap-5  ">
            <Card
              count={onProcessingDocuments.length}
              data={onProcessedDocumentsDoughnutData}
            />
            <Card
              count={releasedDocuments.length}
              data={releasedDocumentsDoughnutData}
            />
          </div>
        </div>
        <table className="table mt-5">
          <thead>
            <tr className="table-success">
              {columns.map((column, index) => (
                <th scope="col" key={index}>
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="align-middle">Requested Documents</td>
              <td className="align-middle">{userDocuments.length}</td>
            </tr>
            <tr>
              <td className="align-middle">On Processing Documents</td>
              <td className="align-middle">{onProcessingDocuments.length}</td>
            </tr>
            <tr>
              <td className="align-middle">Released Documents</td>
              <td className="align-middle">{releasedDocuments.length}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </SignedInLayout>
  );
};

export default Dashboard;
