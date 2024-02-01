function StartScreen({ dispatch, highscore, children }) {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>

      <h3>Your highscore: {highscore}</h3>

      {children}

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
