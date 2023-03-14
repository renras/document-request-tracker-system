import PropTypes from "prop-types";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import Modal from "../../components/v2/Modal/Modal";
import DocumentModal from "../../components/DocumentModal/DocumentModal";
import { useState, useRef } from "react";
import { AiFillEye } from "react-icons/ai";
import moment from "moment";
import { useForm } from "react-hook-form";
import updateRequestType from "../../services/updateRequestType";
import emailjs from "@emailjs/browser";

const columns = [
  "Tracking ID",
  "Document Type",
  "Purpose",
  "Fee",
  "Requested By",
];

const Table = ({ documents, onAccept, statusName, showClaimingDate, user }) => {
  const [isViewingDocument, setIsViewingDocument] = useState(null);
  const {
    register: rejectModalRegister,
    handleSubmit: rejectModalHandleSubmit,
  } = useForm();
  const formRef = useRef(null);
  const [documentToReject, setDocumentToReject] = useState(null);

  const handleRejectConfirmation = async () => {
    try {
      await updateRequestType(
        documentToReject.id,
        "REJECTED",
        user.uid,
        documentToReject.authorId,
        "has rejected your request"
      );

      await emailjs.sendForm(
        "service_fs7z2n6",
        "template_d92oyze",
        formRef.current,
        "nwbcoDLTBTvMU-vIp"
      );

      setDocumentToReject(null);
    } catch (e) {
      console.error(e);
      alert("Failed to reject document. Please try again later.");
    }
  };

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
                    {onAccept && (
                      <>
                        <button
                          className="btn btn-sm btn-light text-success"
                          onClick={() => onAccept(id, authorId)}
                        >
                          <AiFillCheckCircle size={24} />
                        </button>

                        <button
                          className="btn btn-sm btn-light text-danger"
                          onClick={() => setDocumentToReject(document)}
                        >
                          <AiFillCloseCircle size={24} />
                        </button>
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
      {!!documentToReject && (
        <Modal isOpen={!!documentToReject}>
          <div className="modal-header">
            <h5 className="modal-title">Confirm Reject</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => setDocumentToReject(null)}
            ></button>
          </div>
          <form
            ref={formRef}
            onSubmit={rejectModalHandleSubmit(handleRejectConfirmation)}
          >
            <div className="modal-body">
              <p>Are you sure you want to reject this request?</p>
              <input
                {...rejectModalRegister("requestor_email")}
                defaultValue={documentToReject.authorEmail}
                hidden
              />
              <textarea
                className="form-control"
                aria-label="reason for rejection"
                rows="5"
                placeholder="Enter the reason here"
                {...rejectModalRegister("reason", { required: true })}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => setDocumentToReject(null)}
              >
                Cancel
              </button>
              <button className="btn btn-danger">Reject</button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};

export default Table;

Table.propTypes = {
  documents: PropTypes.array,
  onAccept: PropTypes.func,
  statusName: PropTypes.string,
  showClaimingDate: PropTypes.bool,
  user: PropTypes.object,
};
