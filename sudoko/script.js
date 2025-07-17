let numSelected = null;
let errors = 0;
let board = [];
let solution = [];

window.onload = () => {
    generateSudoku();
    setGame();
};

function generateSudoku() {
    const emptyBoard = Array.from({ length: 9 }, () => Array(9).fill("-"));
    const solvedBoard = emptyBoard.map(row => [...row]);

    solveBoard(solvedBoard);
    solution = solvedBoard.map(row => [...row]);

    board = solvedBoard.map(row => [...row]);

    let removed = 0;
    while (removed < 40) {
        const r = Math.floor(Math.random() * 9);
        const c = Math.floor(Math.random() * 9);
        if (board[r][c] !== "-") {
            board[r][c] = "-";
            removed++;
        }
    }
}

function solveBoard(board) {
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            if (board[r][c] === "-") {
                const nums = shuffle([1,2,3,4,5,6,7,8,9]);
                for (let num of nums) {
                    if (isValid(board, r, c, num.toString())) {
                        board[r][c] = num.toString();
                        if (solveBoard(board)) return true;
                        board[r][c] = "-";
                    }
                }
                return false;
            }
        }
    }
    return true;
}

function isValid(board, row, col, num) {
    for (let i = 0; i < 9; i++) {
        if (board[row][i] === num || board[i][col] === num) return false;
    }

    const boxRow = row - row % 3;
    const boxCol = col - col % 3;
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            if (board[boxRow + r][boxCol + c] === num) return false;
        }
    }

    return true;
}

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function setGame() {
    for (let i = 1; i <= 9; i++) {
        const number = document.createElement("div");
        number.id = i;
        number.innerText = i;
        number.classList.add("number");
        number.addEventListener("click", selectNumber);
        document.getElementById("digits").appendChild(number);
    }

    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            const tile = document.createElement("div");
            tile.id = `${r}-${c}`;
            tile.classList.add("tile");

            if (board[r][c] !== "-") {
                tile.innerText = board[r][c];
                tile.classList.add("tile-start");
            } else {
                tile.addEventListener("click", selectTile);
            }

            if ((r + 1) % 3 === 0 && r !== 8) tile.classList.add("horizontal-line");
            if ((c + 1) % 3 === 0 && c !== 8) tile.classList.add("vertical-line");

            document.getElementById("board").appendChild(tile);
        }
    }
}

function selectNumber() {
    if (numSelected) numSelected.classList.remove("number-selected");
    numSelected = this;
    numSelected.classList.add("number-selected");
}

function selectTile() {
    if (!numSelected || this.innerText !== "") return;

    const [r, c] = this.id.split("-").map(Number);

    if (solution[r][c] === numSelected.id) {
        this.innerText = numSelected.id;

        if (checkWin()) {
            setTimeout(() => {
                alert("🎉 Congratulations, You solved this Sudoku pattern!");
            }, 100);
        }

    } else {
        errors++;
        document.getElementById("errors").innerText = `Errors: ${errors}`;
        this.style.backgroundColor = "#f88";
        setTimeout(() => this.style.backgroundColor = "", 300);
    }
}

function checkWin() {
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            const tile = document.getElementById(`${r}-${c}`);
            if (tile.innerText !== solution[r][c]) return false;
        }
    }
    return true;
}
