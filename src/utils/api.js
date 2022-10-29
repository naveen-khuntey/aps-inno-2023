const apiUrl = "https://opentdb.com/api.php?amount=50&category=18&difficulty=medium&type=multiple";

//"https://opentdb.com/api.php?amount=10&type=boolean";
export const fetchQuiz = () => {
  return fetch(apiUrl)
    .then((res) => {
      return res.json();
    })
    .then((loadedQuestions) => loadedQuestions.results)
    .catch((error) => Promise.reject(error));
};
