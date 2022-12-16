import Modal from "../Modal/Modal";
import PropTypes from "prop-types";

// todo: add attachments

const CreateDocument = ({ request }) => {
  return (
    <Modal id="view-document-modal" title="Request">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="modal-title">
              Request
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="row mt-4">
              <h2 className="h6 m-0 col">Tracking ID:</h2>
              <p className="m-0 col-8">{request.id}</p>
            </div>

            <div className="row mt-3">
              <h2 className="h6 m-0 col">Created At:</h2>
              <p className="m-0 col-8">{request.createdAt}</p>
            </div>

            <div className="row mt-3">
              <h2 className="h6 m-0 col">Document Type:</h2>
              <p className="m-0 col-8">{request.documentType}</p>
            </div>

            <div className="row mt-3">
              <h2 className="h6 m-0 col">Purpose:</h2>
              <p className="m-0 col-8">{request.purpose}</p>
            </div>

            <div className="row mt-3">
              <h2 className="h6 m-0 col">Quantity:</h2>
              <p className="m-0 col-8">{request.quantity}</p>
            </div>

            <div className="row mt-3">
              <h2 className="h6 m-0 col">Status:</h2>
              <p className="m-0 col-8">{request.status}</p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CreateDocument;

CreateDocument.propTypes = {
  request: PropTypes.object.isRequired,
};
