const n = 3;
const piece = ["X", "O"];
let board = [], emptyCells = [];
let playerPiece = 0, gameOver = false;

function Load() {
    board = []
    for (let i = 0; i < n; i++) {
        board[i] = [];
        for (let j = 0; j < n; j++) {
            board[i][j] = -1;
        }
    }
}

function TogglePiece() {
    playerPiece = 1 - playerPiece;
    document.getElementById("choosePieceBtn").innerText = piece[playerPiece];
}

function IsWin(piece) {
    let isRowWin = false, isColWin = false;

    // Check rows
    for (let i = 0; i < n && !isRowWin; i++) {
        let rowCnt = 0;
        for (let j = 0; j < n; j++) {
            if (board[i][j] === piece) {
                rowCnt++;
            }
        }
        if (rowCnt === n) {
            isRowWin = true;
        }
    }
    
    // Check columns
    for (let j = 0; j < n && !isColWin; j++) {
        let colCnt = 0;
        for (let i = 0; i < n; i++) {
            if (board[i][j] === piece) {
                colCnt++;
            }
        }
        if (colCnt === n) {
            isColWin = true;
        }
    }

    // Check diagonal 1
    let d1Cnt = 0;
    for (let i = 0; i < n; i++) {
        if (board[i][i] === piece) {
            d1Cnt++;
        }
    }

    // Check diagonal 2
    let d2Cnt = 0;
    for (let i = 0; i < n; i++) {
        if (board[i][n - 1 - i] === piece) {
            d2Cnt++;
        }
    }

    return isRowWin || isColWin || d1Cnt === n || d2Cnt === n;
}

function IsDraw() {
    return emptyCells.length === 0;
}

function GameOver() {
    gameOver = true;
    document.getElementById("choosePieceBtn").disabled = false;
    document.getElementById("startBtn").disabled = false;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            document.getElementById(i + "" + j).disabled = true;
        }
    }
}

function OppMove() {
    if (!gameOver) {
        let index = Math.floor(Math.random() * emptyCells.length);
        let row = emptyCells[index][0], col = emptyCells[index][1];
        board[row][col] = 1 - playerPiece;
        document.getElementById(row + "" + col).innerText = piece[1 - playerPiece];
        emptyCells = emptyCells.filter(c => c[0] !== row || c[1] !== col);
        if (IsWin(1 - playerPiece)) {
            alert("You lost!");
            GameOver();
        }
        else if (IsDraw()) {
            alert("Draw!");
            GameOver();
        }
    }
}

function Start() {
    document.getElementById("choosePieceBtn").disabled = true;
    document.getElementById("startBtn").disabled = true;
    emptyCells = [];
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            board[i][j] = -1;
            emptyCells.push([i, j]);
            document.getElementById(i + "" + j).disabled = false;
            document.getElementById(i + "" + j).innerText = "";
        }
    }
    gameOver = false;
    if (playerPiece === 1) {
        OppMove();
    }
}

function PlayerMove(row, col) {
    if (!gameOver) {
        board[row][col] = playerPiece;
        document.getElementById(row + "" + col).innerText = piece[playerPiece];
        emptyCells = emptyCells.filter(c => c[0] !== row || c[1] !== col);
        if (IsWin(playerPiece)) {
            alert("You win!");
            GameOver();
        }
        else if (IsDraw()) {
            alert("Draw!");
            GameOver();
        }
        OppMove();
    }
}

Load();