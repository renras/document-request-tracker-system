import SignedInLayout from "../../components/Layouts/SignedInLayout/SignedInLayout";
import { DOCUMENT_TYPES } from "../Documents/CreateDocumentModal/documentTypes";
import { query, collection, getDocs, where } from "firebase/firestore";
import { db } from "../../firebase-config";
import { useState, useRef } from "react";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
import DatePicker from "react-datepicker";
import moment from "moment";
import useDeepCompareEffect from "use-deep-compare-effect";
import { MdDateRange } from "react-icons/md";
import { DownloadTableExcel } from "react-export-table-to-excel";

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [reportsLoading, setReportsLoading] = useState(true);
  const [reportsError, setReportsError] = useState(null);
  const [date, setDate] = useState(null);
  const documentTypes = DOCUMENT_TYPES.filter(
    (document) => document.value !== ""
  );
  const tableRef = useRef(null);

  useDeepCompareEffect(() => {
    const getDocumentTypeReport = async (documentType) => {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async (resolve, reject) => {
        try {
          const formatDate = moment(date).format("YYYY-MM-DD");
          const dateYesterday = date
            ? new Date(`${formatDate} 00:00:00`)
            : null;

          const dateTomorrow = date ? new Date(`${formatDate} 23:59:59`) : null;

          const getQRequestsCount = () => {
            if (!date)
              return query(
                collection(db, "documents"),
                where("documentType", "==", documentType)
              );

            return query(
              collection(db, "documents"),
              where("documentType", "==", documentType),
              where("createdAt", ">=", dateYesterday),
              where("createdAt", "<=", dateTomorrow)
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
              where("createdAt", ">=", dateYesterday),
              where("createdAt", "<=", dateTomorrow)
            );
          };

          const getQForReleaseRequestsCount = () => {
            if (!date)
              return query(
                collection(db, "documents"),
                where("documentType", "==", documentType),
                where("status", "==", "FOR RELEASE")
              );

            return query(
              collection(db, "documents"),
              where("documentType", "==", documentType),
              where("status", "==", "FOR RELEASE"),
              where("documentType", "==", documentType),
              where("createdAt", ">=", dateYesterday),
              where("createdAt", "<=", dateTomorrow)
            );
          };

          const getQForRejectedRequestsCount = () => {
            if (!date)
              return query(
                collection(db, "documents"),
                where("documentType", "==", documentType),
                where("status", "==", "FOR RELEASE")
              );

            return query(
              collection(db, "documents"),
              where("documentType", "==", documentType),
              where("status", "==", "FOR RELEASE"),
              where("documentType", "==", documentType),
              where("createdAt", ">=", dateYesterday),
              where("createdAt", "<=", dateTomorrow)
            );
          };

          const qRequestsCount = getQRequestsCount();
          const qForReleaseRequestsCount = getQForReleaseRequestsCount();
          const qCompletedRequestsCount = getQCompletedRequestsCount();
          const qRejectedRequestsCount = getQForRejectedRequestsCount();

          const querySnapshotRequestsCount = await getDocs(qRequestsCount);
          const querySnapshotCompletedRequestsCount = await getDocs(
            qCompletedRequestsCount
          );
          const querySnapshotForReleaseRequestsCount = await getDocs(
            qForReleaseRequestsCount
          );
          const querySnapshotRejectedRequestsCount = await getDocs(
            qRejectedRequestsCount
          );
          const documentTypeRequestsCount = querySnapshotRequestsCount.size;
          const documentTypeCompletedRequestsCount =
            querySnapshotCompletedRequestsCount.size;
          const documentTypeForReleaseRequestsCount =
            querySnapshotForReleaseRequestsCount.size;
          const documentTypeRejectedRequestsCount =
            querySnapshotRejectedRequestsCount.size;

          resolve({
            data: {
              requestsCount: documentTypeRequestsCount,
              forReleaseRequestsCount: documentTypeForReleaseRequestsCount,
              completedRequestsCount: documentTypeCompletedRequestsCount,
              rejectedRequestsCount: documentTypeRejectedRequestsCount,
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
  }, [date, reports]);

  if (reportsLoading) return <Loader />;
  if (reportsError) return <Error />;

  const reportsByDocumentType = documentTypes.map((documentType, index) => {
    return {
      label: documentType.label,
      requestsCount: reports[index].requestsCount,
      forReleaseRequestsCount: reports[index].forReleaseRequestsCount,
      completedRequestsCount: reports[index].completedRequestsCount,
      rejectedRequestsCount: reports[index].rejectedRequestsCount,
    };
  });

  return (
    <SignedInLayout>
      <div className="px-4">
        <h1 className="h2 mt-5">Reports</h1>
        <div className="d-flex mt-5" style={{ alignItems: "flex-end" }}>
          <div style={{ flexGrow: 1 }}>
            <div className="position-relative" style={{ maxWidth: "192px" }}>
              <DatePicker
                className="form-control"
                selected={date}
                onChange={(date) => setDate(date)}
              />
              <MdDateRange
                className="position-absolute top-50 translate-middle-y"
                size={20}
                color="#6c757d"
                style={{ right: "10px" }}
              />
            </div>
          </div>
          <DownloadTableExcel
            filename="reports"
            sheet="requests"
            currentTableRef={tableRef.current}
          >
            <button className="btn btn-success mt-5 ms-auto">
              Export to Excel
            </button>
          </DownloadTableExcel>
        </div>
        <table className="table mt-3" ref={tableRef}>
          <thead>
            <tr className="table-success">
              <th scope="col">Document Type</th>
              <th scope="col">No. of Requests</th>
              <th scope="col">No. of For Release</th>
              <th scope="col">No. of Released</th>
              <th scope="col">No. of Rejected</th>
            </tr>
          </thead>
          <tbody>
            {reportsByDocumentType.map((document, index) => (
              <tr key={index}>
                <td>{document.label}</td>
                <td>{document.requestsCount}</td>
                <td>{document.forReleaseRequestsCount}</td>
                <td>{document.completedRequestsCount}</td>
                <td>{document.rejectedRequestsCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SignedInLayout>
  );
};

export default Reports;
