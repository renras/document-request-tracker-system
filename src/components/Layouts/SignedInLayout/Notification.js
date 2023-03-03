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

          {data.type === "REQUEST" && (
            <div>
              <b>{data.sender.fullName}</b> {data.body}
            </div>
          )}

          {data.type === "REQUEST_UPDATE" && (
            <div>
              <b>{data.recipient.fullName}</b> {data.body}
            </div>
          )}
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
