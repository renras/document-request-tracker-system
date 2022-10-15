import PropTypes from "prop-types";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";

const columns = [
  "Tracking Number",
  "Document",
  "Type",
  "Requested By",
  "Action",
];

const Table = ({ documents }) => {
  return (
    <table className="table mt-5 align-middle">
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th scope="col" key={index}>
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {documents.map((document) => {
          const { id, title, formType, requestedBy, status } = document;

          return (
            <tr key={id}>
              <td>{id}</td>
              <td>{title}</td>
              <td>{formType}</td>
              <td>{requestedBy}</td>
              {status === "INCOMING" && (
                <td>
                  <div className="d-flex gap-2">
                    <button className="btn btn-sm btn-light text-success">
                      <AiFillCheckCircle size={24} />
                    </button>
                    <button className="btn btn-sm btn-light text-danger">
                      <AiFillCloseCircle size={24} />
                    </button>
                  </div>
                </td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;

Table.propTypes = {
  documents: PropTypes.array,
};
