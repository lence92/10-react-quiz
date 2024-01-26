function StartScreen({ maxNumQuestions, dispatch }) {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <div className="form-group">
        <label htmlFor="numQuestions" className="form-label">
          Choose number of questions to test your React mastery:
        </label>
        <input
          type="number"
          id="numQuestions"
          className="form-input"
          min={0}
          max={maxNumQuestions}
          defaultValue={maxNumQuestions}
          onChange={(e) =>
            dispatch({ type: "setNumQuestions", payload: e.target.value })
          }
        />
      </div>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let's start
      </button>
    </div>
  );
}

export default StartScreen;
