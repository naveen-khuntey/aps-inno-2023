import React from "react";
import "./Styles.css";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/Button";
import { startGame } from "../store/slices/gameState.slice";
// import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import fifty from "./images/50-50icon.png"
import extime from "./images/hourglass-time-icon-extra-time.jpg"
import life from "./images/life.jpg"
import flip from './images/flip.png';
import money from "./images/currency.png";


const StartGame = () => {
  const username = useSelector((state) => state.user.username);
  var name = auth.currentUser.email;
  const Dispatch = useDispatch();
  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     const uid = user.uid;
  //     console.log(auth.email);
  //   }
  // });

  const startGameHandler = () => {
    Dispatch(startGame({ name }));
  };
  
  return (
    <div className="body">
      <div className="bg-image"></div>

      <div className="bg-text">
      <h1 className="hero glitch layers glow" id="head">GAME TERMINOLOGIES</h1>
      <br />
      <p>1. Normal Question - These questions are non-skippable. Not answering a question correctly within the given time will cost one of the available lives of the player. The game ends when the player has 0 lives.</p>
      <p>2. Special Question - These questions reward the player with Time Kronos. The faster you answer the special question, the more kronos you get. They appear randomly throughout the game. Not answering them would not cost any life. Look out for them, people!</p>
      <p>3. Time Kronos - The fundamental currency of the game. The more kronos you have, the more lifelines you can use.</p>
      <p>
        4. Lifelines - These are your saviour when you get stuck with a normal question. Use them optimally to get away with spending the least amount of kronos while also saving your lives. There are four different timelines available.
      </p>
      <br />
        <ul>
          <li>Time Warp <img src={extime} className="Logostart" alt="Logo" /> -<em> Gives you an extra time of 30 seconds. Costs 20 kronos (<img className= "fa_helpers lifemoney" style={{height: "16px", width : "16px", display : "inline"}} src={money} />).</em></li>
          <li>Thanos’ snap <img src={fifty} className="Logostart" alt="Logo" /> - <em>Removes two incorrect options. Costs 40 kronos (<img className= "fa_helpers lifemoney" style={{height: "16px", width : "16px", display : "inline"}} src={money} />).</em></li>
          <li>Divine Disguise <img src={flip} className="Logostart" alt="Logo" /> - <em>Changes the question once for you to answer. Costs 40 kronos (<img className= "fa_helpers lifemoney" style={{height: "16px", width : "16px", display : "inline"}} src={money} />).</em></li>
          <li>Rebirth <img src={life} className="Logostart" alt="Logo" /> - <em>Provides you with an extra life. Costs 100 kronos (<img className= "fa_helpers lifemoney" style={{height: "16px", width : "16px", display : "inline"}} src={money} />).</em></li>
        </ul>
      

      <br />
      <h1 className="hero glitch layers glow" id="head">RULES TO FOLLOW</h1>
      <br />
      <p>1. The game's goal is to answer as many questions as possible using all possible means available.</p>
      <p>2. Every question should be answered within 2 mins.</p>
      <p>3. Answering each question gives you 1 point.</p>
      <p>4. The game ends when you have 0 lives left.</p>
      <br />
      <Button onClick={startGameHandler}>
        Start Game
      </Button>
      </div>
    </div>
  );
};

export default StartGame;
