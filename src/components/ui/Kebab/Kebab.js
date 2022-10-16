import PropTypes from "prop-types";
import { BiMenu } from "react-icons/bi";

const Kebab = ({ id, options, onChange, className = "" }) => {
  return (
    <div className={`dropdown ${className}`}>
      <button
        id={id}
        className={`btn btn-sm  btn-light d-flex justify-content-between align-items-center`}
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <BiMenu size={24} />
      </button>
      <ul className="dropdown-menu w-100">
        {options.map((option) => {
          if (option.value) {
            return (
              <li
                className="dropdown-item"
                key={option.value}
                onClick={() => onChange(option)}
                style={{ cursor: "pointer" }}
              >
                {option.label}
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
};

export default Kebab;

Kebab.propTypes = {
  id: PropTypes.string,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};
