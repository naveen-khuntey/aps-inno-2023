import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { answerQuestion } from "../store/slices/quiz.slice";
import { finishGame } from "../store/slices/gameState.slice";
import Options from "../components/Options";
import "./Styles.css";

import { FaHeart } from 'react-icons/fa';
import money from "./images/currency.png";

//Index array of the special questions
const specialIndex = [];

for(let i = 0; i<60; i++){
  specialIndex[i] = Math.floor(Math.random()*5) + 5*i;
}

let time = 120;
const GamePage = () => {
  const dispatch = useDispatch();
  const [timeLeft, setTimeLeft] = useState(120);
  const answers = useSelector((state) => state.quiz.answers);
  const question = useSelector(
    (state) => state.quiz.questions[state.quiz.currentQuestionIndex].question
  );
  

  const score = useSelector((state) => state.quiz.score);
  const currency = useSelector((state) => state.quiz.currency);
  const currentIndex = useSelector((state) => state.quiz.currentQuestionIndex);
  const lives = useSelector((state) => state.quiz.lives);

  //Special Question
  const [x, setX] = useState(0);
  const [specialQues, setspcialQues] = useState("");
  useEffect(()=>{
    if(currentIndex===specialIndex[x]){
      setX(x=>x+1);
      setspcialQues(prev=>"Special Question!");
    } else{
      setspcialQues(prev=>"");
    }
    
  }, [currentIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      time--;
      if (time !== -1) { 
        setTimeLeft((prev) => prev-1); 
      } else {
      dispatch(answerQuestion({ answer: "unanswered" }));
        resetTimer();
      }

    }, 1000); 

    return () => {
      clearInterval(interval);
      if(lives < 2){
        dispatch(finishGame())
      }
      
      
    };
  }, [lives]);

  // useEffect(() => {
  //   if(answers[currentIndex].isCorrect){
  //     console.log("YAY ITS CORRECT")
  //   }

  //   }, []);

  const resetTimer = () => {
    time = 120;
    setTimeLeft(120);
  };

  const answerHandler = async (answer) => {
    let questionType = true;
    let time_left = timeLeft;
    dispatch(answerQuestion({ answer, time_left, questionType }));
    console.log(answers)
    
    resetTimer();

  };

  return (
    <>
    <div className="game_page">
    <div className="nav">
         <h2 class="" id="nav_head" data-text="THE TIMELESS SAGA"><span>THE TIMELESS SAGA</span></h2>
        <div className="helpers">
          <p className="">
          <FaHeart className="fa_helpers heart"/> </p> <div className="fa_helpers helpers_no">{lives}</div>
          
          {/* <p className="">
            {currentIndex+1}
          </p> */}
          <p className="">
          <img className= "fa_helpers money" src={money} /> </p> <div className="fa_helpers helpers_no">{currency}</div>
          
        </div>
    </div>
    <p className="timer">
    {(() => {
            let minutes=Math.floor(timeLeft/60);
            let seconds=timeLeft%60;
            if(seconds<10)
            {
              return (
              <h1>0{minutes}:0{seconds}</h1>
            )
            }
            else {
              return (
                <h1>0{minutes}:{seconds} </h1>
              )
        }
      })()}
    </p>
    <div className="question_part">
        <div className="questions">
        Question {currentIndex+1} :
        <p
          dangerouslySetInnerHTML={{ __html: question }}
          className=""
        ></p>
        <div className="option_part">
          <div className="options">
            <Options onClick={() => answerHandler("True")}></Options>
            <h2>True</h2>
          </div>
          
          <div className="options">
            <Options onClick={() => answerHandler("False")}></Options>
            <h2>False</h2>
          </div>
          
        </div>
      </div>
        <div className="lifelines">
            <div className="lifeline">
              <Link className="lifeline_btn_container"><h1 className="lifeline_btn llb1">+</h1></Link>
              <br />
            </div>
            <h3 className="pts">20 pts</h3>
            <div className="lifeline">
              <Link className="lifeline_btn_container"><h1 className="lifeline_btn llb2">+</h1></Link>
              <br />
            </div>
            <h3 className="pts">20 pts</h3>
            <div className="lifeline">
              <Link className="lifeline_btn_container"><h1 className="lifeline_btn llb3">+</h1></Link>
              <br />
            </div>
            <h3 className="pts">30 pts</h3>
            <div className="lifeline">
              <Link className="lifeline_btn_container"><h1 className="lifeline_btn llb4">+</h1></Link>
              <br />
            </div>
            <h3 className="pts">40 pts</h3>
        </div>
    </div>
  </div>
  </>
  );
};

export default GamePage;
