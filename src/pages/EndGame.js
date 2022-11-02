import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { restartGame } from "../store/slices/gameState.slice";
import Button from "../components/Button";

const EndGamePage = () => {
  const dispatch = useDispatch();
  const score = useSelector((state) => state.quiz.score);
  const answers = useSelector((state) => state.quiz.answers);

  const restartHandler = () => {
    dispatch(restartGame());
  };
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl text-rose-800 my-4">Game Over</h1>
      <h2 className="text-2xl mb-4">
        Your score was <span className="text-rose-700">{score}</span> out of
        10.
      </h2>
      <Button onClick={restartHandler}>Try Again</Button>
      <div className="mt-4 p-4">
        {answers.map((answer) => (
          <div
            key={answer.question}
            className="border-b-2 border-rose-300 flex justify-between bg-rose-100"
          >
            <span
              dangerouslySetInnerHTML={{ __html: answer.question }}
              className="mr-4 p-2"
            ></span>
            <span
              className={`p-2 ${
                answer.correctAnswer === answer.answer
                  ? "text-green-600"
                  : "text-red-700"
              }`}
            >
              {answer.answer}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EndGamePage;
