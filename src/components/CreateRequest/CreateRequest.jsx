import { useState } from "react";
import styles from "./CreateRequest.module.css";
import Dropdown from "../ui/Dropdown/Dropdown";

const FORM_TYPES = [
  { label: "Choose Form Type", value: "" },
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
    <form className="mw-sm shadow-sm rounded border w-100 py-5 px-4">
      <h1 className="h3">Create a Document</h1>

      {/* title */}
      <label className="form-label mt-4" htmlFor="title">
        Title
      </label>
      <input className="form-control" type="text" id="title" name="" />

      <label htmlFor="form-type" className="form-label mt-3">
        Form Type
      </label>
      <Dropdown
        id="form-type"
        value={formType}
        options={FORM_TYPES}
        onChange={(option) => setFormType(option)}
      />

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
      <div className={styles.formGroup}>
        <div className={styles.formGroup}>
          <label className="form-label mt-4" htmlFor="purpose">
            Purpose
          </label>
          <textarea name="purpose" id="" cols="30" rows="10"></textarea>
          <div className={styles.cta}>
            <button>Submit</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreateRequest;
