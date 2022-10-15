import PropTypes from "prop-types";

const Dropdown = ({
  id,
  value,
  options,
  onChange,
  className = "",
  size = "sm",
}) => {
  return (
    <div className={`dropdown ${className}`}>
      <button
        id={id}
        className={`form-control ${
          size === "lg" ? "form-control-lg" : ""
        } d-flex justify-content-between align-items-center dropdown-toggle`}
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
  id: PropTypes.string,
  value: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  size: PropTypes.oneOf(["sm", "lg"]),
};
