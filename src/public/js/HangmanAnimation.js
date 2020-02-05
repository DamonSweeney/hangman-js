/**
 * A class controlling the SVG hangman animation.
 */
class HangmanAnimation {

    /**
     * Create a new hangman animation object.
     * @param {int} lives - The number of lives the player has available.
     */
    constructor(lives) {
        // Deconstruct SVG hangman into component parts.
        const baseBar       = document.getElementById('base-bar')
        const mainBar       = document.getElementById('main-bar')
        const topBar        = document.getElementById('top-bar')
        const supportBar    = document.getElementById('support-bar')
        const ropeConnector = document.getElementById('rope-connector')
        const rope          = document.getElementById('rope')
        const head          = document.getElementById('head')
        const torso         = document.getElementById('torso')
        const leftArm       = document.getElementById('left-arm')
        const rightArm      = document.getElementById('right-arm')
        const leftLeg       = document.getElementById('left-leg')
        const rightLeg      = document.getElementById('right-leg')
        const options = {
            12: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            10: [1, 2, 1, 2, 1, 1, 1, 1, 1, 1],
            8:  [1, 2, 1, 2, 1, 1, 2, 2],
            6:  [3, 1, 2, 2, 2, 2],
            4:  [6, 2, 2, 2],
            2:  [6, 6]
        }

        this._lives = options[lives]
        this._parts = [baseBar, mainBar, topBar, supportBar, ropeConnector, rope, head, torso, leftArm, rightArm, leftLeg, rightLeg]
        this.start()
    }

    /**
     * Start the pulsating animation for the first segment.
     */
    start() {
        let indexes = this._lives[0]
        for (var i = 0; i < indexes; i++) {
            this._parts[i].classList = 'pulse'
        }
    }

    /**
     * Draw part of the hangman and animate the next segment.
     */
    draw() {
        // Set lost body parts to static.
        let lost = this._lives.shift()
        for (var i = 0; i < lost; i++) {
            this._parts[i].classList = ''
            this._parts[i].style.fillOpacity = 1.0
        }
        this._parts = this._parts.slice(lost)

        // Set next body parts to pulsating.
        if (this._lives.length > 0) {
            let indexes = this._lives[0]
            for (var i = 0; i < indexes; i++) {
                this._parts[i].classList = 'pulse'
            }
        }
    }

}
export default HangmanAnimation