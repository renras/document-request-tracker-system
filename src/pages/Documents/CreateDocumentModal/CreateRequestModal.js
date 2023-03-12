import { useState, useRef } from "react";
import Dropdown from "../../../components/ui/Dropdown/Dropdown";
import Modal from "../../../components/Modal/Modal";
import { DOCUMENT_TYPES } from "./documentTypes";
import { PURPOSES } from "./purpose";
import { useForm } from "react-hook-form";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../../../firebase-config";
import PropTypes from "prop-types";
import { storage } from "../../../firebase-config";
import { ref, uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { doc, setDoc, runTransaction } from "firebase/firestore";

const QUANTITIES = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "5", value: "5" },
];

const CreateRequestModal = ({ profile }) => {
  const [requestedDocumentType, setRequestedDocumentType] = useState(null);
  const [quantity, setQuantity] = useState(QUANTITIES[0]);
  const [purpose, setPurpose] = useState(PURPOSES[0]);
  const { handleSubmit, register } = useForm();
  const closeButton = useRef(null);
  const [attachment, setAttachment] = useState(null);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChangeRequestedDocumentType = (documentType) => {
    setRequestedDocumentType(documentType);
  };

  const filteredDocumentTypes = DOCUMENT_TYPES.filter((documentType) => {
    return documentType.value;
  });

  const uploadAttachment = async (id) => {
    if (attachment == null) return;

    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const imageRef = ref(storage, `attachments/${id}`);
          const data = await uploadBytes(imageRef, attachment);
          resolve(data);
        } catch (e) {
          reject(e);
        }
      })();
    });
  };

  const incrementDocumentsCount = async () => {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const count = await runTransaction(db, async (transaction) => {
            const countDocRef = doc(db, "documents", "data");
            const countDoc = await transaction.get(countDocRef);

            if (!countDoc.exists()) {
              transaction.set(countDocRef, { count: 1 });
              return 1;
            }

            const newCount = countDoc.data().count + 1;
            transaction.update(countDocRef, { count: newCount });
            return newCount;
          });

          resolve(count);
        } catch (e) {
          reject(e);
        }
      })();
    });
  };

  const addPadstartToNumber = (num, padStart) => {
    return num.toString().padStart(padStart, "0");
  };

  const createRequestNotification = async (id) => {
    try {
      await addDoc(collection(db, "notifications"), {
        type: "REQUEST",
        body: "has created a request",
        senderId: id,
        recipientId: null,
        clickAction: "/on-process",
        isRead: false,
        createdAt: Timestamp.now(),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const createRequest = async (requestedDocumentType, otherPurpose) => {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const count = await incrementDocumentsCount();
          const year = new Date().getFullYear();
          const day = new Date().getDay();

          const formattedId = `${year}-${addPadstartToNumber(
            day,
            2
          )}-${addPadstartToNumber(count, 4)}`;

          await setDoc(doc(db, "documents", formattedId), {
            documentType: requestedDocumentType.value,
            quantity: quantity.value,
            purpose: purpose.value,
            otherPurpose: otherPurpose || null,
            status: "ON PROCESS",
            authorId: profile.id,
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now(),
          });

          await uploadAttachment(formattedId);
          await createRequestNotification(profile.id);

          resolve();
        } catch (error) {
          reject(error);
        }
      })();
    });
  };

  const onSubmit = async (data) => {
    if (!requestedDocumentType) {
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

    if (attachment == null) {
      alert("Please upload Proof of Identity");
      setIsSubmitting(false);
      return;
    }

    try {
      setIsSubmitting(true);
      await createRequest(requestedDocumentType, data.otherPurpose);

      navigate(0);
    } catch (e) {
      console.error(e);
      alert("Failed to create document. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal id="create-document-modal" title="Create A Document">
      <form
        className="modal-dialog"
        style={{ fontFamily: "Roboto, sans-serif" }}
        onSubmit={handleSubmit(onSubmit)}
      >
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
            {/* document type  */}
            <label htmlFor="document-type" className="form-label mt-3">
              Document Type
            </label>
            <Select
              id="document-type"
              options={filteredDocumentTypes}
              value={requestedDocumentType}
              onChange={handleChangeRequestedDocumentType}
              maxMenuHeight={160}
              isSearchable={true}
              isLoading={false}
              placeholder="Search for document type"
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

            {purpose.value === "Others" && (
              <div className="d-flex align-items-center mt-3">
                <label htmlFor="other purpose" className="form-label mt-3">
                  If others, please specify
                </label>
                <input
                  id="other purpose"
                  className="form-control"
                  {...register("otherPurpose", { required: true })}
                />
              </div>
            )}

            {/* file upload*/}
            <label htmlFor="file" className="form-label mt-3">
              Upload Proof of Identity
            </label>
            <input
              type="file"
              id="file"
              onChange={(event) => setAttachment(event.target.files[0])}
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
            <button
              type="submit"
              className="btn btn-success"
              disabled={isSubmitting}
            >
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default CreateRequestModal;

CreateRequestModal.propTypes = {
  profile: PropTypes.object.isRequired,
};
