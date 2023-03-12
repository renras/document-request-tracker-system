import PropTypes from "prop-types";
import { CgProfile } from "react-icons/cg";

const Notification = ({ data, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-100"
      style={{ background: data.isRead ? "#fff" : "#f5f5f5" }}
    >
      <div className="w-100 border p-3">
        <div className="d-flex align-items-start gap-3">
          <div>
            <CgProfile size={25} />
          </div>

          <div>
            <b>{data.sender.firstName + data.sender.lastName}</b> {data.body}
          </div>
        </div>
      </div>
    </button>
  );
};

export default Notification;

Notification.propTypes = {
  data: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};
