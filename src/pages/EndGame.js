import React, { useEffect,useState } from "react";
import { getDatabase, ref,update } from "firebase/database";
import { auth } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { restartGame } from "../store/slices/gameState.slice";
import Button from "../components/Button";
import "./Styles.css";

const EndGamePage = () => {
  const dispatch = useDispatch();
  const score = useSelector((state) => state.quiz.score);

function writeScore() {
const db = getDatabase();
const updatedScore={
  score:score,
}
  const updates = {};
  updates['/users/' + auth.currentUser.uid+'/score/'] = updatedScore;
  return update(ref(db), updates);
}

useEffect(()=>{
writeScore();
},[]);

  const restartHandler = () => {
    dispatch(restartGame());
  };
  return (
    <div className="game-over">
      <div className="nav">
         <h2 class="" id="nav_head" data-text="THE TIMELESS SAGA"><span>THE TIMELESS SAGA</span></h2>
    </div>
    <div className="game_score">
      <h1 className="hero glitch layers glow glow2 glow3 glow4 glow5">Game Over</h1>
      <h2 className="">
        Your score is <span className="">{score}</span>
      </h2>
      <Button onClick={restartHandler}>Try Again</Button>
      </div>
       <div className="mt-4 p-4">
        {/* {answers.map((answer) => (
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
        ))} */}
        
      </div> 
    </div>
  );
};

export default EndGamePage;
