import { Doughnut } from "react-chartjs-2";
import PropTypes from "prop-types";

const Card = ({ count, data, label }) => {
  return (
    <div className="shadow-sm p-3 d-inline-flex gap-2 align-items-center">
      <div className="ps-3">
        <div className="fs-5" style={{ maxWidth: "150px", fontWeight: 400 }}>
          {label}
        </div>
        <div style={{ fontSize: "64px", fontWeight: "600" }}>{count}</div>
      </div>
      <div style={{ width: "150px" }}>
        <Doughnut data={data} />
      </div>
    </div>
  );
};

export default Card;

Card.propTypes = {
  count: PropTypes.number,
  data: PropTypes.object,
  label: PropTypes.string,
};
