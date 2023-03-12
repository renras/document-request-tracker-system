import PropTypes from "prop-types";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import moment from "moment/moment";

const columns = ["Tracking ID", "Document Type", "Purpose", "Requested By"];

const Table = ({
  documents,
  onAccept,
  onReject,
  statusName,
  showClaimingDate,
}) => {
  return (
    <table className="table mt-5 align-middle">
      <thead>
        <tr className="table-success">
          {columns.map((column, index) => (
            <th scope="col" key={index}>
              {column}
            </th>
          ))}
          {showClaimingDate && <th scope="col">Claiming Date</th>}
          {(onAccept || onReject) && <th scope="col">{statusName}</th>}
        </tr>
      </thead>
      <tbody>
        {documents.map((document) => {
          const {
            id,
            documentType,
            purpose,
            author,
            authorId,
            claimingDate,
            otherPurpose,
          } = document;

          return (
            <tr key={id}>
              <td>{id}</td>
              <td>{documentType}</td>
              <td>{otherPurpose || purpose}</td>
              <td>{author?.firstName + " " + author?.lastName}</td>
              {showClaimingDate && (
                <td>{moment(claimingDate.toDate()).format("MMMM DD, YYYY")}</td>
              )}

              {(onAccept || onReject) && (
                <td>
                  {onAccept && (
                    <button
                      className="btn btn-sm btn-light text-success"
                      onClick={() => onAccept(id, authorId)}
                    >
                      <AiFillCheckCircle size={24} />
                    </button>
                  )}

                  {onReject && (
                    <button
                      className="btn btn-sm btn-light text-danger"
                      onClick={() => onReject(id, authorId)}
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
  showClaimingDate: PropTypes.bool,
};
