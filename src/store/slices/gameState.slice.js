import { createSlice } from "@reduxjs/toolkit";
import {
  START_GAME,
  FETCHING_GAME,
  GAME,
  END_GAME,
  END_QUESTION
} from "../../utils/constants";
import { fetchQuestionsSuccess, fetchQuestionsFail } from "./quiz.slice";

const initialState = {
  stage: START_GAME,
  username: "",
};

const gameState = createSlice({
  name: "gameState",
  initialState,
  reducers: {
    startGame(state, action) {
      state.username = action.payload.username;
      state.stage = FETCHING_GAME;
    },
    cancelFetchQuestions(state) {
      state.stage = START_GAME;
    },
    finishQuestion(state){
      state.stage = END_QUESTION;
    },
    finishGame(state) {
      state.stage = END_GAME;
    },
    restartGame(state) {
      state.stage = START_GAME;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestionsSuccess, (state, action) => {
        state.stage = GAME;
      })
      .addCase(fetchQuestionsFail, (state, action) => {
        state.stage = START_GAME;
      });
  },
});

export const { startGame, cancelFetchQuestions, finishGame, restartGame, finishQuestion } =
  gameState.actions;

export default gameState.reducer;