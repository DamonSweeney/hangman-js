import Hangman from './Hangman.js'
import HangmanAnimation from './HangmanAnimation.js'
import Healthbar from './Healthbar.js'
import AnswerBoxes from './AnswerBoxes.js'

class HangmanUI {

    /**
     * Instantiate an instance of the hangman UI.
     */
    constructor() {
        let menu = document.getElementById('menu')
        let game = document.getElementById('game')
        let over = document.getElementById('over')
        this._states = {"menu": menu, "game": game, "over": over}
        this.activateState(menu)

        this._word      = null
        this._game      = null
        this._healthbar = null
        this._animation = null
        this._answerbox = null
    }


    /**
     * Transition to the next game state.
     * Valid states: menu, game, gameover
     * - menu -> game
     * - game -> gameover
     * - gameover -> menu
     */
    nextUIState() {
        if (this._activeState == this._states['menu']) {
            this.setupGame()
            this.activateState(this._states['game'])
            return
        }
        if (this._activeState == this._states['game']) {
            this.hideGameUI()
            setTimeout(() => {this.activateState(this._states['over'])}, 2500)
            return
        }
        if (this._activeState == this._states['over']) {
            location.reload(true);
            return
        }
    }

    /**
     * Cover UI with overlay.
     */
    hideGameUI() {
        document.getElementById('player-card').style.opacity = 0.2;
    }

    /**
     * Activate the provided UI state.
     * @param {Element} newState - The state to be set to active.
     */
    activateState(newState) {
        for (const [name, state] of Object.entries(this._states)) {
            state.style.display = 'none'
        }

        newState.style.display = 'flex'
        this._activeState = newState
    }


    /**
     * Setup the game with the input word and lives.
     */
    setupGame() {
        let word = document.getElementById('word-field').value
        let lives = document.querySelector('input[name="lives"]:checked').value
        let currLivesElement = document.getElementById('held')
        let maxLivesElement  = document.getElementById('max')
        let answerContainer  = document.getElementById('answer-boxes')

        this._word      = word
        this._game      = new Hangman(word, lives)
        this._healthbar = new Healthbar(lives, currLivesElement, maxLivesElement)
        this._answerbox = new AnswerBoxes(word, answerContainer)
        this._animation = new HangmanAnimation(lives)
    }


    /**
     * Perform a guess.
     */
    makeGuess() {
        let guess = document.getElementById('guess-field').value.trim()
        document.getElementById('guess-field').value = ''

        // Ignore erroneous inputs without updating game state.
        if (!guess.match(/^[a-z0-9-' ]{1,32}$/g) || !this._game.checkValidMove(guess)) {
            return
        }

        let validGuess = this._game.guess(guess)
        let elem = document.createElement('span')
        let guessArea = document.getElementById('guesses')
        elem.innerText = guess
        guessArea.appendChild(elem)

        if (validGuess) {
            this._answerbox.drawAnswer(guess)
            elem.className += 'correct'
        } else {
            this._healthbar.decrement()
            this._animation.draw()
            elem.className += 'incorrect'
        }

        this.checkGameState()
    }


    /**
     * Check the state of the game and update the UI accordingly.
     * Three possible outcomes, continue playing, won game, lost game.
     */
    checkGameState() {
        let alive = this._game.checkAlive()
        let won = this._game.checkWon()
        let gameState = document.getElementById('winning-state')
        let answerField = document.getElementById('word-answer')

        if (!alive) {
            answerField.innerText = this._word
            gameState.innerText = "You lose"
            answerField.classList.add('lose')
            gameState.classList.add('lose')
            this.nextUIState()
        }
        if (won) {
            answerField.innerText = this._word
            gameState.innerText = "You win"
            answerField.classList.add('win')
            gameState.classList.add('win')
            this.nextUIState()
        }
    }

}

let ui = new HangmanUI()

// Handle start game clicked.
document.getElementById('start-game').addEventListener('click', (e) => {
    ui.nextUIState()
})

// Handle restart game clicked.
document.getElementById('restart-game').addEventListener('click', (e) => {
    ui.nextUIState()
})

// Handle submit guess clicked.
document.getElementById('guess-submit').addEventListener('click', (e) => {
    ui.makeGuess()
})

// Handle return key pressed for guess submit.
document.addEventListener('keypress', (event) => {
    if (event.keyCode == 13) {
        document.getElementById('guess-submit').click()
    }
})