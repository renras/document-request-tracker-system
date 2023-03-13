import PropTypes from "prop-types";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";

import DocumentModal from "../../components/DocumentModal/DocumentModal";
import { useState } from "react";
import { AiFillEye } from "react-icons/ai";
import moment from "moment";

const columns = [
  "Tracking ID",
  "Document Type",
  "Purpose",
  "Fee",
  "Requested By",
];

const Table = ({
  documents,
  onAccept,
  onReject,
  statusName,
  showClaimingDate,
}) => {
  const [isViewingDocument, setIsViewingDocument] = useState(null);

  return (
    <>
      <table className="table mt-5 align-middle">
        <thead>
          <tr className="table-success">
            {columns.map((column, index) => (
              <th scope="col" key={index}>
                {column}
              </th>
            ))}
            {showClaimingDate && <th scope="col">Claiming Date</th>}
            <th>Action</th>
            {statusName && <th scope="col">{statusName}</th>}
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
              fee,
              otherPurpose,
            } = document;

            return (
              <tr key={id}>
                <td>{id}</td>
                <td>{documentType}</td>
                <td>{otherPurpose || purpose}</td>
                <td>{fee}</td>
                <td>{author?.firstName + " " + author?.lastName}</td>
                {showClaimingDate && (
                  <td>
                    {moment(document?.claimingDate?.toDate()).format(
                      "MMMM DD, YYYY"
                    )}
                  </td>
                )}

                <td>
                  <button
                    className="btn btn-light"
                    onClick={() => setIsViewingDocument(document)}
                  >
                    <AiFillEye />
                  </button>
                </td>

                <td>
                  <div className="d-flex gap-3">
                    {(onAccept || onReject) && (
                      <>
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
                      </>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {isViewingDocument && (
        <DocumentModal
          request={isViewingDocument}
          isOpen={isViewingDocument ? true : false}
          onClose={() => setIsViewingDocument(null)}
        />
      )}
    </>
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
