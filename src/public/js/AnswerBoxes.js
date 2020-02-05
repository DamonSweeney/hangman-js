/**
 * A class handling the answer box element of the UI.
 */
class AnswerBoxes {

    /**
     * Create a new answer box object.
     * @param {string} word - A string containing the word to be guessed.
     * @param {Element} container - HTML element that will contain the answer boxes.
     */
    constructor(word, container) {
        this._answer = word.toLowerCase()
        this._container = container
        this.drawBoxes()
    }


    /**
     * Draw the emptied answer boxes for the word to be guessed.
     */
    drawBoxes() {
        let len = this._answer.length
        let div = document.createElement('div')

        for (var i = 0; i < len; i++) {
            let v = this._answer.charAt(i)
            let elem = document.createElement('span')
            div.appendChild(elem)

            if (v == '-') {
                this._container.appendChild(div)
                elem.className += 'hyphen'
                elem.innerText = '-'
                div = document.createElement('div')
            }
            if (v == ' ') {
                this._container.appendChild(div)
                elem.className += 'space'
                elem.innerText = ' '
                div = document.createElement('div')
            }
            if (v == "'") {
                this._container.appendChild(div)
                elem.className += 'apostrophe'
                elem.innerText = "'"
                div = document.createElement('div')
            }
        }
        this._container.appendChild(div)
    }


    /**
     * Draw the given character or word onto the corresponding answer boxes.
     */
    drawAnswer(word) {
        let count = 0
        let answerBoxes = this._container.children

        for (const child of answerBoxes) {
            for (const elem of child.children) {
                let v = this._answer.charAt(count)
                if (v == word) {
                    elem.innerText = word.toUpperCase()
                }
                count++
            }
        }
    }

}
export default AnswerBoxes