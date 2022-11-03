import React from "react";
import { useDispatch } from "react-redux";
import { cancelFetchQuestions } from "../store/slices/gameState.slice";
import Button from "../components/Button";

const FetchingGamePage = () => {
  const dispatch = useDispatch();
  const cancelGameHandler = () => {
    dispatch(cancelFetchQuestions());
  };
  return (
    <div className="flex flex-col justify-center items-center mt-80">
      <div className="w-20 h-20 bg-rose-500 rounded-full flex items-center justify-center mb-12">
        <div className="w-16 h-16 bg-rose-200 rounded-full animate-bounce "></div>
      </div>
      <Button onClick={cancelGameHandler}>Cancel</Button>
    </div>
  );
};

export default FetchingGamePage;
