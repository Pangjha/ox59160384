'use strict';

var prompt = require('prompt')
var Players = require('./player.js')

const firstPlayer = 'O'
const getBoard = () => {
    return {
        1: '1', 2: '2', 3: '3',
        4: '4', 5: '5', 6: '6',
        7: '7', 8: '8', 9: '9'
    }
}
var endGame = 0;
class TicTacToe {
    constructor() {
        this.winningLines = [
            [1, 2, 3], [4, 5, 6], [7, 8, 9],
            [1, 5, 9], [3, 5, 7],
            [1, 4, 7], [2, 5, 8], [3, 6, 9]
        ];

        this.board = getBoard()

        this.currentPlayer = firstPlayer

        this.players = {
            'O': new Players("P Champ"),
            'X': new Players("P Num"),
        }
    }

    start() {
        this.printBoard()
        prompt.start()

        prompt.get(['location'], (err, result) => { // arrow function
            //  console.log(result.location);

            /*if (this.setBoard(result.location) == false) {
                this.start();

            }*/
            this.setBoard(result.location);



            if (this.checkWin()) {
                this.printBoard()
                console.log(`${this.currentPlayer} | ${this.players[this.currentPlayer].name} win!`)
                this.endGame++;
                return;

            } else {
                if (this.checkDarw()) {
                    endGame++;
                    return;



                }
                this.switchPlayer();
            }
            this.start();
        });

    }

    setBoard(location) {
        if (location >= 1 && location <= 9) {
            if (this.board[location] !== location) {
                console.log("--->Invalid please try again");
                this.switchPlayer();
                return false;
            } else {
                this.board[location] = this.currentPlayer
                return true;
            }
        } else {
            console.log("--->Please input number between 1-9");
            return false;
        }

    }

    switchPlayer() {
        if (this.currentPlayer === 'X') {
            this.currentPlayer = 'O'
        } else {
            this.currentPlayer = 'X'
        }
    }

    checkWin() {
        let checker = 0;
        for (let i = 0; i < this.winningLines.length; i++) {
            checker = 0;
            for (let j = 0; j < this.winningLines[i].length; j++) {
                if (this.board[this.winningLines[i][j]] === this.currentPlayer) {
                    checker++;
                }
                if (checker === 3) {
                    return true;
                }
            }
        }
        return false;
    }
    checkDarw() {
        let checker = 0;
        for (let i = 1; i < 10; i++) {

            if (this.board[i] === 'X' || this.board[i] === 'O') {
                checker++;

            }
            if (checker === 9) {
                this.printBoard();
                console.log("This game Draw");
                return true;
            }

        }

        return false;
    }

    printBoard() {
        console.log(`| ${this.board[1]} | ${this.board[2]} | ${this.board[3]} |`)
        console.log(`| ${this.board[4]} | ${this.board[5]} | ${this.board[6]} |`)
        console.log(`| ${this.board[7]} | ${this.board[8]} | ${this.board[9]} |`)
    }
    newGame() {



    }
}

let game = new TicTacToe();
game.start();
