import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "../components/Button";
import { startGame } from "../store/slices/gameState.slice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

const StartGame = () => {
  var name=auth.currentUser.email;
  const Dispatch = useDispatch();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log(auth.email);
    }
  });
  
  const startGameHandler = () => {
    Dispatch(startGame({name}));
  };
  return (
    <div className="flex flex-col justify-center items-center mt-80">
      <h1>Hello {auth.currentUser.email}</h1>
      <Button onClick={startGameHandler}>Start Game</Button>
    </div>
  );
};

export default StartGame;
