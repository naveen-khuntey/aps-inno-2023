import React from "react";
import StartGamePage from "./StartGame";
import GamePage from "./GamePage";
import EndGamePage from "./EndGame";
import FetchingGamePage from "./FetchingGamePage";
import { useSelector } from "react-redux";
import { START_GAME, FETCHING_GAME, GAME, END_GAME } from "../utils/constants";
import "./Styles.css";

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
    <div className="">

      {displayedPage}
    </div>
  );
};

export default MainPage;
