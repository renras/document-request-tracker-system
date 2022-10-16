import PropTypes from "prop-types";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase-config";

const columns = ["Tracking ID", "Document", "Type", "Requested By", "Action"];

const Table = ({ documents }) => {
  const handleAcceptDocument = async (id) => {
    try {
      const docRef = doc(db, "documents", id);
      await updateDoc(docRef, {
        status: "RECEIVED",
      });
    } catch {
      alert("Failed to receive document. Please try again later.");
    }
  };

  const handleReturnDocument = async (id) => {
    try {
      const docRef = doc(db, "documents", id);
      await updateDoc(docRef, {
        status: "RETURNED",
      });
    } catch {
      alert("Failed to return document. Please try again later.");
    }
  };

  return (
    <table className="table mt-5 align-middle">
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th scope="col" key={index}>
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {documents.map((document) => {
          const { id, title, formType, author, status } = document;

          return (
            <tr key={id}>
              <td>{id}</td>
              <td>{title}</td>
              <td>{formType}</td>
              <td>{author.fullName}</td>
              {status === "INCOMING" && (
                <td>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-sm btn-light text-success"
                      onClick={() => handleAcceptDocument(id)}
                    >
                      <AiFillCheckCircle size={24} />
                    </button>
                    <button
                      className="btn btn-sm btn-light text-danger"
                      onClick={() => handleReturnDocument(id)}
                    >
                      <AiFillCloseCircle size={24} />
                    </button>
                  </div>
                </td>
              )}
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
