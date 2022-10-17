import React from "react";
import StartGamePage from "./StartGame";
import GamePage from "./GamePage";
import EndGamePage from "./EndGame";
import FetchingGamePage from "./FetchingGamePage";
import { useSelector } from "react-redux";
import { START_GAME, FETCHING_GAME, GAME, END_GAME } from "../utils/constants";

const MainPage = () => {
  const currentStage = useSelector((state) => state.gameState.stage);

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
    <div className="font-mono bg-purple-50 min-h-screen ">
      <h1 className="bg-purple-500 text-white p-4 text-2xl text-center uppercase">
        Quiz Game
      </h1>
      {displayedPage}
    </div>
  );
};

export default MainPage;
