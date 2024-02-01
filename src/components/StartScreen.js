import { LEVELS } from "./App";

function StartScreen({
  maxNumQuestions,
  numQuestions,
  dispatch,
  level,
  highscore,
}) {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>

      <h3>Your highscore: {highscore}</h3>

      <div className="form-group mx-30">
        <label className="form-label grid-label">
          Choose difficulty level:
        </label>
        <div className="form-group-inline-grid">
          <label className="btn btn-ui grid-option-easy">
            <input
              type="radio"
              name="level"
              className="radio-btn"
              value={LEVELS.EASY}
              checked={level === LEVELS.EASY}
              onChange={() =>
                dispatch({ type: "setLevel", payload: LEVELS.EASY })
              }
            />
            Easy
          </label>
          <label className="btn btn-ui grid-option-medium">
            <input
              type="radio"
              name="level"
              className="radio-btn"
              value={LEVELS.MEDIUM}
              checked={level === LEVELS.MEDIUM}
              onChange={() =>
                dispatch({ type: "setLevel", payload: LEVELS.MEDIUM })
              }
            />
            Medium
          </label>
          <label className="btn btn-ui grid-option-hard">
            <input
              type="radio"
              name="level"
              className="radio-btn"
              value={LEVELS.HARD}
              checked={level === LEVELS.HARD}
              onChange={() =>
                dispatch({ type: "setLevel", payload: LEVELS.HARD })
              }
            />
            Hard
          </label>
          <label className="btn btn-ui grid-option-all">
            <input
              type="radio"
              name="level"
              className="radio-btn"
              value={LEVELS.ALL}
              checked={level === LEVELS.ALL}
              onChange={() =>
                dispatch({ type: "setLevel", payload: LEVELS.ALL })
              }
            />
            All
          </label>
        </div>
      </div>

      <div className="form-group-inline mx-30">
        <label htmlFor="numQuestions" className="form-label">
          Choose number of questions to test your React mastery:
        </label>
        <input
          type="number"
          id="numQuestions"
          className="form-input"
          min={0}
          max={maxNumQuestions}
          value={numQuestions}
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
