import PropTypes from "prop-types";

const columns = ["Tracking Number", "Document", "Type", "Requested By"];

const Table = ({ documents }) => {
  return (
    <table className="table mt-5">
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
          const { id, title, type, requestedBy } = document;

          return (
            <tr key={id}>
              <td>{id}</td>
              <td>{title}</td>
              <td>{type}</td>
              <td>{requestedBy}</td>
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
