import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { storage } from "../../firebase-config";
import { ref, getDownloadURL } from "firebase/storage";
import Modal from "../../components/v2/Modal/Modal.js";
import moment from "moment/moment";

const CreateDocument = ({ request, isOpen, onClose }) => {
  const [attachmentUrl, setAttachmentUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (attachmentUrl) return;

    (async () => {
      try {
        const storageRef = ref(storage, `attachments/${request.id}`);

        const url = await getDownloadURL(storageRef);

        setAttachmentUrl(url);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [request.id, attachmentUrl]);

  if (loading) return <div>Loading...</div>;

  return (
    <Modal
      title="Request"
      isOpen={isOpen}
      onClose={onClose}
      style={{ fontFamily: "Roboto, sans-serif" }}
    >
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
          <h2 className="h6 m-0 col">Requested At:</h2>
          <p className="m-0 col-8">
            {moment(request.createdAt.toDate()).format(
              "MMMM Do YYYY, h:mm:ss a"
            )}
          </p>
        </div>

        <div className="row mt-3">
          <h2 className="h6 m-0 col">Document Type:</h2>
          <p className="m-0 col-8">{request.documentType}</p>
        </div>

        <div className="row mt-3">
          <h2 className="h6 m-0 col">Purpose:</h2>
          <p className="m-0 col-8">{request.otherPurpose || request.purpose}</p>
        </div>

        <div className="row mt-3">
          <h2 className="h6 m-0 col">Quantity:</h2>
          <p className="m-0 col-8">{request.quantity}</p>
        </div>

        <div className="row mt-3">
          <h2 className="h6 m-0 col">Status:</h2>
          <p className="m-0 col-8">{request.status}</p>
        </div>

        <div className="row mt-3">
          <h2 className="h6 m-0 col">Attachment</h2>
          {attachmentUrl && (
            <a
              className="m-0 col-8"
              href={attachmentUrl}
              rel="noreferrer"
              target="_blank"
            >
              File
            </a>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default CreateDocument;

CreateDocument.propTypes = {
  request: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
};
