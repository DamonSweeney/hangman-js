/**
 * A class handling the health bar element of the UI.
 */
class Healthbar {

    /**
     * Create a new healthbar object.
     * @param {int} lives - The number of live sthe player has available.
     * @param {Element} currElem - HTML element displaying the current number of lives.
     * @param {Element} maxElem - HTML element displaying the maximum number of lives.
     */
    constructor(lives, currElem, maxElem) {
        this._maxLives = lives
        this._currLives = lives
        this._currElem = currElem
        this._maxElem = maxElem
        this._redThreshold = 0.25;
        this._amberThreshold = 0.5;
        this._greenThreshold = 1.0;

        this._currElem.innerHTML = lives
        this._maxElem.innerHTML = lives
        this.update()
    }


    /**
     * Decrement the helthbar.
     */
    decrement() {
        this._currLives -= 1
        this._currElem.innerText = this._currLives
        this.update()
    }

    
    /**
     * Update and redraw the healthbar.
     */
    update() {
        let percent = this._currLives / this._maxLives

        if (percent <= this._redThreshold) {
            this._currElem.classList = 'red'
        }
        else if (percent <= this._amberThreshold) {
            this._currElem.classList = 'amber'
        }
        else {
            this._currElem.classList = 'green'
        }
    }

}
export default Healthbar