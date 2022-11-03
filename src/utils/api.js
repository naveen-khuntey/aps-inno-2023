const apiUrl = "http://localhost:3333/questions";

//"https://opentdb.com/api.php?amount=10&type=boolean";
export const fetchQuiz = () => {
  return fetch(apiUrl)
    .then((res) => {
      // console.log(res.json());
      return res.json();
    })
    .then((loadedQuestions) => loadedQuestions)
    .catch((error) => Promise.reject(error));
};
