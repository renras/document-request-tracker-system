import PropTypes from "prop-types";

function Options(props) {
  const data = [
    {
      text: "I'd like to request for a document.",
      handler: props.actionProvider.handleCreateRequest,
      id: 1,
    },
    {
      text: "I'd like to track my request",
      handler: props.actionProvider.handleTrackRequest,
      id: 2,
    },
  ];
  const optionsList = data.map((option) => (
    <button
      key={option.id}
      onClick={option.handler}
      className="btn btn-outline-primary"
    >
      {option.text}
    </button>
  ));
  return (
    <div className="d-flex flex-column justify-content-between gap-2">
      {optionsList}
    </div>
  );
}
export default Options;

Options.propTypes = {
  actionProvider: PropTypes.object,
};
