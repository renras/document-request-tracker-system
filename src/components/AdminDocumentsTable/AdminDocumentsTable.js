import PropTypes from "prop-types";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import { useLocation } from "react-router-dom";

const columns = [
  "Tracking ID",
  "Document Type",
  "Purpose",
  "Requested By",
  "Status",
];

const Table = ({ documents }) => {
  const location = useLocation();

  const handleChangeDocumentStatus = async (id, status) => {
    try {
      const docRef = doc(db, "documents", id);
      await updateDoc(docRef, {
        status: status,
      });
    } catch (e) {
      console.error(e);
      alert("Failed to update document status. Please try again later.");
    }
  };

  return (
    <table className="table mt-5 align-middle">
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
        {documents.map((document) => {
          const { id, documentType, purpose, author } = document;

          return (
            <tr key={id}>
              <td>{id}</td>
              <td>{documentType}</td>
              <td>{purpose}</td>
              <td>{author?.fullName}</td>
              <td>
                {location.pathname.includes("on-process") && (
                  <>
                    <button
                      className="btn btn-sm btn-light text-success"
                      onClick={() =>
                        handleChangeDocumentStatus(id, "FOR RELEASE")
                      }
                    >
                      <AiFillCheckCircle size={24} />
                    </button>
                    <button
                      className="btn btn-sm btn-light text-danger"
                      onClick={() => handleChangeDocumentStatus(id, "REJECTED")}
                    >
                      <AiFillCloseCircle size={24} />
                    </button>
                  </>
                )}

                {location.pathname.includes("for-release") && (
                  <>
                    <button
                      className="btn btn-sm btn-light text-success"
                      onClick={() => handleChangeDocumentStatus(id, "RELEASED")}
                    >
                      <AiFillCheckCircle size={24} />
                    </button>
                    <button
                      className="btn btn-sm btn-light text-danger"
                      onClick={() =>
                        handleChangeDocumentStatus(id, "ON_PROCESS")
                      }
                    >
                      <AiFillCloseCircle size={24} />
                    </button>
                  </>
                )}
                {location.pathname.includes("released") && <></>}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;

Table.propTypes = {
  documents: PropTypes.array,
};