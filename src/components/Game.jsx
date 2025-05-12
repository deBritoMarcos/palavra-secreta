import './styles/Game.css'

const Game = ({ finishGame }) => {
  return (
    <div className='game'>
        <p className="points">
            <span>Pontuação: 000</span>
        </p>
        <h1>Adivinha a palavra:</h1>
        <h3 className='tips'>
            Dica sobre a palavra: <span>Dica ...</span>
        </h3>
        <div className="word_container">
            <span className='letter'>A</span>
            <span className='blank_square'></span>
        </div>
        <div className="letterContainer">
            <p>Tente adivinhar uma letra da palabra </p>
            <form action="">
                <input type="text" name='letter' maxLength="1" required />
                <button>Jogar!</button>
            </form>
        </div>
        <div className='wrongLetterContainer'>
            <p>Letras já utilizadas:</p>
            <span>a,</span>
            <span>b,</span>
        </div>
    </div>
  )
}

export default Game