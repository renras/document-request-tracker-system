import SignedInLayout from "../../components/Layouts/SignedInLayout/SignedInLayout";
import { useAuthState } from "react-firebase-hooks/auth";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
import { auth, db } from "../../firebase-config";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { collection, query, where, getDocs } from "firebase/firestore";
import Card from "./Card";

const Dashboard = () => {
  const [user, userLoading, userError] = useAuthState(auth);
  const [userDocuments, setUserDocuments] = useState([]);
  const [userDocumentsLoading, setUserDocumentsLoading] = useState(true);
  const [userDocumentsError, setUserDocumentsError] = useState(null);

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
        label: ["Requested Documents", "Completed Documents"],
        data: [userDocuments.length, releasedDocuments.length],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    // set bar width
    barThickness: 50,
    // add margintop to graph
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Documents Count by Status",
      },
    },
  };

  const tableData = {
    labels: [
      "Requested Documents",
      "On Processing Documents",
      "Completed Documents",
    ],
    datasets: [
      {
        data: [
          userDocuments.length,
          onProcessingDocuments.length,
          releasedDocuments.length,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(75, 192, 192, 0.5)",
        ],
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
              label="Requested Documents"
              count={onProcessingDocuments.length}
              data={onProcessedDocumentsDoughnutData}
            />
            <Card
              label="Completed Documents"
              count={releasedDocuments.length}
              data={releasedDocumentsDoughnutData}
            />
          </div>
        </div>
        <div className="mt-5" style={{ height: "400px" }}>
          <Bar data={tableData} options={options} />
        </div>
      </div>
    </SignedInLayout>
  );
};

export default Dashboard;
