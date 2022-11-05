import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { answerQuestion } from "../store/slices/quiz.slice";
import { addLives } from "../store/slices/quiz.slice";
import { finishGame } from "../store/slices/gameState.slice";
import Button from "../components/Button";
import { produceWithPatches } from "immer";
import "./Login.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

//Index array of the special questions

const specialIndex = [];
for (let i = 0; i < 60; i++) {
  specialIndex[i] = Math.floor(Math.random() * 5) + 5 * i;
  console.log(specialIndex[i]);
}

let time = 13;
const GamePage = () => {
  const dispatch = useDispatch();
  const [timeLeft, setTimeLeft] = useState(12);
  const [fiftyfifty, activatefiftyfifty] = useState(false);
  const [extratime, activateextratime] = useState(false);
  const [extralife, activateextralife] = useState(false);
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



  

  //const score = useSelector((state) => state.quiz.score);
  const currency = useSelector((state) => state.quiz.currency);
  const currentIndex = useSelector((state) => state.quiz.currentQuestionIndex);
  let lives = useSelector((state) => state.quiz.lives);
  // lives+=uplives?1:0;

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
      answerHandler("Unanswered");
        resetTimer();
      }
    }, 1000);

    return () => {
      clearInterval(interval);
      if (lives === 0) {
        dispatch(finishGame());
      }
    };
  }, [lives]);

  const resetTimer = () => {
    time = 13;
    setTimeLeft(13);
  };

  const addtime = () => {
    time = 20;
    setTimeLeft((prev) => {
      return (prev+time);
    });
  }

  const livesAdder = async ()=>{
    await dispatch(addLives({extraLives: 1}));
  }

  const answerHandler = async (answer) => {
    let questionType = (specialQues === "Special Question!") ? true : false;
    let time_left = timeLeft;
    await dispatch(answerQuestion({ answer, time_left, questionType }));
    activatefiftyfifty(false);
    activateextratime(false);
    activateextralife(false);
    resetTimer();
  };

  const fiftyop = () => {
    activatefiftyfifty(true);
  }
  const extratimeop = () => {
    activateextratime(true);
    addtime();
  }
  const extralifeop = () => {
    activateextralife(true);
    livesAdder();
  }

  const restartHandler = () => {
    dispatch(finishGame());
  };

  return (
    <>
      <div className="flex flex-col items-center relative">
        <p className="h-20 w-20 flex justify-center items-center border-8 border-rose-700 rounded-full my-4 text-3xl text-rose-500">
          {timeLeft}
        </p>
        <p className="absolute top-4 left-4 text-2xl text-rose-700">
          Lives left: {lives}x❤️
        </p>
        <p className="absolute top-4 right-4 text-2xl text-rose-700">
          Question no: {currentIndex + 1}
        </p>
        <p className="absolute top-20 right-4 text-2xl text-rose-700">
          Chronons: {currency}
        </p>

        <p className="absolute top-10 right-4 text-2xl text-rose-700">
          {specialQues}
        </p>

        <p
          dangerouslySetInnerHTML={{ __html: question }}
          className="p-7 bg-rose-200 rounded shadow "
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
        {/* <button className={disable2?'bg-rose-500 hover:bg-rose-700 focus:outline-none py-3 px-6 text-white rounded':'bg-gray-400 focus:outline-none py-3 px-6 text-gray-300 rounded'} disabled={!disable2} onClick={addtime}>Gain some time</button>
          <button className={disable1?'bg-rose-500 hover:bg-rose-700 focus:outline-none py-3 px-6 text-white rounded':'bg-gray-400 focus:outline-none py-3 px-6 text-gray-300 rounded'} disabled={!disable1} onClick={livesAdder}>A Cat has 8 lives, now you will have 4</button> */}
        <div className="fifty">
        {
          !fiftyfifty && <Button onClick={() => fiftyop()}>50-50</Button>
        }
        {
          fiftyfifty && <Button  disabled >50-50</Button>
        }
        </div>
        <div className="fifty">
        {
          !extratime && <Button onClick={() => extratimeop()}>Extra Time</Button>
        }
        {
          extratime && <Button  disabled>Extra Time</Button>
        }
        </div>
        
        <div className="fifty">
        {
          !extralife && <Button onClick={() => extralifeop()}>Extra Life</Button>
        }
        {
          extralife && <Button  disabled >Extra Life</Button>
        }
        </div>
      </div>
      <Popup
        trigger={
          <button className="m-11 bg-rose-500 focus:outline-none py-3 px-6 text-white rounded">
            Use LifeLine
          </button>
        }
        position="right center"
      >
        <div className="grid gap-4 p-3">
          
        </div>
      </Popup>
      <div className="absolute bottom-4 right-4">
        <Button onClick={restartHandler}>Quit Game</Button>
      </div>
    </>
  );
};

export default GamePage;
