import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { answerQuestion } from "../store/slices/quiz.slice";
import { finishGame } from "../store/slices/gameState.slice";
import Button from "../components/Button";
import { produceWithPatches } from "immer";
import "./Login.css";

//Index array of the special questions
const specialIndex = [];
for(let i = 0; i<60; i++){
  specialIndex[i] = Math.floor(Math.random()*5) + 5*i;
  // console.log(specialIndex[i]);
}

let time = 12;
const GamePage = () => {
  const dispatch = useDispatch();
  const [timeLeft, setTimeLeft] = useState(12);
  const [fiftyfifty, activatefiftyfifty] = useState(false);
  const question = useSelector(
    (state) => state.quiz.questions[state.quiz.currentQuestionIndex].question
  );
  const options = useSelector(
    (state) => state.quiz.questions[state.quiz.currentQuestionIndex].option
  );
  const correctanswer = useSelector(
    (state) => state.quiz.questions[state.quiz.currentQuestionIndex].correct_answer
  );
  
  // console.log(options);
  const score = useSelector((state) => state.quiz.score);
  const currency = useSelector((state) => state.quiz.currency);
  const currentIndex = useSelector((state) => state.quiz.currentQuestionIndex);
  const lives = useSelector((state) => state.quiz.lives);

  //Special Question
  const [x, setX] = useState(0);
  const [specialQues, setspcialQues] = useState("");
  const wrongFinder = (value) => value !== correctanswer;
  const wrong = options.filter(wrongFinder);
  useEffect(()=>{
    if(currentIndex===specialIndex[x]){
      setX(x=>x+1);
      setspcialQues(prev=>"Special Question!");
      console.log("x = ",x);
    } else{
      setspcialQues(prev=>"");
    }
  }, [currentIndex]);

  useEffect(() => {
    const interval = setInterval(() => {

      console.log("Time left", time);
      time--;
      if (time !== -1) {
        setTimeLeft((prev) => prev - 1);
      } else {
      answerHandler("Bleh");
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

  const resetTimer = () => {
    time = 12;
    setTimeLeft(12);
  };
  const answerHandler = async (answer) => {
    let questionType = true;
    let time_left = timeLeft;
    await dispatch(answerQuestion({ answer, time_left, questionType }));
    activatefiftyfifty(false);
    resetTimer();

  };

  const fiftyop = () => {
    activatefiftyfifty(true);
  }

  const restartHandler = () => {
    dispatch(finishGame());
  };

  return (
    <>
      <div className="flex flex-col items-center relative">
        <p className="h-20 w-20 flex justify-center items-center border-8 border-purple-500 rounded-full my-4 text-3xl text-purple-500">
          {timeLeft}
        </p>
        <p className="absolute top-4 left-4 text-2xl text-purple-500">
          Lives left: {lives}x❤️
        </p>
        <p className="absolute top-4 right-4 text-2xl text-purple-500">
          Question no: {currentIndex+1}
        </p>
        <p className="absolute top-20 right-4 text-2xl text-purple-500">
          Chronons: {currency}
        </p>

        <p className="absolute top-10 right-4 text-2xl text-purple-500">
          {specialQues}
        </p>

        <p
          dangerouslySetInnerHTML={{ __html: question }}
          className="p-7 bg-white rounded shadow "
        ></p>
        <div className="flex justify-center w-96 mt-8 space-x-20">
        <>
        {!fiftyfifty && options && options.map((choice) => {
          return(<Button onClick={() => answerHandler(choice)}>{choice}</Button>);
        })}
        </>
        <>
        {fiftyfifty && wrong && 
        <>
          <Button onClick={() => answerHandler(wrong[0])}>{wrong[0]}</Button>
          <Button onClick={() => answerHandler(correctanswer)}>{correctanswer}</Button>
        </>
        }
        </>
          {/* <Button onClick={() => answerHandler("True")}>True</Button>
          <Button onClick={() => answerHandler("False")}>False</Button> */}
        </div>
        <div className="fifty">
        {
          !fiftyfifty && <Button onClick={() => fiftyop()}>50-50</Button>
        }
        {
          fiftyfifty && <Button  disabled onClick={() => fiftyop()}>50-50</Button>
        }
        </div>
      </div>
      <div className="absolute bottom-4 right-4">
        <Button onClick={restartHandler} type="error">
          Quit Game
        </Button>
      </div>
    </>
  );
};

export default GamePage;
