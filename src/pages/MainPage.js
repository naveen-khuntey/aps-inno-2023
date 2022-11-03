import React from "react";
import StartGamePage from "./StartGame";
import GamePage from "./GamePage";
import EndGamePage from "./EndGame";
import FetchingGamePage from "./FetchingGamePage";
import { useSelector } from "react-redux";
import { START_GAME, FETCHING_GAME, GAME, END_GAME } from "../utils/constants";

const MainPage = () => {
  const currentStage = useSelector((state) => state.gameState.stage);
  const currentIndex = useSelector((state) => state.quiz.currentQuestionIndex);

  let displayedPage;
  switch (currentStage) {
    case START_GAME:
      displayedPage = <StartGamePage />;
      break;
    case FETCHING_GAME:
      displayedPage = <FetchingGamePage />;
      break;
    case GAME:
      displayedPage = <GamePage />;
      break;
    case END_GAME:
      displayedPage = <EndGamePage />;
      break;
    default:
      break;
  }

  return (
    <div className="bg-rose-50 py-4 min-h-screen">
      <h1 className="bg-rose-900 mb-5 text-rose-100 p-5 w-3/4 rounded-lg drop-shadow-xl mx-auto text-3xl text-center">
        Race Against Time
      </h1>
      {displayedPage}
    </div>
  );
};

export default MainPage;
