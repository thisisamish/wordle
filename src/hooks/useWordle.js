import { useState } from "react";

const useWordle = (solution) => {
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [history, setHistory] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);

  const formatGuess = () => {
    let solutionArray = [...solution];
    let formattedGuess = [...currentGuess].map((letter) => {
      return { key: letter, color: "grey" };
    });

    formattedGuess.forEach((letter, position) => {
      if (solutionArray[position] === letter.key) {
        formattedGuess[position].color = "green";
        solutionArray[position] = null;
      }
    });

    formattedGuess.forEach((letter, position) => {
      if (solutionArray.includes(letter.key) && letter.color != "green") {
        formattedGuess[position].color = "yellow";
        solutionArray[solutionArray.indexOf(letter.key)] = null;
      }
    });

    return formattedGuess;
  };

  const addNewGuess = () => {};

  const handleKeyup = ({ key }) => {
    if (key === "Enter") {
      if (turn > 5) {
        console.log("You used all of your guesses.");
        return;
      }
      if (history.includes(currentGuess)) {
        console.log("You already tried that word.");
        return;
      }
      if (currentGuess.length != 5) {
        console.log("Word must be 5 characters long.");
        return;
      }
      const formatted = formatGuess();
      console.log(formatted);
    }
    if (key === "Backspace") {
      setCurrentGuess((prev) => {
        return prev.slice(0, -1);
      });
      return;
    }
    if (/^[A-Za-z]$/.test(key) && currentGuess.length < 5) {
      setCurrentGuess((prev) => {
        return prev + key;
      });
    }
  };

  return { turn, currentGuess, guesses, isCorrect, handleKeyup };
};

export default useWordle;