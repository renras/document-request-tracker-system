import { useState, useRef} from "react";
import Dropdown from "../../../components/ui/Dropdown/Dropdown";
import Modal from "../../../components/Modal/Modal";
import { DOCUMENT_TYPES } from "./documentTypes";
import { PURPOSES } from "./purpose";
import { useForm } from "react-hook-form";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../../../firebase-config";
import PropTypes from "prop-types";
import {storage} from '../../../firebase-config';
import {ref, uploadBytes} from "firebase/storage";
import {v4} from "uuid";


const QUANTITIES = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "5", value: "5" },
];

const CreateDocument = ({ userId }) => {
  const [documentType, setDocumentType] = useState(DOCUMENT_TYPES[0]);
  const [quantity, setQuantity] = useState(QUANTITIES[0]);
  const [purpose, setPurpose] = useState(PURPOSES[0]);
  const { handleSubmit } = useForm();
  const closeButton = useRef(null);
  const [imageUpload, setImageUpload] = useState(null);
  const uploadImage = () => {
    if (imageUpload == null) return;
  const imageRef = ref(storage, `images/${v4()}`);
    uploadBytes(imageRef, imageUpload).then(() => {
      console.log('uploaded');
      alert('uploaded');
    })
  };



  const resetFields = () => {
    setDocumentType(DOCUMENT_TYPES[0]);
    setQuantity(QUANTITIES[0]);
    setPurpose(PURPOSES[0]);
  };

  const onSubmit = async () => {
    if (!documentType.value) {
      alert("Please select a document type");
      return;
    }

    if (!quantity.value) {
      alert("Please select a quantity");
      return;
    }

    if (!purpose.value) {
      alert("Please select a purpose");
      return;
    }

    try {
      await addDoc(collection(db, "documents"), {
        documentType: documentType.value,
        quantity: quantity.value,
        purpose: purpose.value,
        status: "INCOMING",
        authorId: userId,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });

      closeButton.current.click();
      resetFields();
    } catch (e) {
      alert("Failed to create document. Please try again later.");
    }
  };

  return (
    <Modal id="create-document-modal" title="Create A Document">
      <form className="modal-dialog" onSubmit={handleSubmit(onSubmit)}>
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="modal-title">
              Create a Request
            </h1>
            <button
              ref={closeButton}
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body">
            {/* document type */}
            <label htmlFor="document-type" className="form-label mt-3">
              Document Type
            </label>
            <Dropdown
              id="document-type"
              value={documentType}
              options={DOCUMENT_TYPES}
              onChange={(option) => setDocumentType(option)}
            />

            {/* quantity with arrow funct */}
            <label htmlFor="quantity" className="form-label mt-3">
              Quantity
            </label>
            <div style={{ width: "5rem" }}>
              <Dropdown
                id="quantity"
                value={quantity}
                options={QUANTITIES}
                onChange={(option) => setQuantity(option)}
              />
            </div>

            {/* purpose */}
            <label htmlFor="purpose" className="form-label mt-3">
              Purpose
            </label>
            <Dropdown
              id="purpose"
              value={purpose}
              options={PURPOSES}
              onChange={(option) => setPurpose(option)}
            />

            {/* file upload*/}
            <label htmlFor="file" className="form-label mt-3">
              Upload File
            </label>
            <input
              type="file"
              id="file"
              onChange={(event) => {
                setImageUpload(event.target.files[0]);
              }}
              className="form-control"
            />
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-success"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="submit" className="btn btn-success" onClick={uploadImage}>
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default CreateDocument;

CreateDocument.propTypes = {
  userId: PropTypes.string,
};
