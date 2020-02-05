/**
 * A class representing a game of hangman.
 */
class Hangman {

    /**
     * Create a new game of hangman.
     * @param {string} word - A string containing the word to be guessed.
     * @param {int} lives - A number stating the number of lives available to the player.
     */
    constructor(word, lives) {
        this._answer = word.toLowerCase()
        this._lives = lives
        this._guessed = []
        this._toFind = new Set(this._answer.replace(/[-' ]/g,"").toLowerCase().split(""))
    }


    /**
     * Perform a guess.
     * @param {string} string - String dictating the player guess.
     */
    guess(string) {
        if (string.length == 1) {
            return this.guessCharacter(string)
        } else {
            return this.guessWord(string)
        }
    }


    /**
     * Perform a guess for a specific character.
     * @param {char} char - Character dictating the player guess.
     * @return {bool} True if the character guess is correct.
     */
    guessCharacter(char) {
        if (this._answer.indexOf(char) > -1 && this._guessed.indexOf(char) == -1) {
            this._guessed.push(char)
            this._toFind.delete(char)
            return true
        }
        else {
            this._guessed.push(char)
            this._lives -= 1
            return false
        }
    }

    /**
     * Perform a guess for a specific word.
     * N.B. For a valid guess, word must be entirely, not partially correct.
     * @param {string} word - String dictating the player guess.
     * @return {bool} True if the string guess is correct.
     */
    guessWord(word) {
        let guess = word.replace(/[-' ]/g,"")
        let answer = this._answer.replace(/[-' ]/g,"")

        if (guess == answer) {
            this._guessed.push(word)
            this._toFind = new Set([])
            return true
        }
        else {
            this._guessed.push(word)
            this._lives -= 1
            return false
        }
    }

    /**
     * Checks whether the character is a valid guess.
     * @param {*} char - The character being guessed.
     * @return {bool} True if the guess can be played.
     */
    // Todo: Add regex to ensure move within accepted range.
    checkValidMove(char) {
        if (this._guessed.indexOf(char) == -1) {
            return true
        }
        else {
            return false
        }
    }

    /**
     * Checks whether the user still has lives left to play.
     * @return {bool} True if the user still has lives.
     */
    checkAlive() {
        if (this._lives > 0) {
            return true
        }
        else {
            return false
        }
    }

    /**
     * Checks whether the user has guessed all correct characters with lives remaining.
     * @return {bool} True if the user has won the game.
     */
    checkWon() {
        if (this._toFind.size == 0 && this._lives > 0) {
            return true
        }
        else {
            return false
        }
    }

}
export default Hangman