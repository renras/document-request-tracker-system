import PropTypes from "prop-types";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";

const columns = ["Tracking ID", "Document Type", "Purpose", "Requested By"];

const Table = ({ documents, onAccept, onReject, statusName }) => {
  return (
    <table className="table mt-5 align-middle">
      <thead>
        <tr className="table-success">
          {columns.map((column, index) => (
            <th scope="col" key={index}>
              {column}
            </th>
          ))}
          {(onAccept || onReject) && <th scope="col">{statusName}</th>}
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

              {(onAccept || onReject) && (
                <td>
                  {onAccept && (
                    <button
                      className="btn btn-sm btn-light text-success"
                      onClick={() => onAccept(id)}
                    >
                      <AiFillCheckCircle size={24} />
                    </button>
                  )}

                  {onReject && (
                    <button
                      className="btn btn-sm btn-light text-danger"
                      onClick={() => onReject(id)}
                    >
                      <AiFillCloseCircle size={24} />
                    </button>
                  )}
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
  onAccept: PropTypes.func,
  onReject: PropTypes.func,
  statusName: PropTypes.string,
};
