import React, { useEffect, useState } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  // useEffect hook to handle the timer logic
  useEffect(() => {
    // if timeRemaining reaches 0, reset the timer and call onAnswered with false
    if (timeRemaining === 0) {
      setTimeRemaining(10);
      onAnswered(false);
      return; 
    }

    // setting up a timeout to run after every 1 second
    const timerId = setTimeout(() => {
      // decrementing the time remaining
      setTimeRemaining((timeRemaining) => timeRemaining - 1);
    }, 1000);

    // cleanup function to clear the timeout if the component unmounts before the timer is done
    return function () {
      clearTimeout(timerId);
    };
  }, [timeRemaining, onAnswered]);

  // function to handle the answer, resets the timer and calls onAnswered with the correctness of the answer
  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
