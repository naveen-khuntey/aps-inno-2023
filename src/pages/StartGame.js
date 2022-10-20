import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "../components/Button";
import { startGame } from "../store/slices/gameState.slice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
const StartGame = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log(auth);
    }
  });

  const startGameHandler = () => {
    dispatch(startGame({email}));
  };
  return (
    <div className="flex flex-col justify-center items-center mt-80">
      <h1>Hi There!</h1>
      <input type='text' value={email} onChange={e => setEmail(e.target.value)} />
      <Button onClick={startGameHandler}>Start Game</Button>
    </div>
  );
};

export default StartGame;
