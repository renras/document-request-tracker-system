import { MdDateRange } from "react-icons/md";
import DatePicker from "react-datepicker";
import PropTypes from "prop-types";

const Filters = ({
  search,
  onSearchChange,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}) => {
  return (
    <div className="d-flex gap-4 mt-5">
      <input
        type="text"
        className="form-control"
        placeholder="Search by name"
        style={{ maxWidth: "384px " }}
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <div className="d-flex gap-2 align-items-center">
        <label className="form-label m-0" htmlFor="startDate">
          From:
        </label>
        <div className="position-relative" style={{ width: "130px" }}>
          <DatePicker
            className="form-control"
            selected={startDate}
            onChange={(date) => onStartDateChange(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            dateFormat="MM/dd/yyyy"
            placeholderText="Start Date"
          />
          <MdDateRange
            className="position-absolute top-50 translate-middle-y"
            size={20}
            color="#6c757d"
            style={{ right: "10px" }}
          />
        </div>
      </div>
      <div className="d-flex align-items-center gap-2">
        <label className="form-label m-0" htmlFor="endDate">
          To:
        </label>
        <div className="position-relative" style={{ width: "130px" }}>
          <DatePicker
            className="form-control"
            selected={endDate}
            onChange={(date) => onEndDateChange(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            dateFormat="MM/dd/yyyy"
            placeholderText="End Date"
          />

          <MdDateRange
            className="position-absolute top-50 translate-middle-y"
            size={20}
            color="#6c757d"
            style={{ right: "10px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Filters;

Filters.propTypes = {
  search: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  onStartDateChange: PropTypes.func.isRequired,
  onEndDateChange: PropTypes.func.isRequired,
};
