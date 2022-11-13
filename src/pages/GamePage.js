import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { answerQuestion } from "../store/slices/quiz.slice";
import { addLives } from "../store/slices/quiz.slice";
import { finishGame } from "../store/slices/gameState.slice";
import { Lifeline } from "../store/slices/quiz.slice";
import Button from "../components/Button";
import { produceWithPatches } from "immer";
import "./Login.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Options from "../components/Options";
import "./Styles.css";
import fifty from "./images/50-50icon.png"
import extime from "./images/hourglass-time-icon-extra-time.jpg"
import life from "./images/life.jpg"
import Warp from "./images/redss.mp4"
import Flame from "./images/Flame1.mp4"
import { FaHeart } from 'react-icons/fa';
import Wimg from './images/redimg.png';
import flip from './images/flip.png';
import flameimg from './images/flameimg.png';
import money from "./images/currency.png";

//Index array of the special questions

const specialIndex = [];
for (let i = 0; i < 60; i++) {
  specialIndex[i] = Math.floor(Math.random() * 5) + 5 * i;
  // console.log(specialIndex[i]);
}

let time = 120;
const GamePage = () => {
  const dispatch = useDispatch();
  const [timeLeft, setTimeLeft] = useState(120);
  const [fiftyfifty, activatefiftyfifty] = useState(false);
  const [extratime, activateextratime] = useState(false);
  const [extralife, activateextralife] = useState(false);
  const [flipop, activateflipop] = useState(false);
  const [nos, setNos] = useState(0);
  const question = useSelector(
    (state) => state.quiz.questions[state.quiz.currentQuestionIndex].question
  );
  const options = useSelector(
    (state) => state.quiz.questions[state.quiz.currentQuestionIndex].option
  );
  const correctanswer = useSelector(
    (state) => parseInt(state.quiz.questions[state.quiz.currentQuestionIndex].correct_answer, 10)
  );
  
  console.log(correctanswer);
  const score = useSelector((state) => state.quiz.score);



  

  //const score = useSelector((state) => state.quiz.score);
  const currency = useSelector((state) => state.quiz.currency);
  const currentIndex = useSelector((state) => state.quiz.currentQuestionIndex);
  let lives = useSelector((state) => state.quiz.lives);
  // lives+=uplives?1:0;
  console.log("Lives", lives);
  const end = async() => {
    await dispatch(finishGame());
   }
  if (lives === 0) {
    end();
  }

  //Special Question
  const [x, setX] = useState(0);
  const [specialQues, setspcialQues] = useState("");
  const wrongFinder = (value) => value !== options[correctanswer];
  const wrong = options.filter(wrongFinder);
  useEffect(()=>{
    if((currentIndex-nos)===specialIndex[x]){
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

  const addtime = () => {
    time+=30;
    setTimeLeft((prev) => {
      return (prev+30);
    });
  }

  const livesAdder = async ()=>{
    await dispatch(addLives({extraLives: 1}));
  }
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}



  const answerHandler = async (answer) => {
    let questionType = (specialQues === "Special Question!") ? true : false;
    let time_left = timeLeft;
    for (let i = 0; i < 2; i++) {
        // console.log(`Waiting ${i} seconds...`);
        await sleep(i * 1000);
    }
    // console.log('Done');
    await dispatch(answerQuestion({ answer, time_left, questionType }));
    activatefiftyfifty(false);
    activateextratime(false);
    activateextralife(false);
    activateflipop(false);
    resetTimer();
  };

  const flipopfunc = async(answer) => {
    const res = true;
    setNos((prev) => {
      return (prev+1);
    })
    let time_left = timeLeft;
    await dispatch(answerQuestion({ answer: answer, time_left: time_left, questionType: res }));
    await dispatch(Lifeline({lifeline: "flip"}));
    activateflipop(true);
  }

// <<<<<<< HEAD
  const fiftyop = async() => {
    await dispatch(Lifeline({lifeline: "fifty"}));
    activatefiftyfifty(true);
  }
  const extratimeop = async() => {
    await dispatch(Lifeline({lifeline: "time"}));
    activateextratime(true);
    addtime();
  }
  const extralifeop = async() => {
    await dispatch(Lifeline({lifeline: "life"}));
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
    {/* <video src={Warp} class="video-container" loop autoplay muted></video> */}
    {specialQues === "Special Question!" 
      ? <div> 
        <video id="background-video" autoPlay loop muted poster={Wimg}>
          <source src={Warp} type="video/mp4"/>
        </video>
        </div>
      : <div></div>
    }
    {specialQues !== "Special Question!" 
      ? <div> 
        <video id="background-video" autoPlay loop muted poster={flameimg}>
          <source src={Flame} type="video/mp4"/>
        </video>
        </div>
      : <div></div>
    }
    <div className={specialQues === "Special Question!" ? "special_page" : "special_page"}>
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
          {specialQues === "Special Question!" ? <h1 className="spq">Special Question!</h1> : <div></div>}
          Question {currentIndex+1-nos} :
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
                <h2 className={choice === options[correctanswer] ? "op right" : "op wrong"} onClick={() => answerHandler(choice)}>{choice}</h2>
              </div>
              );
            })}
            </>
            <>
            {fiftyfifty && wrong && 
            <>
            <div className="options">
              <Options className="options" onClick={() => answerHandler(wrong[0])}></Options>
              <h2 className="op wrong" onClick={() => answerHandler(wrong[0])}>{wrong[0]}</h2>
            </div>
            <div className="options">
              <Options className="options" onClick={() => answerHandler(options[correctanswer])}></Options>
              <h2 className="op right" onClick={() => answerHandler(options[correctanswer])}>{options[correctanswer]}</h2>
            </div>
            </>
            }
            </>
        </div>
          
        </div>
      </div>
      {specialQues !== "Special Question!" ?
      <div>
        <h1 className="life">LIFELINES</h1>
        <div className="lifelines">
            <div className="lifeline">
              {/* <Link className="lifeline_btn_container"><h1 className="lifeline_btn llb2">+</h1></Link> */}
              {/* <div className="lifeline_btn_container"> */}
                {
                  !extratime && (currency>=20) && <Link onClick={() => extratimeop()}><img src={extime} className="Logo1" alt="Logo" /></Link>
                }
                {
                  (extratime || (currency<20)) && <Link  disabled><img src={extime} className="Logodisabled" alt="Logo" /></Link>
                }
              {/* </div> */}
              <br />
            </div>
            <h3 className="pts">20 <img className= "fa_helpers lifemoney" style={{height: "16px", width : "16px"}} src={money} /></h3>
            <div className="lifeline">
            
              {/* <Link className="lifeline_btn_container"><h1 className="lifeline_btn llb1">+</h1></Link> */}
              {/* <div className="lifeline_btn_container"> */}
                {
                  !fiftyfifty && (currency>=40) && <Link onClick={() => fiftyop()}><img src={fifty} className="Logo1" alt="Logo" /></Link>
                }
                {
                  (fiftyfifty || (currency<40)) && <Link  disabled ><img src={fifty} className="Logodisabled" alt="Logo" /></Link>
                }
              {/* </div> */}
              <br />
            </div>
            <h3 className="pts">40 <img className= "fa_helpers lifemoney" style={{height: "16px", width : "16px"}} src={money} /></h3>


            <div className="lifeline">
                {
                  !flipop && (currency>=40) && <Link onClick={() => flipopfunc("Unanswered")}><img src={flip} className="Logo1" alt="Logo" /></Link>
                }
                {
                  (flipop || (currency<40)) && <Link  disabled ><img src={flip} className="Logodisabled" alt="Logo" /></Link>
                }
              <br />
            </div>
            <h3 className="pts">40 <img className= "fa_helpers lifemoney" style={{height: "16px", width : "16px"}} src={money} /></h3>
            <div className="lifeline">
              {/* <Link className="lifeline_btn_container"><h1 className="lifeline_btn llb3">+</h1></Link> */}
              {/* <div className="lifeline_btn_container"> */}
                {
                  !extralife && (currency>=100) && <Link onClick={() => extralifeop()}><img src={life} className="Logo1" alt="Logo" /></Link>
                }
                {
                  (extralife || (currency<100)) && <Link  disabled ><img src={life} className="Logodisabled" alt="Logo" /></Link>
                }
                {/* </div> */}
              <br />
            </div>
            <h3 className="pts">100 <img className= "fa_helpers lifemoney" style={{height: "16px", width : "16px"}} src={money} /></h3>
        </div>
        </div>
        : <div></div>
      }
    </div>
  
  </>
// >>>>>>> 62997b1f31df4095a559dbb89110df327586ea52
  );
};

export default GamePage;
