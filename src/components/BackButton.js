function BackButton({ dispatch, index }) {
  if (index > 0)
    return (
      <button
        className="btn btn-ui-left"
        onClick={() => dispatch({ type: "previousQuestion" })}
      >
        Back
      </button>
    );
}

export default BackButton;
