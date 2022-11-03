import { useState, useRef } from "react";
import Dropdown from "../../../components/ui/Dropdown/Dropdown";
import Modal from "../../../components/Modal/Modal";
import { FORM_TYPES } from "./FormTypes";
import { DOCUMENT_TYPES } from "./DocumentType";
//import { PURPOSE } from "./Purpose";
import { useForm } from "react-hook-form";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../../../firebase-config";
import PropTypes from "prop-types";
//import firebase from "firebase/compat/app";
//import "firebase/compat/storage";
//export const storage = firebase.storage();

const QUANTITIES = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "5", value: "5" },
];

const CreateDocument = ({ userId }) => {
  const [formType, setFormType] = useState(FORM_TYPES[0]);
  const [documentType, setDocumentType] = useState(DOCUMENT_TYPES[0]);
  const [quantity, setQuantity] = useState(QUANTITIES[0]);
  //const [purpose, setPurpose] = useState(PURPOSE[0]);
  const { register, handleSubmit } = useForm();
  const closeButton = useRef(null);
  // const [file, setFile] = useState(null);
  //const [url, setURL] = useState("");

  /*make a function to upload the file
  const handleUpload = (e) => {
    e.preventDefault();
    const uploadTask = storage.ref(`images/${file.name}`).put(file);
    uploadTask.on(
      "state_changed",
      
      (error) => {
        //error function
        console.log(error);
      },
      () => {
        //complete function
        storage
          .ref("images")
          .child(file.name)
          .getDownloadURL()
          .then((url) => {
            setURL(url);
          });
      }
    );
  };


  //make a function to handle the file
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  */

  const onSubmit = async (data) => {
    const { purpose } = data;

    if (!formType.value) {
      alert("Please select a form type");
      return;
    }

    if (!documentType.value) {
      alert("Please select a document type");
      return;
    }

    if (!quantity.value) {
      alert("Please select a quantity");
      return;
    }

    if (!purpose) {
      alert("Please select a purpose");
      return;
    }

   

    try {
      await addDoc(collection(db, "documents"), {
        formType: formType.value,
        documentType: documentType.value,
        quantity: quantity.value,
        purpose: purpose,
        //image: url,
        status: "INCOMING",
        authorId: userId,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
      closeButton.current.click();
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
            {/* form type */}
            <label htmlFor="form-type" className="form-label mt-3">
              Form Type
            </label>
            <Dropdown
              id="form-type"
              value={formType}
              options={FORM_TYPES}
              onChange={(option) => setFormType(option)}
            />

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
            <textarea
              id="purpose"
              className="form-control"
              {...register("purpose", { required: true })}
            />

            {/* file upload 
            <label htmlFor="file" className="form-label mt-3">
              Upload File
            </label>
            <input
              type="file"
              id="file"
              className="form-control"
              onChange={handleChange}
            />
            <button onClick={handleUpload}>Upload</button>
  */}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-success"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="submit" className="btn btn-success">
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
