import PropTypes from "prop-types";

const Modal = ({ id, children }) => {
  return (
    <div
      id={id}
      className="modal fade"
      tabIndex="-1"
      aria-labelledby="modal-title"
      aria-hidden="true"
    >
      {children}
    </div>
  );
};

export default Modal;

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
};
