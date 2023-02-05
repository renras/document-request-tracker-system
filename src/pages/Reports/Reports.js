import SignedInLayout from "../../components/Layouts/SignedInLayout/SignedInLayout";
import { DOCUMENT_TYPES } from "../Documents/CreateDocumentModal/documentTypes";
import { query, collection, getDocs, where } from "firebase/firestore";
import { db } from "../../firebase-config";
import { useEffect } from "react";
import { useState } from "react";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
import DatePicker from "react-datepicker";

const Reports = () => {
  const [reports, setReports] = useState(null);
  const [reportsLoading, setReportsLoading] = useState(true);
  const [reportsError, setReportsError] = useState(null);
  const [date, setDate] = useState(null);
  const documentTypes = DOCUMENT_TYPES.filter(
    (document) => document.value !== ""
  );

  const getDocumentTypeReport = async (documentType) => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        const qRequestsCount = await query(
          collection(db, "documents"),
          where("documentType", "==", documentType)
        );
        const qCompletedRequestsCount = query(
          collection(db, "documents"),
          where("documentType", "==", documentType),
          where("status", "==", "RELEASED")
        );

        const querySnapshotRequestsCount = await getDocs(qRequestsCount);
        const querySnapshotCompletedRequestsCount = await getDocs(
          qCompletedRequestsCount
        );
        const documentTypeRequestsCount = querySnapshotRequestsCount.size;
        const documentTypeCompletedRequestsCount =
          querySnapshotCompletedRequestsCount.size;

        resolve({
          data: {
            requestsCount: documentTypeRequestsCount,
            completedRequestsCount: documentTypeCompletedRequestsCount,
          },
          error: null,
        });
      } catch (error) {
        console.error(error);
        reject({ data: null, error: "Failed to fetch reports" });
      }
    });
  };

  useEffect(() => {
    if (!reports) {
      (async () => {
        try {
          const documentTypeCounts = await Promise.all(
            documentTypes.map(async (documentType) => {
              const { data } = await getDocumentTypeReport(documentType.value);
              return data;
            })
          );
          setReports(documentTypeCounts);
        } catch (error) {
          console.error(error);
          setReportsError("Failed to fetch reports");
        } finally {
          setReportsLoading(false);
        }
      })();
    }
  }, [documentTypes, reports]);

  if (reportsLoading) return <Loader />;
  if (reportsError) return <Error />;

  const reportsByDocumentType = documentTypes.map((documentType, index) => {
    return {
      label: documentType.label,
      requestsCount: reports[index].requestsCount,
      completedRequestsCount: reports[index].completedRequestsCount,
    };
  });

  return (
    <SignedInLayout>
      <div className="px-4">
        <h1 className="h2 mt-5">Reports</h1>
        <div className="mt-5">
          <div style={{ maxWidth: "192px" }}>
            <DatePicker
              className="form-control"
              selected={date}
              onChange={(date) => setDate(date)}
            />
          </div>
        </div>
        <table className="table mt-3">
          <thead>
            <tr className="table-success">
              <th scope="col">Document Type</th>
              <th scope="col">No. of Requests</th>
              <th scope="col">No. of Completed</th>
            </tr>
          </thead>
          <tbody>
            {reportsByDocumentType.map((document, index) => (
              <tr key={index}>
                <td>{document.label}</td>
                <td>{document.requestsCount}</td>
                <td>{document.completedRequestsCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SignedInLayout>
  );
};

export default Reports;
