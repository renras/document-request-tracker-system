import { useState } from "react";
import Dropdown from "../../../components/ui/Dropdown/Dropdown";

const FORM_TYPES = [
  { label: "Choose form type", value: "" },
  {
    label: "Form 1",
    value: "form1",
  },
  {
    label: "Form 2",
    value: "form2",
  },
];

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
    <div id="modal" className="modal" tabIndex="-1">
      <form className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Create a Document</h5>
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
              Save changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateRequest;
