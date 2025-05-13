{/* Styles and Datas */}
import './App.css'
import { wordList } from './data/words'

{/* React */}
import { useCallback, useEffect, useState } from 'react'

{/* Components */}
import StartScreen from './components/StartScreen'
import Game from './components/Game';
import GameOver from './components/GameOver';

{/* Game stages */}
const stages = [
  {id: 1, name: 'start'},
  {id: 2, name: 'game'},
  {id: 3, name: 'end'}
];

{/* Total of attempts of user */}
const totalAttempts = 3;

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordList);

  const [pickedWord, setPickedWord] = useState('');
  const [pickedCategory, setPickedCategory] = useState('');
  const [letters, setLetters] = useState('');

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(totalAttempts);
  const [score, setScore] = useState(0);
 
  const pickWordAndCategory = useCallback(() => {
    // pick a random category
    const categories = Object.keys(words);
    const category = categories[Math.floor(
      Math.random() * Object.keys(categories).length
    )];

    // pick a random word of category
    const word = words[category][Math.floor(Math.random() * words[category].length)];

    return {category, word};
  }, [words]);
 
  const startGame = useCallback(() => {
    clearLetterStates();

    const { word, category } = pickWordAndCategory();

    // Create a array of letters
    let wordLetters = word.split("");
    wordLetters = wordLetters.map((letter) => letter.toLowerCase());
    
    // Fill states
    setPickedCategory(category);
    setPickedWord(word);
    setLetters(wordLetters);

    setGameStage(stages[1].name);
  }, [pickWordAndCategory]);

  const verifyLetter = (guess) => {
    const normalizedLetter = guess.toLowerCase();

    // check if letter has already been utilized
    if (guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)) {
      return ;
    }

    // push to correct letters
    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter,
      ]);
      return;
    }

    // push to wrong letters
    setWrongLetters((actualWrongLetters) => [
      ...actualWrongLetters,
      normalizedLetter,
    ]);

    setGuesses((totalGuesses) => totalGuesses - 1)
    return;
  };

  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  };

  // Lose Event
  useEffect(() => {
    if (guesses <= 0) {
      clearLetterStates();

      setGameStage(stages[2].name);
    }
  }, [guesses]);

  // Win Event
  useEffect(() => {
    const uniqueLetters = [... new Set(letters)];

    // win condition
    if (guessedLetters.length === uniqueLetters.length) {
      setScore((actualScore) => actualScore += 100);

      startGame();
    }

  }, [guessedLetters, letters, startGame]);

  const retryGame = () => {
    setScore(0);
    setGuesses(totalAttempts);

    setGameStage(stages[0].name)
  };

  return (
    <div className='app'>
      {gameStage === 'start' && <StartScreen startGame={startGame} />}
      {gameStage === 'game' && <Game 
        verifyLetter={verifyLetter}
        pickedWord={pickedWord}
        pickedCategory={pickedCategory}
        letters={letters}
        guessedLetters={guessedLetters}
        wrongLetters={wrongLetters}
        guesses={guesses}
        score={score}
      />}
      {gameStage === 'end' && <GameOver retryGame={retryGame} score={score} />}
    </div>
  )
}

export default App
