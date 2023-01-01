import ReactDom from "react-dom";
import PropTypes from "prop-types";

const Modal = ({ isOpen, children, onClose }) => {
  if (!isOpen) return null;

  console.log(onClose);
  return ReactDom.createPortal(
    <div
      className="modal fade show"
      tabIndex={-1}
      style={{ display: isOpen ? "block" : "none" }}
      onClick={onClose}
    >
      <div className="modal-dialog">
        <div className="modal-content">{children}</div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default Modal;

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.node,
  onClose: PropTypes.func,
};
