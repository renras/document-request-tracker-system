import PropTypes from "prop-types";
// import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import Kebab from "../ui/Kebab/Kebab";
import { useLocation } from "react-router-dom";
import { kebabCase } from "lodash";

const columns = [
  "Tracking ID",
  "Document Type",
  "Purpose",
  "Requested By",
  "Status",
];

const KEBAB_OPTIONS = [
  {
    label: "On Process",
    value: "ON PROCESS",
  },
  {
    label: "For Release",
    value: "FOR RELEASE",
  },
  {
    label: "Released",
    value: "RELEASED",
  },
];

const Table = ({ documents }) => {
  const location = useLocation();
  const kebabOptions = KEBAB_OPTIONS.filter(
    (option) => !location.pathname.includes(kebabCase(option.value))
  );

  // const handleAcceptDocument = async (id) => {
  //   try {
  //     const docRef = doc(db, "documents", id);
  //     await updateDoc(docRef, {
  //       status: "RECEIVED",
  //     });
  //   } catch {
  //     alert("Failed to receive document. Please try again later.");
  //   }
  // };

  // const handleReturnDocument = async (id) => {
  //   try {
  //     const docRef = doc(db, "documents", id);
  //     await updateDoc(docRef, {
  //       status: "RETURNED",
  //     });
  //   } catch {
  //     alert("Failed to return document. Please try again later.");
  //   }
  // };

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
              {/* {status === "INCOMING" && (
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
              )} */}

              <td>
                <Kebab
                  id="document menu"
                  onChange={(option) =>
                    handleChangeDocumentStatus(id, option.value)
                  }
                  options={kebabOptions}
                />
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
