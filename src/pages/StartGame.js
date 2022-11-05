import React from "react";
import "./Styles.css";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/Button";
import { startGame } from "../store/slices/gameState.slice";
// import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

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
      <h1 className="hero glitch layers glow" id="head">RULES TO FOLLOW</h1>
      <br />
      <p>1. The player must check in with their login information or create an account if they do not already have one before beginning the game.</p>
      <p>2. The game will include a total of (say, 300) questions.</p>
      <p>3. The player starts the game with (eg.3) lives.</p>
      <p>4. The questions can be of two types namely- Normal and Special.</p>
      <p>5. The player has (eg. 12 seconds) to answer the question. One life will be lost if the question cannot be answered accurately in the allotted time.</p>
      <p>6. In addition, the player has access to Special questions, which can be utilized to earn time capsules which are the game's currency.</p>
      <p>7. Time bucket is your currency bank. It can be utilized for power-ups and displays the amount of time you saved by answering special questions.</p>
      <p>8. Earn as many points as possible by answering maximum questions and win exciting prices.</p>
      <br />
      <Button onClick={startGameHandler}>
        Start Game
      </Button>
      </div>
    </div>
  );
};

export default StartGame;
