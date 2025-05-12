{/* Styles and Datas */}
import './App.css'
import { wordList } from './data/words'

{/* React */}
import { useCallback, useEffect, useState } from 'react'

{/* Components */}
import StartScreen from './components/StartScreen'
import Game from './components/Game';
import GameOver from './components/GameOver';

const stages = [
  {id: 1, name: 'start'},
  {id: 2, name: 'game'},
  {id: 3, name: 'end'}
];

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordList);
  const [pickedWord, setPickedWord] = useState('');
  const [pickedCategory, setPickedCategory] = useState('');
  const [letters, setLetters] = useState('');
 
  const pickWordAndCategory = () => {
    // pick a random category
    const categories = Object.keys(words);
    const category = categories[Math.floor(
      Math.random() * Object.keys(categories).length
    )];

    // pick a random word
    const word = words[category][Math.floor(Math.random() * words[category].length)];

    return {category, word};
  }
 
  const startGame = () => {
    const { word, category } = pickWordAndCategory();

    // Create a array of letters
    let wordLetters = word.split("");
    wordLetters = wordLetters.map((letter) => letter.toLowerCase());
    
    // Fill states
    setPickedCategory(category);
    setPickedWord(word);
    setLetters(wordLetters);

    setGameStage(stages[1].name);
  }

  const finishGame = () => {
    setGameStage(stages[2].name);
  }

  const retryGame = () => {
    setGameStage(stages[0].name)
  }

  return (
    <div className='app'>
      {gameStage === 'start' && <StartScreen startGame={startGame} />}
      {gameStage === 'game' && <Game finishGame={finishGame} />}
      {gameStage === 'end' && <GameOver retryGame={retryGame} />}
    </div>
  )
}

export default App
