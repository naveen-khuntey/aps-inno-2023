import { combineReducers } from "redux";
import gameState from "./slices/gameState.slice";
import quiz from "./slices/quiz.slice";
import user from "./slices/user.slice";

export default combineReducers({ gameState, quiz, user });
