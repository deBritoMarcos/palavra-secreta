{/* Styles and Datas */}
import './styles/Game.css'

{/* React */}
import { useState, useRef } from 'react'

const Game = ({ 
    verifyLetter, 
    pickedWord,
    pickedCategory,
    letters,
    guessedLetters,
    wrongLetters,
    guesses,
    score,
}) => {
    const [guess, setGuess] = useState('');
    const guessInputRef = useRef(null);

    const handleSubmit = (event) => {
        event.preventDefault();

        verifyLetter(guess);

        setGuess('');

        guessInputRef.current.focus();
    }

    return (
        <div className='game'>
            <p className="points">
                <span>Pontuação: {score}</span>
            </p>
            <h1>Adivinha a palavra:</h1>
            <h3 className='tips'>
                Dica sobre a palavra: <span>{pickedCategory}</span>
            </h3>
            <p>Você ainda tem {guesses == 1 ? guesses + ' tentativa' : guesses + ' tentativas' }.</p>
            <div className="word_container">
                {letters.map((letter, i) => 
                    guessedLetters.includes(letter) ? (
                        <span key={i} className='letter'>{letter}</span>
                    ) : (
                        <span key={i} className='blank_square'></span>
                    )
                )}            
            </div>
            <div className="letter_container">
                <p>Tente adivinhar uma letra da palabra </p>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        name='letter' 
                        maxLength="1" 
                        required 
                        onChange={(event) => setGuess(event.target.value)}
                        value={guess}
                        ref={guessInputRef}
                    />
                    <button>Jogar!</button>
                </form>
            </div>
            <div className='wrong_letter_container'>
                <p>Letras já utilizadas:</p>
                {wrongLetters.map((letter, i) => (
                    <span key={i} >{letter}, </span>
                ))}
            </div>
        </div>
    )
}

export default Game