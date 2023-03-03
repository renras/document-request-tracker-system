import PropTypes from "prop-types";
import Notification from "./Notification";

const NotificationBox = ({ data, onClick }) => {
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
        <Notification data={data} key={index} onClick={() => onClick(data)} />
      ))}
    </div>
  );
};

export default NotificationBox;

NotificationBox.propTypes = {
  data: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};
