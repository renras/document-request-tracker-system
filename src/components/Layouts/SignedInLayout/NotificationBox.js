import PropTypes from "prop-types";
import { CgProfile } from "react-icons/cg";

const NotificationBox = ({ data }) => {
  return (
    <div
      className="border"
      style={{
        width: "25rem",
        background: "#fff",
      }}
    >
      <div className="border border-bottom-2 border-top-0 border-start-0 border-end-0 p-2 px-3 fs-6 fw-bold">
        Notifications
      </div>

      {/* notifications */}
      {data.map((data, index) => (
        <div
          className="w-100"
          key={index}
          style={{ background: data.isRead ? "#fff" : "#f5f5f5" }}
        >
          <div className="w-100 border p-3">
            <div className="d-flex align-items-start gap-3">
              <div>
                <CgProfile size={25} />
              </div>
              <div>
                <b>{data.sender.fullName}</b> {data.body}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationBox;

NotificationBox.propTypes = {
  data: PropTypes.array.isRequired,
};
