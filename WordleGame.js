import React, { useState } from "react";
import Button from "./components/Button";
import "./WordleGame.css";

const WORD_LIST = ["apple", "grape", "table", "chair","world"];
const TARGET_WORD = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];

const WordleGame = () => {
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameStatus, setGameStatus] = useState("playing");
  const [message, setMessage] = useState("");

  const checkGuess = (guess) => {
    return guess.split("" ).map((letter, i) => {
      if (letter === TARGET_WORD[i]) return "green";
      if (TARGET_WORD.includes(letter)) return "yellow";
      return "gray";
    });
  };

  

  const handleSubmit = () => {
    if (currentGuess.length !== 5 || guesses.length >= 6 || gameStatus !== "playing") return;
    if (!WORD_LIST.includes(currentGuess)) {
      setMessage("Invalid word! Try again.");
      return;
    }

    const feedback = checkGuess(currentGuess);
    const newGuesses = [...guesses, { word: currentGuess, feedback }];
    setGuesses(newGuesses);
    setCurrentGuess("");
    
    if (currentGuess === TARGET_WORD) {
      setGameStatus("won");
      setMessage("Congratulations! You Win! 🎉");
    } else if (newGuesses.length === 6) {
      setGameStatus("lost");
      setMessage(`You Lose! The word was ${TARGET_WORD.toUpperCase()}`);
    } else {
      setMessage("");
    }
  };

  return (
    <div className="game-container">
      <h1 className="game-title">Wordle Clone</h1>
      <div className="grid-container">
        {guesses.map(({ word, feedback }, index) => (
          <div key={index} className="word-row">
            {word.split("").map((letter, i) => (
              <div key={i} className={`letter-box ${feedback[i]}`}>{letter.toUpperCase()}</div>
            ))}
          </div>
        ))}
      </div>
      {message && <p className="game-message">{message}</p>}
      <input
        type="text"
        maxLength={5}
        value={currentGuess}
        onChange={(e) => setCurrentGuess(e.target.value.toLowerCase())}
        className="word-input"
      />
      <Button onClick={handleSubmit} className="submit-button">Submit</Button>
      <Button onClick={() => window.location.reload()} className="new-game-button">New Game</Button>
    </div>
  );
};

export default WordleGame;
