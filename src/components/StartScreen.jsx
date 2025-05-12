import './styles/StartScreen.css'

const StartScreen = ({ startGame }) => {
    return (
        <div className='start-screen'>
            <h1>Palavra Secreta</h1>
            <p>Clique no botão abaixo para iniciar</p>
            <button onClick={startGame}>Começar o Jogo</button>
        </div>
    )
}

export default StartScreen