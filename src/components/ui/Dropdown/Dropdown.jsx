import PropTypes from "prop-types";

const Dropdown = ({ value, options, onChange }) => {
  return (
    <div className="dropdown">
      <button
        className="form-control d-flex justify-content-between align-items-center dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {value.label}
      </button>
      <ul className="dropdown-menu w-100">
        {options.map((option) => {
          if (option.value) {
            return (
              <li
                className="dropdown-item"
                key={option.value}
                onClick={() => onChange(option)}
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

export default Dropdown;

Dropdown.propTypes = {
  value: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};
