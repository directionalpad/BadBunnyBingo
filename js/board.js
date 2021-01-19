import BoardSquare from './board-square.js';
import Bank from './bank.js';
import FreeSpaceBank from './free-space-bank.js';
import cookie from './cookie.js';

export default class Board {
    constructor(boardState = undefined) {
        this._bank = [...Bank];
        this._freeSpaceBank = [...FreeSpaceBank];
        this._squares = [];
        this._cookieOptions = { expires: 2, secure: true }
        this._winnerViewMode = false;

        // Create board if no state is present
        if(!boardState) {
            this.generateNewBoard();
        } else {
            this.loadBoardFromHash(boardState);
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
                let item = this._freeSpaceBank[Math.floor(Math.random() * this._freeSpaceBank.length)]
                this._squares.push(new BoardSquare(this._freeSpaceBank.indexOf(item), true, true));
            }
        }

        cookie.set('boardState', this.generateBoardHash(), this._cookieOptions);
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
        let boardState = btoa(JSON.stringify(this._squares));
        return boardState;
    }

    loadBoardFromHash(hash) {
        let deserializedBoardState = JSON.parse(atob(hash));
        for(let i = 0; i < deserializedBoardState.length; i++) {
            let boardSquare = new BoardSquare();
            Object.assign(boardSquare, deserializedBoardState[i]);
            deserializedBoardState[i] = boardSquare;
        }

        this._squares = deserializedBoardState;

        // Check if board is in a win state and purge
        if(this.isBoardInWinState()) {
            cookie.remove('boardState');
            this._squares = [];
            this.generateNewBoard();
        }
    }

    updateSquareStates(squares) {
        for(let i = 0; i < squares.length; i++) {
            if(squares[i].classList.contains('square-stamped')) {
                this._squares[i].setStamped(true);
            } else {
                this._squares[i].setStamped(false);
            }
        }

        cookie.set('boardState', this.generateBoardHash(), this._cookieOptions);
    }

    isBoardInWinState() {
        // Lazy win evaluation until I clean up the code further
        for(let i = 0; i < 25; i += 5) {        // Horizontal Row Check
            if(this._squares[i].getStamped() &&
                this._squares[i+1].getStamped() &&
                this._squares[i+2].getStamped() &&
                this._squares[i+3].getStamped() &&
                this._squares[i+4].getStamped()) {
                    return true;
                }                
        }

        for(let i = 0; i < 5; i++) {        // Vertical Row Check
            if(this._squares[i].getStamped() &&
                this._squares[i+5].getStamped() &&
                this._squares[i+10].getStamped() &&
                this._squares[i+15].getStamped() &&
                this._squares[i+20].getStamped()) {
                    return true;
                }  
        }

        // Diagnol Right Check
        if(this._squares[0].getStamped() &&
            this._squares[6].getStamped() &&
            this._squares[12].getStamped() &&
            this._squares[18].getStamped() &&
            this._squares[24].getStamped()) {
            return true;
        }

        // Diagnol Left Check
        if(this._squares[4].getStamped() &&
            this._squares[8].getStamped() &&
            this._squares[12].getStamped() &&
            this._squares[16].getStamped() &&
            this._squares[20].getStamped()) {
                return true;
        }  

        return false;
    }

    getSquares() {
        return this._squares;
    }

    getWinnerViewMode() {
        return this._winnerViewMode;
    }

    setWinnerViewMode(value) {
        this._winnerViewMode = value;
    }
}