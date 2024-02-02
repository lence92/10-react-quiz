import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";
import BackButton from "./BackButton";
import DifficultyLevel from "./DifficultyLevel";
import NumberOfQuestions from "./NumberOfQuestions";

const SECS_PER_QUESTION = 30;

export const LEVELS = {
  EASY: 10,
  MEDIUM: 20,
  HARD: 30,
  ALL: 0,
};

const initialState = {
  questions: [],
  filteredQuestions: [],
  // 'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
  index: 0,
  answers: [],
  points: 0,
  highscore: 0,
  secondsRemaning: null,
  numQuestions: 0,
  level: LEVELS.ALL,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload.questions,
        filteredQuestions: action.payload.questions,
        numQuestions: action.payload.questions.length,
        highscore: action.payload.highscore.highscore,
        status: "ready",
      };

    case "dataFailed":
      return {
        ...state,
        status: "error",
      };

    case "setNumQuestions":
      return {
        ...state,
        numQuestions: action.payload,
      };

    case "setLevel":
      const filteredQuestions = state.questions.filter(
        (question) =>
          (action.payload !== 0 && question.points === action.payload) ||
          action.payload === 0
      );

      return {
        ...state,
        level: action.payload,
        filteredQuestions: filteredQuestions,
        numQuestions: filteredQuestions.length,
      };

    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaning: state.numQuestions * SECS_PER_QUESTION,
      };

    case "newAnswer":
      const question = state.filteredQuestions.at(state.index);

      return {
        ...state,
        answers: [...state.answers, action.payload],
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };

    case "nextQuestion":
      return { ...state, index: state.index + 1 };

    case "previousQuestion":
      return { ...state, index: state.index - 1 };

    case "finish":
      fetch(
        "https://my-json-server.typicode.com/lence92/10-react-quiz/highscore",
        {
          method: "PUT",
          body: JSON.stringify({
            highscore:
              state.points > state.highscore ? state.points : state.highscore,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );

      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };

    case "restart":
      // return {
      //   ...state,
      //   status: "ready",
      //   index: 0,
      //   answer: null,
      //   points: 0,
      // };
      return {
        ...initialState,
        questions: state.questions,
        filteredQuestions: state.questions,
        numQuestions: state.questions.length,
        highscore: state.highscore,
        status: "ready",
      };

    case "tick":
      return {
        ...state,
        secondsRemaning: state.secondsRemaning - 1,
        status: state.secondsRemaning === 0 ? "finished" : state.status,
      };

    default:
      throw new Error("Action unkonwn");
  }
}

export default function App() {
  const [
    {
      filteredQuestions,
      status,
      index,
      answers,
      points,
      highscore,
      secondsRemaning,
      numQuestions,
      level,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const maxPossiblePoints = filteredQuestions
    .filter((question, index) => index < numQuestions)
    .reduce((prev, cur) => prev + cur.points, 0);

  useEffect(() => {
    Promise.all([
      fetch(
        "https://my-json-server.typicode.com/lence92/10-react-quiz/questions"
      ),
      fetch(
        "https://my-json-server.typicode.com/lence92/10-react-quiz/highscore"
      ),
    ])
      .then(([resQuestions, resHighscore]) =>
        Promise.all([resQuestions.json(), resHighscore.json()])
      )
      .then(([dataQuestions, dataHighscore]) => {
        dispatch({
          type: "dataReceived",
          payload: { questions: dataQuestions, highscore: dataHighscore },
        });
      })
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen highscore={highscore} dispatch={dispatch}>
            <DifficultyLevel level={level} dispatch={dispatch} />
            <NumberOfQuestions
              maxNumQuestions={filteredQuestions.length}
              numQuestions={numQuestions}
              dispatch={dispatch}
            />
          </StartScreen>
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answers[index] ?? null}
            />
            <Question
              question={filteredQuestions[index]}
              dispatch={dispatch}
              answer={answers[index] ?? null}
            />
            <Footer>
              <BackButton dispatch={dispatch} index={index} />
              <NextButton
                dispatch={dispatch}
                answer={answers[index] ?? null}
                index={index}
                numQuestions={numQuestions}
              />
              <Timer dispatch={dispatch} secondsRemaning={secondsRemaning} />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
