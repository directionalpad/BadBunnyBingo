import BoardSquare from './board-square.js';
import Bank from './bank.js';

export default class Board {
    constructor(boardState = undefined) {
        this._bank = [...Bank];
        this._squares = [];

        // Create board if no state is present
        if(!boardState) {
            this.generateNewBoard();
        }
    }

    generateNewBoard() {
        let tempBank = [...Bank];

        for(let i = 0; i < 25; i++) {
            if(i !== 12) {      // Non-Free Space Squares
                let item = tempBank[Math.floor(Math.random() * tempBank.length)]
                tempBank = tempBank.filter(function(value) {
                    if(item !== value) {
                        return value;
                    }
                });

                this._squares.push(new BoardSquare(this._bank.indexOf(item), false, false));
            } else {           // Free Space
                this._squares.push(new BoardSquare(-1, false, true));
            }
        }
    }

    getBoardMarkup() {
        let boardMarkup = "<tr>";

        for(let i = 1; i < this._squares.length + 1; i++) {
            boardMarkup += this._squares[i - 1].toHtml();
            if(i % 5 === 0) {
                boardMarkup += "</tr><tr>"
            }
        }

        return boardMarkup + "</tr>";
    }

    generateBoardHash() {

    }

    getSquares() {
        return this._squares;
    }
}