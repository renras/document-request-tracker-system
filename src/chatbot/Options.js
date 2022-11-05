// function Options(props)
function Options() {
  const data = [
    {
      text: "Question 1",
      // handler: props.actionProvider.handleLinuxQuiz,
      id: 1,
    },
    {
      text: "Question 2",
      id: 2,
    },
    {
      text: "Question 3",
      id: 3,
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
  return <div className="d-flex justify-content-between">{optionsList}</div>;
}
export default Options;
