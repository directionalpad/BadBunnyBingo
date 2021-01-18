import Bank from './bank.js';
import FreeSpaceBank from './free-space-bank.js';

export default class BoardSquare {
    constructor(bankPosition, isStamped = false, isFreeSpace = false) {
        this._bankPosition = bankPosition;
        this._isStamped = isStamped;
        this._isFreeSpace = isFreeSpace;
    }

    getStamped() {
        return this._isStamped;
    }

    setStamped(value) {
        this._isStamped = value;
    }

    getBankPosition() {
        return this._bankPosition;
    }

    getIsFreeSpace() {
        return this.isFreeSpace;
    }

    toHtml() {
        if(!this._isFreeSpace) {
            return `<td class="bingo-square ${(this._isStamped) ? 'square-stamped' : ''}">${Bank[this._bankPosition]}</td>`;
        } else {
            // Old Game Migrations
            if(this._bankPosition < 0) {
                this._bankPosition = 0;
            }

            return `<td class="bingo-free-square square-stamped"><strong>${FreeSpaceBank[this._bankPosition]}</strong></td>`;   
        }
    }
}