import { LEVELS } from "./App";

function DifficultyLevel({ level, dispatch }) {
  return (
    <div className="form-group mx-30">
      <label className="form-label grid-label">Choose difficulty level:</label>
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
            onChange={() => dispatch({ type: "setLevel", payload: LEVELS.ALL })}
          />
          All
        </label>
      </div>
    </div>
  );
}

export default DifficultyLevel;
