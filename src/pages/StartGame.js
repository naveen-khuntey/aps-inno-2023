import React from "react";
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
    <div className="flex flex-col justify-center items-center mt-80">
      <h1>Hello {username}</h1>
      <Button onClick={startGameHandler} addClassNames="mt-3">
        Start Game
      </Button>
    </div>
  );
};

export default StartGame;
