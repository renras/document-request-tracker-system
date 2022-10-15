import { useState } from "react";
import Dropdown from "../../../components/ui/Dropdown/Dropdown";
import Modal from "../../../components/Modal/Modal";
import { FORM_TYPES } from "./FormTypes";

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

const CreateRequest = () => {
  const [formType, setFormType] = useState(FORM_TYPES[0]);
  const [quantity, setQuantity] = useState(QUANTITIES[0]);

  return (
    <Modal id="create-document-modal" title="Create A Document">
      <form className="modal-dialog">
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
            <input className="form-control" type="text" id="title" name="" />

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
            <textarea id="purpose" className="form-control" rows={5} />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-dark"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" className="btn btn-dark">
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default CreateRequest;
