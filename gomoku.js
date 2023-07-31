var blackPlayer = "b";
var whitePlayer = "w";
var currentPlayer = blackPlayer;

var gameOver = false;
var board;
var rowCol = 15;

window.onload = function() {
    initGame();
}

function initGame() {
    board = [];
    for (let r = 0; r < rowCol; r++){
        let row = [];
        for (let c = 0; c < rowCol; c++) {
            row.push(' ');
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.addEventListener("click", setPiece);
            document.getElementById("board").append(tile);
        }
        board.push(row);
    }
}

function setPiece() {
    if (gameOver) {
        return;
    }

    let coords = this.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);
    if (board[r][c] == " ") {
        board[r][c] = currentPlayer;
        let tile = document.getElementById(r.toString() + "-" + c.toString());

        if (currentPlayer == blackPlayer) {
            tile.classList.add("black-stone");
            currentPlayer = whitePlayer;
        } else {
            tile.classList.add("white-stone");
            currentPlayer = blackPlayer;
        }
    }
    console.log(board);
    checkWinner();
}

function checkWinner() {
    for (let r = 0; r < rowCol; r++) {
        for (let c = 0; c < rowCol - 4; c++) {
            if (board[r][c] != ' ') {
                if(board[r][c] == board[r][c+1] && board[r][c+1] == board[r][c+2] && board[r][c+2] == board[r][c+3] && board[r][c+3] == board[r][c+4]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    for (let c = 0; c < rowCol; c++) {
        for (let r = 0; r < rowCol - 4; r++) {
            if (board[r][c] != ' ') {
                if(board[r][c] == board[r+1][c] && board[r+1][c] == board[r+2][c] && board[r+2][c] == board[r+3][c] && board[r+3][c] == board[r+4][c]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    for (let r = 0; r < rowCol; r++) {
        for (let c = 0; c < rowCol - 4; c++) {
            if (board[r][c] != ' ') {
                if(board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2] && board[r+2][c+2] == board[r+3][c+3] && board[r+3][c+3] == board[r+4][c+4]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    for (let r = 3; r < rowCol; r--) {
        for (let c = 0; c < rowCol - 4; c++) {
            if (board[r][c] != ' ') {
                if(board[r][c] == board[r-1][c+1] && board[r-1][c+1] == board[r-2][c+2] && board[r-2][c+2] == board[r-3][c+3] && board[r-3][c+3] == board[r-4][c+4]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }
}

function setWinner(r, c) {
    let winner = document.getElementById("winner");
    if (board[r][c] == blackPlayer) {
        winner.innerText = "Black Wins!";
    } else {
        winner.innerText = "White Wins!";
    }

    gameOver = true;
}