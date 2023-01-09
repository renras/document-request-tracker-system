// function Options(props)
function Options() {
  const data = [
    {
      text: "I'd like to request for a document.",
      // handler: props.actionProvider.handleLinuxQuiz,
      id: 1,
    },
    {
      text: "I'd like to track my request",
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
    <div className="d-flex justify-content-between gap-2">{optionsList}</div>
  );
}
export default Options;
