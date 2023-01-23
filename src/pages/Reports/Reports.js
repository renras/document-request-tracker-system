import SignedInLayout from "../../components/Layouts/SignedInLayout/SignedInLayout";
import { DOCUMENT_TYPES } from "../Documents/CreateDocumentModal/documentTypes";
import { query, collection, getDocs, where } from "firebase/firestore";
import { db } from "../../firebase-config";
import { useEffect } from "react";

const Reports = () => {
  const documentTypes = DOCUMENT_TYPES.filter(
    (document) => document.value !== ""
  );

  const getDocumentTypeCount = async (documentType) => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        const q = query(
          collection(db, "documents"),
          where("documentType", "==", documentType)
        );
        const querySnapshot = await getDocs(q);
        const documentTypeCount = querySnapshot.size;
        resolve({ data: documentTypeCount, error: null });
      } catch (error) {
        console.error(error);
        reject({ data: null, error: "Failed to get document type count" });
      }
    });
  };

  useEffect(() => {
    (async () => {
      const documentTypeCounts = await Promise.all(
        documentTypes.map(async (documentType) => {
          const { data: requestsCount } = await getDocumentTypeCount(
            documentType.value
          );
          return { requestsCount: requestsCount };
        })
      );
      console.log(documentTypeCounts);
    })();
  }, [documentTypes]);

  return (
    <SignedInLayout>
      <div className="px-4">
        <h1 className="h2 mt-5">Reports</h1>
        <table className="table mt-5">
          <thead>
            <tr className="table-success">
              <th scope="col">Document Type</th>
              <th scope="col">No. of Requests</th>
              <th scope="col">No. of Completed</th>
            </tr>
          </thead>
          <tbody>
            {documentTypes.map((document, index) => (
              <tr key={index}>
                <td>{document.label}</td>
                <td>0</td>
                <td>0</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SignedInLayout>
  );
};

export default Reports;
