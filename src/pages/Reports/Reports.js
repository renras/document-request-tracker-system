import SignedInLayout from "../../components/Layouts/SignedInLayout/SignedInLayout";
import { DOCUMENT_TYPES } from "../Documents/CreateDocumentModal/documentTypes";
import { query, collection, getDocs, where } from "firebase/firestore";
import { db } from "../../firebase-config";
import { useState } from "react";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
import DatePicker from "react-datepicker";
import moment from "moment";
import useDeepCompareEffect from "use-deep-compare-effect";

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [reportsLoading, setReportsLoading] = useState(true);
  const [reportsError, setReportsError] = useState(null);
  const [date, setDate] = useState(null);
  const documentTypes = DOCUMENT_TYPES.filter(
    (document) => document.value !== ""
  );

  useDeepCompareEffect(() => {
    const getDocumentTypeReport = async (documentType) => {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async (resolve, reject) => {
        try {
          const dateYesterday = date
            ? moment(date).subtract(1, "days").format("LL")
            : null;
          const dateTomorrow = date
            ? moment(date).add(1, "days").format("LL")
            : null;

          const getQRequestsCount = () => {
            if (!date)
              return query(
                collection(db, "documents"),
                where("documentType", "==", documentType)
              );

            return query(
              collection(db, "documents"),
              where("documentType", "==", documentType),
              where("createdAt", ">=", new Date(dateYesterday)),
              where("createdAt", "<=", new Date(dateTomorrow))
            );
          };

          const getQCompletedRequestsCount = () => {
            if (!date)
              return query(
                collection(db, "documents"),
                where("documentType", "==", documentType),
                where("status", "==", "RELEASED")
              );

            return query(
              collection(db, "documents"),
              where("documentType", "==", documentType),
              where("status", "==", "RELEASED"),
              where("documentType", "==", documentType),
              where("createdAt", ">=", new Date(dateYesterday)),
              where("createdAt", "<=", new Date(dateTomorrow))
            );
          };

          const qRequestsCount = getQRequestsCount();
          const qCompletedRequestsCount = getQCompletedRequestsCount();

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
    console.log(reports);
  }, [date, reports]);

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
