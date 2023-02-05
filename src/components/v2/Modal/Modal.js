import ReactDom from "react-dom";
import PropTypes from "prop-types";

const Modal = ({ isOpen, children, onClose, className, style }) => {
  if (!isOpen) return null;

  return ReactDom.createPortal(
    <div
      className={`modal fade show`}
      tabIndex={-1}
      style={{
        display: isOpen ? "block" : "none",
        backgroundColor: "rgba(0, 0, 0, 0.30)",
      }}
      onClick={onClose}
    >
      <div className={`modal-dialog ${className}`} style={style}>
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
  className: PropTypes.string,
  style: PropTypes.object,
};
