const apiUrl = "http://localhost:3333/Questions";


function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

//"https://opentdb.com/api.php?amount=10&type=boolean";
export const fetchQuiz = () => {
  return fetch(apiUrl)
    .then((res) => {
      // console.log(res.json());
      return res.json();
    })
    .then((loadedQuestions) => shuffle(loadedQuestions))
    .catch((error) => Promise.reject(error));
};
