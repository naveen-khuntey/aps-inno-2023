import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { answerQuestion } from "../store/slices/quiz.slice";
import { addLives } from "../store/slices/quiz.slice";
import { finishGame } from "../store/slices/gameState.slice";
import Button from "../components/Button";
import { produceWithPatches } from "immer";
import "./Login.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Options from "../components/Options";
import "./Styles.css";
import { FaHeart } from 'react-icons/fa';
import money from "./images/currency.png";

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

  // useEffect(() => {
  //   if(answers[currentIndex].isCorrect){
  //     console.log("YAY ITS CORRECT")
  //   }

  //   }, []);

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

// <<<<<<< HEAD
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

  // return (
  //   <>
  //     <div className="flex flex-col items-center relative">
        
        
        
        

       

  //       {/* <p
  //         dangerouslySetInnerHTML={{ __html: question }}
  //         className="p-7 bg-rose-200 rounded shadow "
  //       ></p> */}
  //       <div className="flex justify-center w-96 mt-8 space-x-20">
  //       <>
  //       {!fiftyfifty && options && options.map((choice) => {
  //         return(<Button onClick={() => answerHandler(choice)}>{choice}</Button>);
  //       })}
  //       </>
  //       <>
  //       {fiftyfifty && wrong && 
  //       <>
  //         <Button onClick={() => answerHandler(wrong[0])}>{wrong[0]}</Button>
  //         <Button onClick={() => answerHandler(correctanswer)}>{correctanswer}</Button>
  //       </>
  //       }
  //       </>
  //         {/* <Button onClick={() => answerHandler("True")}>True</Button>
  //         <Button onClick={() => answerHandler("False")}>False</Button> */}
  //       </div>
  //       {/* <button className={disable2?'bg-rose-500 hover:bg-rose-700 focus:outline-none py-3 px-6 text-white rounded':'bg-gray-400 focus:outline-none py-3 px-6 text-gray-300 rounded'} disabled={!disable2} onClick={addtime}>Gain some time</button>
  //         <button className={disable1?'bg-rose-500 hover:bg-rose-700 focus:outline-none py-3 px-6 text-white rounded':'bg-gray-400 focus:outline-none py-3 px-6 text-gray-300 rounded'} disabled={!disable1} onClick={livesAdder}>A Cat has 8 lives, now you will have 4</button> */}
  //       <div className="fifty">
  //       {
  //         !fiftyfifty && <Button onClick={() => fiftyop()}>50-50</Button>
  //       }
  //       {
  //         fiftyfifty && <Button  disabled >50-50</Button>
  //       }
  //       </div>
  //       <div className="fifty">
  //       {
  //         !extratime && <Button onClick={() => extratimeop()}>Extra Time</Button>
  //       }
  //       {
  //         extratime && <Button  disabled>Extra Time</Button>
  //       }
  //       </div>
        
  //       <div className="fifty">
  //       {
  //         !extralife && <Button onClick={() => extralifeop()}>Extra Life</Button>
  //       }
  //       {
  //         extralife && <Button  disabled >Extra Life</Button>
  //       }
  //       </div>
  //     </div>
  //     <Popup
  //       trigger={
  //         <button className="m-11 bg-rose-500 focus:outline-none py-3 px-6 text-white rounded">
  //           Use LifeLine
  //         </button>
  //       }
  //       position="right center"
  //     >
  //       <div className="grid gap-4 p-3">
          
  //       </div>
  //     </Popup>
  //     <div className="absolute bottom-4 right-4">
  //       <Button onClick={restartHandler}>Quit Game</Button>
  //     </div>
  //   </>
// =======
  return (
    <>
    <div className="game_page">
    <div className="nav">
         <h2 class="" id="nav_head" data-text="THE TIMELESS SAGA"><span>THE TIMELESS SAGA</span></h2>
        <div className="helpers">
          <p className="absolute top-10 right-4 text-2xl text-rose-700">
            {specialQues}
          </p>
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
          {/* <div className="options">
            <Options onClick={() => answerHandler("True")}></Options>
            <h2>True</h2>
          </div>
          
          <div className="options">
            <Options onClick={() => answerHandler("False")}></Options>
            <h2>False</h2> */}
            <>
            {!fiftyfifty && options && options.map((choice) => {
              return(
              <div className="options">
                <Options onClick={() => answerHandler(choice)}></Options>
                <h2>{choice}</h2>
              </div>
              );
            })}
            </>
            <>
            {fiftyfifty && wrong && 
            <>
            <div className="options">
              <Options className="options" onClick={() => answerHandler(wrong[0])}></Options>
              <h2>{wrong[0]}</h2>
            </div>
            <div className="options">
              <Options className="options" onClick={() => answerHandler(correctanswer)}></Options>
              <h2>{correctanswer}</h2>
            </div>
            </>
            }
            </>
        </div>
          
        </div>
      </div>
        <div className="lifelines">
            <div className="lifeline">
              {/* <Link className="lifeline_btn_container"><h1 className="lifeline_btn llb1">+</h1></Link> */}
              <div className="lifeline_btn_container">
                {
                  !fiftyfifty && <Link onClick={() => fiftyop()}><h1 className="lifeline_btn llb1">+</h1></Link>
                }
                {
                  fiftyfifty && <Link  disabled ><h1 className="lifeline_btn llb1">+</h1></Link>
                }
              </div>
              <br />
            </div>
            <h3 className="pts">20 pts</h3>
            <div className="lifeline">
              {/* <Link className="lifeline_btn_container"><h1 className="lifeline_btn llb2">+</h1></Link> */}
              <div className="lifeline_btn_container">
                {
                  !extratime && <Link onClick={() => extratimeop()}><h1 className="lifeline_btn llb2">+</h1></Link>
                }
                {
                  extratime && <Link  disabled><h1 className="lifeline_btn llb2">+</h1></Link>
                }
              </div>
              <br />
            </div>
            <h3 className="pts">20 pts</h3>
            <div className="lifeline">
              {/* <Link className="lifeline_btn_container"><h1 className="lifeline_btn llb3">+</h1></Link> */}
              <div className="lifeline_btn_container">
                {
                  !extralife && <Link onClick={() => extralifeop()}><h1 className="lifeline_btn llb3">+</h1></Link>
                }
                {
                  extralife && <Link  disabled ><h1 className="lifeline_btn llb3">+</h1></Link>
                }
                </div>
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
  
  </>
// >>>>>>> 62997b1f31df4095a559dbb89110df327586ea52
  );
};

export default GamePage;
