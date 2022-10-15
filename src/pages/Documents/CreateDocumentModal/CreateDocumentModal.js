import { useState } from "react";
import Dropdown from "../../../components/ui/Dropdown/Dropdown";
import Modal from "../../../components/Modal/Modal";
import { FORM_TYPES } from "./FormTypes";
import { useForm } from "react-hook-form";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../firebase-config";
import { useNavigate } from "react-router-dom";

const QUANTITIES = [
  {
    label: "1",
    value: 1,
  },
  {
    label: "2",
    value: 2,
  },
];

const CreateDocument = () => {
  const [formType, setFormType] = useState(FORM_TYPES[0]);
  const [quantity, setQuantity] = useState(QUANTITIES[0]);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { title, purpose } = data;

    if (!formType.value) {
      alert("Please select a form type");
      return;
    }

    try {
      await addDoc(collection(db, "documents"), {
        title: title,
        formType: formType.value,
        purpose: purpose,
        quantity: quantity.value,
      });
      navigate(0);
    } catch (e) {
      console.error(e);
      alert("Failed to create document. Please try again later.");
    }
  };

  return (
    <Modal id="create-document-modal" title="Create A Document">
      <form className="modal-dialog" onSubmit={handleSubmit(onSubmit)}>
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="modal-title">
              Create a Document
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body">
            {/* title */}

            <label className="form-label" htmlFor="title">
              Title
            </label>
            <input
              className="form-control"
              type="text"
              id="title"
              name=""
              {...register("title", { required: true })}
            />

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

            {/* quantity */}
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

            <label htmlFor="purpose" className="form-label mt-3">
              Purpose
            </label>
            <textarea
              id="purpose"
              className="form-control"
              rows={5}
              {...register("purpose", { required: true })}
            />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-dark"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="submit" className="btn btn-dark">
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default CreateDocument;
