import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  questions: [],
  error: null,
  score: null,
  lives: null,
  tottime: null,
  currency: null,
  currentQuestionIndex: null,
  answers: [],
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    fetchQuestionsSuccess(state, action) {
      state.questions = action.payload;
      state.lives=3;
      state.score = 0;
      state.tottime = 0;
      state.currency = 0;
      state.currentQuestionIndex = 0;
      state.answers = [];
    },
    fetchQuestionsFail(state, action) {
      state.error = action.payload;
    },
    Lifeline(state, action){
      if(action.payload.lifeline === "fifty"){
        state.currency -= 60;
      }else if(action.payload.lifeline === "time"){
        state.currency -= 40;
      }else if(action.payload.lifeline === "life"){
        state.currency -= 80;
      }else{
        state.currency -= 40;
      }
    },
    answerQuestion(state, action) {
      const currentQuestion = state.questions[state.currentQuestionIndex];

      state.score += action.payload.answer === currentQuestion.option[currentQuestion.correct_answer] ? 1 : 0;
      // state.lives -= action.payload.answer === currentQuestion.correct_answer ? 0 : 1;

      state.lives -=
        (action.payload.questionType === true) || (action.payload.questionType===false
          && action.payload.answer === currentQuestion.option[currentQuestion.correct_answer])
          ? 0
          : 1;

      state.currency +=
        action.payload.questionType &&
        action.payload.answer === currentQuestion.option[currentQuestion.correct_answer]
          ? action.payload.time_left
          : 0;


      state.tottime +=
        action.payload.answer === currentQuestion.option[currentQuestion.correct_answer]
        ? action.payload.time_left
        : 0;

      


      state.answers.push({
        question: currentQuestion.question,
        answer: action.payload.answer,
        correctAnswer: currentQuestion.option[currentQuestion.correct_answer],
        isCorrect: action.payload.answer === currentQuestion.option[currentQuestion.correct_answer],
      });
    },
    nextQuestion(state) {
      state.currentQuestionIndex += 1;
    },
    addLives(state, action) {
      state.lives += action.payload.extraLives;
    },
  },
});

export const {
  fetchQuestionsSuccess,
  fetchQuestionsFail,
  Lifeline,
  answerQuestion,
  nextQuestion,
  addLives,
} = quizSlice.actions;

export default quizSlice.reducer;
